#!/usr/bin/env python3
"""
PostToolUse Hook: Audit Logger
Logs all tool executions for forensic analysis.
"""

import sys
import json
from datetime import datetime
from pathlib import Path

REDACT_PATTERNS = [
    'password', 'secret', 'token', 'api_key', 'apikey',
    'credential', 'auth', 'bearer', 'private_key'
]


def redact_sensitive(data: dict) -> dict:
    """Redact sensitive values from log data."""
    if not isinstance(data, dict):
        return data

    redacted = {}
    for key, value in data.items():
        key_lower = key.lower()
        if any(pattern in key_lower for pattern in REDACT_PATTERNS):
            redacted[key] = '[REDACTED]'
        elif isinstance(value, dict):
            redacted[key] = redact_sensitive(value)
        elif isinstance(value, str) and len(value) > 200:
            redacted[key] = value[:200] + '...[truncated]'
        else:
            redacted[key] = value
    return redacted


def append_audit_log(tool_name: str, tool_input: dict, success: bool):
    """Append entry to audit log."""
    log_file = Path('.claude/audit.log')

    try:
        timestamp = datetime.now().isoformat()
        safe_input = redact_sensitive(tool_input)

        entry = {
            'timestamp': timestamp,
            'tool': tool_name,
            'success': success,
            'input': safe_input
        }

        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(json.dumps(entry) + '\n')
    except Exception:
        pass


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get('tool_name', 'unknown')
    tool_input = input_data.get('tool_input', {})
    tool_result = input_data.get('tool_result', {})

    success = True
    if isinstance(tool_result, dict):
        if 'error' in tool_result or 'Error' in str(tool_result):
            success = False

    append_audit_log(tool_name, tool_input, success)
    sys.exit(0)


if __name__ == '__main__':
    main()
