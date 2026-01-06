#!/usr/bin/env python3
"""
PostToolUse Hook: Metrics Collector
Tracks execution times, token estimates, and tool usage patterns.
"""

import sys
import json
from datetime import datetime
from pathlib import Path

METRICS_FILE = Path('.claude/metrics.jsonl')

TOKEN_ESTIMATES = {
    'Read': lambda inp: len(inp.get('file_path', '')) * 0.5,
    'Write': lambda inp: len(inp.get('content', '')) * 0.3,
    'Edit': lambda inp: (len(inp.get('old_string', '')) + len(inp.get('new_string', ''))) * 0.3,
    'Bash': lambda inp: len(inp.get('command', '')) * 0.5 + 100,
    'Grep': lambda inp: 50 + len(inp.get('pattern', '')) * 2,
    'Glob': lambda inp: 30,
    'Task': lambda inp: 500,
    'WebFetch': lambda inp: 200,
    'WebSearch': lambda inp: 150,
}

COST_PER_1K_INPUT = 0.015
COST_PER_1K_OUTPUT = 0.075


def estimate_tokens(tool_name: str, tool_input: dict) -> int:
    """Estimate tokens used by this tool call."""
    estimator = TOKEN_ESTIMATES.get(tool_name, lambda x: 50)
    try:
        return int(estimator(tool_input))
    except Exception:
        return 50


def estimate_cost(input_tokens: int, output_tokens: int = 100) -> float:
    """Estimate cost in USD."""
    input_cost = (input_tokens / 1000) * COST_PER_1K_INPUT
    output_cost = (output_tokens / 1000) * COST_PER_1K_OUTPUT
    return round(input_cost + output_cost, 6)


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get('tool_name', 'unknown')
    tool_input = input_data.get('tool_input', {})
    session_id = input_data.get('session_id', '')

    estimated_tokens = estimate_tokens(tool_name, tool_input)
    estimated_cost = estimate_cost(estimated_tokens)

    metric = {
        'timestamp': datetime.now().isoformat(),
        'session_id': session_id[:8] if session_id else '',
        'tool': tool_name,
        'estimated_tokens': estimated_tokens,
        'estimated_cost_usd': estimated_cost,
    }

    if tool_name == 'Task':
        metric['subagent_type'] = tool_input.get('subagent_type', '')
        metric['model'] = tool_input.get('model', 'default')

    try:
        METRICS_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(METRICS_FILE, 'a', encoding='utf-8') as f:
            f.write(json.dumps(metric) + '\n')
    except Exception:
        pass

    sys.exit(0)


if __name__ == '__main__':
    main()
