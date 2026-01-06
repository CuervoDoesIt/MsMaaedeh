#!/usr/bin/env python3
"""
PostToolUse Hook: TypeCheck Gate (Advisory Mode)
Runs TypeScript type checking after edits and reports errors.
"""

import sys
import json
import subprocess
import os
from pathlib import Path


def get_project_root() -> Path:
    """Find the project root (where tsconfig.json is)."""
    current = Path.cwd()
    while current != current.parent:
        if (current / 'tsconfig.json').exists():
            return current
        current = current.parent
    return Path.cwd()


def run_typecheck() -> tuple:
    """Run TypeScript type check."""
    try:
        result = subprocess.run(['npx', 'tsc', '--noEmit', '--pretty', 'false'],
                                capture_output=True, text=True,
                                cwd=get_project_root(), timeout=60)

        if result.returncode == 0:
            return True, "", 0

        errors = result.stdout + result.stderr
        error_lines = [l for l in errors.split('\n') if ': error TS' in l]
        error_count = len(error_lines)

        if len(errors) > 1500:
            errors = errors[:1500] + f"\n... ({error_count} total errors)"

        return False, errors, error_count
    except subprocess.TimeoutExpired:
        return False, "TypeScript check timed out (>60s)", 0
    except FileNotFoundError:
        return True, "", 0
    except Exception as e:
        return False, str(e), 0


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
    if not file_path:
        sys.exit(0)

    ext = os.path.splitext(file_path)[1].lower()
    if ext not in ['.ts', '.tsx']:
        sys.exit(0)

    success, errors, error_count = run_typecheck()

    if not success and error_count > 0:
        response = {
            "systemMessage": f"[TypeCheck] {error_count} type error(s) detected:\n```\n{errors}\n```"
        }
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
