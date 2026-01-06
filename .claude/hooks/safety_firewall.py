#!/usr/bin/env python3
"""
PreToolUse Hook: Safety Firewall
Blocks dangerous commands before execution.
"""

import sys
import json
import re

# Protected files - customize for your project
PROTECTED_FILES = [
    '.env',
    '.env.local',
    '.env.production',
]

# Dangerous command patterns
DANGEROUS_PATTERNS = [
    r'rm\s+(-rf|-fr|--recursive)\s+[/\]',
    r'rm\s+(-rf|-fr|--recursive)\s+\*',
    r'del\s+/s\s+/q\s+[cC]:\',
    r'rmdir\s+/s\s+/q',
    r'Remove-Item\s+.*-Recurse\s+.*-Force',
    r'git\s+push\s+.*(-f|--force).*\s+(main|master)',
    r'git\s+reset\s+--hard\s+origin/(main|master)',
    r'git\s+clean\s+-fdx',
    r'(api[_-]?key|password|secret|token)\s*=\s*["\'][^"\']+["\']',
    r'chmod\s+777\s+/',
    r'curl\s+.*(-d|--data).*\|\s*bash',
]

SAFE_PATTERNS = [
    r'^npm\s+(install|i|ci|run|test|build)',
    r'^npx\s+',
    r'^yarn\s+(install|add|remove|run)',
    r'^pip\s+install',
    r'^git\s+(status|log|diff|branch|checkout|fetch|pull|add|commit)',
    r'^node\s+',
    r'^tsc\s+',
    r'^eslint\s+',
    r'^prettier\s+',
]


def check_protected_files(command: str) -> tuple:
    """Check if command touches protected files."""
    for protected in PROTECTED_FILES:
        if protected in command or protected.replace('/', '\') in command:
            return True, f"Command references protected file: {protected}"
    return False, ""


def check_dangerous_patterns(command: str) -> tuple:
    """Check if command matches dangerous patterns."""
    for pattern in DANGEROUS_PATTERNS:
        if re.search(pattern, command, re.IGNORECASE):
            return True, f"Command matches dangerous pattern"
    return False, ""


def is_safe_command(command: str) -> bool:
    """Check if command matches safe patterns."""
    for pattern in SAFE_PATTERNS:
        if re.match(pattern, command.strip(), re.IGNORECASE):
            return True
    return False


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get('tool_name', '')
    tool_input = input_data.get('tool_input', {})

    if tool_name != 'Bash':
        sys.exit(0)

    command = tool_input.get('command', '')
    if not command:
        sys.exit(0)

    if is_safe_command(command):
        sys.exit(0)

    is_protected, reason = check_protected_files(command)
    if is_protected:
        response = {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": f"BLOCKED: {reason}"
            }
        }
        print(json.dumps(response))
        sys.exit(0)

    is_dangerous, reason = check_dangerous_patterns(command)
    if is_dangerous:
        response = {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": f"BLOCKED: {reason}"
            }
        }
        print(json.dumps(response))
        sys.exit(0)

    sys.exit(0)


if __name__ == '__main__':
    main()
