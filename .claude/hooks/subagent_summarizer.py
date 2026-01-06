#!/usr/bin/env python3
"""
SubagentStop Hook: Subagent Output Summarizer
Ensures subagent output is condensed to prevent context pollution.
"""

import sys
import json
from datetime import datetime
from pathlib import Path


def summarize_output(output: str, max_length: int = 2000) -> str:
    """Summarize long subagent output."""
    if len(output) <= max_length:
        return output

    lines = output.split('\n')
    priority_markers = [
        '## Summary', '### Summary', '# Summary',
        '## Files', '### Files', '# Files',
        '## Created', '## Modified', '## Changed',
        '## Errors', '## Issues', '## Blockers',
        '## Next Steps', '## Recommendations',
        'APPROVE', 'REQUEST_CHANGES', 'NEEDS_DISCUSSION'
    ]

    kept_lines = []
    in_priority_section = False

    for line in lines:
        if any(marker in line for marker in priority_markers):
            in_priority_section = True
            kept_lines.append(line)
        elif line.startswith('#') and in_priority_section:
            if not any(marker in line for marker in priority_markers):
                in_priority_section = False
        elif in_priority_section:
            kept_lines.append(line)
        elif line.startswith('- ') or line.startswith('* '):
            kept_lines.append(line)

    result = '\n'.join(kept_lines)

    if len(result) > max_length:
        result = result[:max_length] + '\n\n[Output truncated]'

    return result


def log_subagent_completion(agent_name: str):
    """Log subagent completion to session log."""
    log_file = Path('.claude/memory/session_log.md')
    if not log_file.exists():
        return

    try:
        timestamp = datetime.now().strftime('%H:%M:%S')
        entry = f"- [{timestamp}] Subagent `{agent_name}` completed\n"

        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(entry)
    except Exception:
        pass


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    hook_type = input_data.get('hook_type', '')
    if hook_type != 'SubagentStop':
        sys.exit(0)

    agent_name = input_data.get('agent_name', 'unknown')
    agent_output = input_data.get('output', '')

    log_subagent_completion(agent_name)

    if len(agent_output) > 3000:
        summarized = summarize_output(agent_output)
        response = {
            "systemMessage": f"[SubagentStop] {agent_name} output condensed from {len(agent_output)} to {len(summarized)} chars"
        }
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
