#!/usr/bin/env python3
"""
Cleanup orphan Claude processes on session start.
Only kills processes older than 30 minutes to protect active subagents.
"""
import subprocess
import sys
from datetime import datetime, timedelta

def get_claude_processes():
    """Get all Claude processes with their start times."""
    try:
        # Windows PowerShell version
        result = subprocess.run(
            ['powershell', '-Command',
             'Get-Process claude -EA 0 | Select Id,StartTime | ConvertTo-Json'],
            capture_output=True, text=True, timeout=5
        )
        if result.returncode != 0 or not result.stdout.strip():
            return []

        import json
        data = json.loads(result.stdout)
        if isinstance(data, dict):
            data = [data]
        return data
    except Exception:
        return []

def kill_process(pid):
    """Kill a process by PID."""
    try:
        subprocess.run(
            ['powershell', '-Command', f'Stop-Process -Id {pid} -Force -EA 0'],
            capture_output=True, timeout=5
        )
    except Exception:
        pass

def main():
    processes = get_claude_processes()
    if len(processes) <= 2:
        return

    cutoff = datetime.now() - timedelta(minutes=30)
    killed = 0

    for proc in processes:
        try:
            start_str = proc.get('StartTime', {}).get('value', '')
            if '/Date(' in start_str:
                ms = int(start_str.split('(')[1].split(')')[0].split('+')[0].split('-')[0])
                start_time = datetime.fromtimestamp(ms / 1000)
            else:
                continue

            if start_time < cutoff:
                kill_process(proc['Id'])
                killed += 1
        except Exception:
            continue

    if killed > 0:
        print(f"Cleaned up {killed} orphan Claude process(es)", file=sys.stderr)

if __name__ == '__main__':
    main()
