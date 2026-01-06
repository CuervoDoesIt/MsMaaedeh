#!/usr/bin/env python3
"""
PostToolUse Hook: Auto-Lint
Automatically formats and lints files after modification.
"""

import sys
import json
import subprocess
import os
from pathlib import Path

FORMATTERS = {
    '.ts': ['npx', 'prettier', '--write'],
    '.tsx': ['npx', 'prettier', '--write'],
    '.js': ['npx', 'prettier', '--write'],
    '.jsx': ['npx', 'prettier', '--write'],
    '.json': ['npx', 'prettier', '--write'],
    '.md': ['npx', 'prettier', '--write'],
    '.py': ['python', '-m', 'ruff', 'format'],
}

LINTERS = {
    '.ts': ['npx', 'eslint', '--fix', '--quiet'],
    '.tsx': ['npx', 'eslint', '--fix', '--quiet'],
}


def get_project_root() -> Path:
    """Find the project root (where package.json is)."""
    current = Path.cwd()
    while current != current.parent:
        if (current / 'package.json').exists():
            return current
        current = current.parent
    return Path.cwd()


def run_formatter(file_path: str, commands: list) -> tuple:
    """Run a formatter on the file."""
    try:
        full_cmd = commands + [file_path]
        result = subprocess.run(full_cmd, capture_output=True, text=True,
                                cwd=get_project_root(), timeout=10)
        if result.returncode == 0:
            return True, ""
        return False, result.stderr
    except subprocess.TimeoutExpired:
        return False, "Formatter timed out"
    except FileNotFoundError:
        return False, f"Formatter not found: {commands[0]}"
    except Exception as e:
        return False, str(e)


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get('tool_name', '')
    tool_input = input_data.get('tool_input', {})

    if tool_name not in ['Edit', 'Write']:
        sys.exit(0)

    file_path = tool_input.get('file_path', '')
    if not file_path or not os.path.exists(file_path):
        sys.exit(0)

    ext = os.path.splitext(file_path)[1].lower()
    messages = []

    if ext in FORMATTERS:
        success, error = run_formatter(file_path, FORMATTERS[ext])
        if success:
            messages.append(f"Formatted {os.path.basename(file_path)}")
        elif error:
            messages.append(f"Format warning: {error}")

    if ext in LINTERS:
        success, error = run_formatter(file_path, LINTERS[ext])
        if success:
            messages.append(f"Linted {os.path.basename(file_path)}")

    if messages:
        response = {"systemMessage": f"[Auto-format] {'; '.join(messages)}"}
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
