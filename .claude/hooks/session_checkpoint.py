#!/usr/bin/env python3
"""
Stop Hook: Session Checkpoint
Runs when Claude finishes a response.
"""

import sys
import json
from datetime import datetime
from pathlib import Path


def update_session_log():
    """Update session log marker."""
    log_file = Path('.claude/memory/session_log.md')
    if not log_file.exists():
        return
    # Placeholder for future enhancements


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    hook_type = input_data.get('hook_type', '')
    if hook_type != 'Stop':
        sys.exit(0)

    update_session_log()
    sys.exit(0)


if __name__ == '__main__':
    main()
