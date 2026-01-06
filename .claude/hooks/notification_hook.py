#!/usr/bin/env python3
"""
Notification Hook: Multi-Channel Alerts
Sends notifications for important events.
"""

import sys
import json
import os
import subprocess
from datetime import datetime
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError

LOG_FILE = Path('.claude/notifications.log')

EVENT_LEVELS = {
    'security_block': 'HIGH',
    'session_complete': 'INFO',
    'build_success': 'INFO',
    'build_failure': 'HIGH',
    'error': 'HIGH',
}


def log_to_file(event_type: str, message: str, details: dict = None):
    """Write notification to local log file."""
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    level = EVENT_LEVELS.get(event_type, 'INFO')

    entry = f"[{timestamp}] [{level}] {event_type}: {message}"
    if details:
        entry += f" | {json.dumps(details)}"
    entry += "\n"

    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(entry)


def send_slack(message: str, event_type: str):
    """Send notification to Slack webhook."""
    webhook_url = os.environ.get('SLACK_WEBHOOK_URL')
    if not webhook_url:
        return

    level = EVENT_LEVELS.get(event_type, 'INFO')
    emoji = 'RED' if level == 'HIGH' else 'BLUE'

    payload = {
        'text': f"{emoji} *Claude Code*: {message}",
        'username': 'Claude Code'
    }

    try:
        req = Request(webhook_url, data=json.dumps(payload).encode('utf-8'),
                      headers={'Content-Type': 'application/json'})
        urlopen(req, timeout=5)
    except URLError:
        pass


def notify(event_type: str, message: str, details: dict = None):
    """Send notification through all configured channels."""
    log_to_file(event_type, message, details)

    level = EVENT_LEVELS.get(event_type, 'INFO')
    if level == 'HIGH' or os.environ.get('NOTIFY_ALL') == '1':
        send_slack(message, event_type)


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    hook_type = input_data.get('hook_type', '')

    if hook_type == 'Stop':
        session_id = input_data.get('session_id', 'unknown')
        notify('session_complete', f"Session completed: {session_id[:8]}...",
               {'session_id': session_id})

    sys.exit(0)


if __name__ == '__main__':
    main()
