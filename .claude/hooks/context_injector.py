#!/usr/bin/env python3
"""
UserPromptSubmit Hook: Context Injector
Automatically injects relevant context into prompts.
"""

import sys
import json
import subprocess
from pathlib import Path


def get_git_branch() -> str:
    """Get current git branch name."""
    try:
        result = subprocess.run(['git', 'branch', '--show-current'],
                                capture_output=True, text=True, timeout=2)
        if result.returncode == 0:
            return result.stdout.strip()
    except Exception:
        pass
    return ""


def get_git_status_summary() -> str:
    """Get brief git status."""
    try:
        result = subprocess.run(['git', 'status', '--porcelain'],
                                capture_output=True, text=True, timeout=3)
        if result.returncode == 0 and result.stdout.strip():
            lines = result.stdout.strip().split('\n')
            modified = len([l for l in lines if l.startswith(' M') or l.startswith('M ')])
            added = len([l for l in lines if l.startswith('A ') or l.startswith('??')])
            deleted = len([l for l in lines if l.startswith(' D') or l.startswith('D ')])

            parts = []
            if modified: parts.append(f"{modified} modified")
            if added: parts.append(f"{added} added/untracked")
            if deleted: parts.append(f"{deleted} deleted")

            if parts:
                return ", ".join(parts)
    except Exception:
        pass
    return ""


def get_active_task() -> str:
    """Read active task from memory file."""
    memory_file = Path('.claude/memory/active_context.md')
    if memory_file.exists():
        try:
            content = memory_file.read_text(encoding='utf-8')
            if '## Current Task' in content:
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if '## Current Task' in line and i + 1 < len(lines):
                        task = lines[i + 1].strip()
                        if task and task != '[No active task]' and not task.startswith('#'):
                            return task[:100]
        except Exception:
            pass
    return ""


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    context_parts = []

    branch = get_git_branch()
    if branch:
        context_parts.append(f"Branch: {branch}")

    status = get_git_status_summary()
    if status:
        context_parts.append(f"Git: {status}")

    task = get_active_task()
    if task:
        context_parts.append(f"Active: {task}")

    if context_parts:
        context_str = " | ".join(context_parts)
        response = {"systemMessage": f"[Context] {context_str}"}
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
