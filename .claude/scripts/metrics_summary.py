#!/usr/bin/env python3
"""
Metrics Summary Script
Usage: python .claude/scripts/metrics_summary.py [--today|--week|--all]
"""

import json
import sys
from datetime import datetime, timedelta
from pathlib import Path
from collections import defaultdict

METRICS_FILE = Path('.claude/metrics.jsonl')


def load_metrics(since: datetime = None) -> list:
    """Load metrics from file, optionally filtered by date."""
    if not METRICS_FILE.exists():
        return []

    metrics = []
    with open(METRICS_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                m = json.loads(line.strip())
                if since:
                    ts = datetime.fromisoformat(m['timestamp'])
                    if ts < since:
                        continue
                metrics.append(m)
            except (json.JSONDecodeError, KeyError):
                continue

    return metrics


def summarize(metrics: list) -> dict:
    """Generate summary statistics."""
    if not metrics:
        return {'error': 'No metrics found'}

    summary = {
        'total_tool_calls': len(metrics),
        'total_estimated_tokens': sum(m.get('estimated_tokens', 0) for m in metrics),
        'total_estimated_cost': sum(m.get('estimated_cost_usd', 0) for m in metrics),
        'tools_by_frequency': defaultdict(int),
        'subagents_spawned': 0,
        'sessions': set(),
    }

    for m in metrics:
        summary['tools_by_frequency'][m.get('tool', 'unknown')] += 1
        if m.get('session_id'):
            summary['sessions'].add(m['session_id'])
        if m.get('tool') == 'Task':
            summary['subagents_spawned'] += 1

    summary['sessions'] = len(summary['sessions'])
    summary['tools_by_frequency'] = dict(
        sorted(summary['tools_by_frequency'].items(), key=lambda x: -x[1])
    )

    return summary


def print_report(summary: dict, period: str):
    """Print formatted report."""
    if 'error' in summary:
        print(f"Error: {summary['error']}")
        return

    print(f"\n{'='*50}")
    print(f"CLAUDE CODE METRICS SUMMARY ({period})")
    print(f"{'='*50}\n")

    print(f"Total Tool Calls:      {summary['total_tool_calls']:,}")
    print(f"Unique Sessions:       {summary['sessions']}")
    print(f"Subagents Spawned:     {summary['subagents_spawned']}")
    print(f"Estimated Tokens:      {summary['total_estimated_tokens']:,}")
    print(f"Estimated Cost:        ${summary['total_estimated_cost']:.4f}")

    print(f"\n{'Tool Usage':30} {'Count':>10}")
    print("-" * 42)
    for tool, count in list(summary['tools_by_frequency'].items())[:10]:
        print(f"{tool:30} {count:>10,}")

    print(f"\n{'='*50}\n")


def main():
    period = 'all'
    since = None

    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg == '--today':
            period = 'today'
            since = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        elif arg == '--week':
            period = 'last 7 days'
            since = datetime.now() - timedelta(days=7)

    metrics = load_metrics(since)
    summary = summarize(metrics)
    print_report(summary, period)


if __name__ == '__main__':
    main()
