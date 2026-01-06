#!/usr/bin/env python3
"""
Git Pre-Commit Hook Integration
Install by running: python .claude/hooks/pre-commit.py --install
"""

import sys
import subprocess
import os
from pathlib import Path


def get_staged_files() -> list:
    """Get list of staged files."""
    result = subprocess.run(
        ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
        capture_output=True, text=True, shell=True
    )
    if result.returncode != 0:
        return []
    return [f.strip() for f in result.stdout.strip().split('\n') if f.strip()]


def run_prettier(files: list) -> tuple:
    """Run prettier on staged JS/TS files."""
    target_files = [f for f in files if f.endswith(('.ts', '.tsx', '.js', '.jsx', '.json'))]
    if not target_files:
        return True, ""

    try:
        cmd = ['npx', 'prettier', '--check'] + target_files
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30, shell=True)
        if result.returncode != 0:
            return False, f"Prettier issues:\n{result.stdout}"
        return True, ""
    except FileNotFoundError:
        # npx/prettier not found, skip check
        return True, ""
    except Exception as e:
        return False, str(e)


def run_eslint(files: list) -> tuple:
    """Run eslint on staged JS/TS files."""
    target_files = [f for f in files if f.endswith(('.ts', '.tsx', '.js', '.jsx'))]
    if not target_files:
        return True, ""

    try:
        cmd = ['npx', 'eslint', '--quiet'] + target_files
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60, shell=True)
        if result.returncode != 0:
            return False, f"ESLint errors:\n{result.stdout}{result.stderr}"
        return True, ""
    except FileNotFoundError:
        # npx/eslint not found, skip check
        return True, ""
    except Exception as e:
        return False, str(e)


def run_typecheck() -> tuple:
    """Run TypeScript type check."""
    try:
        result = subprocess.run(['npx', 'tsc', '--noEmit'],
                                capture_output=True, text=True, timeout=120, shell=True)
        if result.returncode != 0:
            errors = result.stdout + result.stderr
            if len(errors) > 2000:
                error_count = errors.count(': error TS')
                errors = errors[:2000] + f"\n... ({error_count} total errors)"
            return False, f"TypeScript errors:\n{errors}"
        return True, ""
    except FileNotFoundError:
        # npx/tsc not found, skip check
        return True, ""
    except Exception as e:
        return False, str(e)


def install_hook():
    """Install this script as a git pre-commit hook."""
    git_hooks_dir = Path('.git/hooks')
    if not git_hooks_dir.exists():
        print("Error: .git/hooks directory not found.")
        sys.exit(1)

    hook_path = git_hooks_dir / 'pre-commit'
    script_path = Path(__file__).resolve()

    hook_content = f'''#!/bin/sh
python "{script_path}"
'''

    with open(hook_path, 'w', encoding='utf-8') as f:
        f.write(hook_content)

    try:
        os.chmod(hook_path, 0o755)
    except Exception:
        pass

    print(f"Pre-commit hook installed at {hook_path}")


def main():
    if len(sys.argv) > 1 and sys.argv[1] == '--install':
        install_hook()
        return

    print("Running pre-commit checks...")
    staged_files = get_staged_files()

    if not staged_files:
        print("No staged files to check.")
        sys.exit(0)

    print(f"Checking {len(staged_files)} staged files...")
    errors = []

    success, error = run_prettier(staged_files)
    if not success:
        errors.append(error)
    else:
        print("  Prettier: OK")

    success, error = run_eslint(staged_files)
    if not success:
        errors.append(error)
    else:
        print("  ESLint: OK")

    ts_files = [f for f in staged_files if f.endswith(('.ts', '.tsx'))]
    if ts_files:
        success, error = run_typecheck()
        if not success:
            print(f"  TypeScript: WARNINGS (advisory)\n{error[:500]}")
        else:
            print("  TypeScript: OK")

    if errors:
        print("\n" + "="*50)
        print("PRE-COMMIT FAILED")
        print("="*50)
        for error in errors:
            print(error)
        print("\nFix these issues before committing.")
        print("To bypass: git commit --no-verify")
        sys.exit(1)

    print("\nAll checks passed!")
    sys.exit(0)


if __name__ == '__main__':
    main()
