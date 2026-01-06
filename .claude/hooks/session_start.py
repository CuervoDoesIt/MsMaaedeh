#!/usr/bin/env python3
"""
SessionStart Hook: Environment Initialization
Runs at the start of each Claude Code session.
"""

import sys
import json
import os
import subprocess
from datetime import datetime
from pathlib import Path

SESSION_LOG = Path('.claude/memory/session_log.md')
REQUIRED_ENV_VARS = ['GITHUB_TOKEN']
OPTIONAL_ENV_VARS = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY']


def check_env_vars() -> dict:
    """Check which environment variables are set."""
    status = {}
    for var in REQUIRED_ENV_VARS:
        status[var] = 'set' if os.environ.get(var) else 'MISSING'
    for var in OPTIONAL_ENV_VARS:
        if os.environ.get(var):
            status[var] = 'set'
    return status


def check_tools() -> dict:
    """Check if required tools are available."""
    tools = {}
    for tool, cmd in [('python', ['python', '--version']),
                       ('node', ['node', '--version']),
                       ('git', ['git', '--version'])]:
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=2)
            tools[tool] = result.stdout.strip() if result.returncode == 0 else 'not found'
        except Exception:
            tools[tool] = 'not found'
    return tools


def get_git_info() -> dict:
    """Get current git state."""
    info = {}
    try:
        result = subprocess.run(['git', 'branch', '--show-current'],
                                capture_output=True, text=True, timeout=2)
        info['branch'] = result.stdout.strip() if result.returncode == 0 else 'unknown'

        result = subprocess.run(['git', 'status', '--porcelain'],
                                capture_output=True, text=True, timeout=3)
        if result.returncode == 0:
            lines = [l for l in result.stdout.strip().split('\n') if l]
            info['uncommitted_files'] = len(lines)
    except Exception:
        pass
    return info


def log_session_start(session_id: str, env_status: dict, git_info: dict):
    """Append session start to log."""
    try:
        SESSION_LOG.parent.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        entry = f"\n## Session {session_id[:8]} - {timestamp}\n\n"
        entry += "**Environment:**\n"
        for var, status in env_status.items():
            icon = 'Y' if status == 'set' else 'X'
            entry += f"- {icon} {var}: {status}\n"
        entry += f"\n**Git:** {git_info.get('branch', 'unknown')} "
        entry += f"({git_info.get('uncommitted_files', 0)} uncommitted)\n"
        entry += "\n---\n"

        with open(SESSION_LOG, 'a', encoding='utf-8') as f:
            f.write(entry)
    except Exception:
        pass


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    session_id = input_data.get('session_id', 'unknown')
    env_status = check_env_vars()
    git_info = get_git_info()
    log_session_start(session_id, env_status, git_info)

    warnings = [f"Missing env var: {var}" for var, status in env_status.items()
                if status == 'MISSING' and var in REQUIRED_ENV_VARS]

    if warnings:
        response = {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "systemMessage": f"[Session Init] Warnings: {'; '.join(warnings)}"
            }
        }
        print(json.dumps(response))
    else:
        response = {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "systemMessage": "startup hook success: Success"
            }
        }
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
