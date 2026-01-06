# Claude Code Enhanced Setup Plan

This document provides step-by-step instructions for setting up an enhanced `.claude` folder configuration in a new project. Follow these tasks in order to replicate the full agent/hook/tool ecosystem.

## Overview

This setup provides:
- **9 Specialized Agents** - Architect, Code Reviewer, Database Optimizer, Deep Researcher, Domain Builder, LLM Architect, Migration Specialist, Security Auditor, Test Runner
- **13 Automation Hooks** - Session management, safety firewall, auto-linting, type checking, metrics, notifications
- **MCP Server Integration** - GitHub, Filesystem, Fetch
- **Metrics & Audit Logging** - Track usage, costs, and tool executions

## Prerequisites

Before starting, ensure you have:
- Python 3.8+ installed
- Node.js and npm installed
- Git repository initialized
- `GITHUB_TOKEN` environment variable set (for GitHub MCP server)

### Setting Up Environment Variables

**Windows (PowerShell - Permanent):**
```powershell
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxxxxxxxxxxx', 'User')
```

**Windows (GUI):**
1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Go to **Advanced** tab → **Environment Variables**
3. Under "User variables", click **New**
4. Set Variable name: `GITHUB_TOKEN`, Variable value: `your_token`

**Linux/Mac:**
```bash
echo 'export GITHUB_TOKEN=ghp_xxxxxxxxxxxx' >> ~/.bashrc
source ~/.bashrc
```

---

## Task 1: Create Folder Structure

Create the following directory structure in your project root:

```
.claude/
├── agents/           # Specialized subagent definitions
├── hooks/            # Python automation hooks
├── memory/           # Session state (auto-created)
├── scripts/          # Utility scripts
├── mcp.json          # MCP server configuration
└── settings.local.json  # Permissions and hooks config
```

**Commands:**
```bash
mkdir -p .claude/agents
mkdir -p .claude/hooks
mkdir -p .claude/memory
mkdir -p .claude/scripts
```

---

## Task 2: Create settings.local.json

This file configures permissions and hooks. Create `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Edit(**)",
      "Write(**)",
      "Read(//**/.*)",
      "Read(//tmp/claude/**)",
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(node:*)",
      "Bash(git:*)",
      "Bash(curl:*)",
      "Bash(ls:*)",
      "Bash(cd:*)",
      "Bash(mkdir:*)",
      "Bash(cat:*)",
      "Bash(find:*)",
      "Bash(grep:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(echo:*)",
      "Bash(rm:*)",
      "Bash(cp:*)",
      "Bash(mv:*)",
      "Bash(wc:*)",
      "Bash(touch:*)",
      "Bash(chmod:*)",
      "Bash(python:*)",
      "Bash(python3:*)",
      "Bash(pip:*)",
      "Bash(pip3:*)",
      "Bash(npm run build:*)",
      "Bash(npx tsc --noEmit)",
      "Bash(npx jest:*)",
      "Bash(npx vitest:*)",
      "Bash(git clone:*)",
      "Bash(powershell:*)",
      "Bash(cmd:*)",
      "Bash(dir:*)",
      "Bash(type:*)",
      "Bash(copy:*)",
      "Bash(move:*)",
      "Bash(del:*)",
      "Bash(md:*)",
      "Bash(rd:*)",
      "Bash(where:*)",
      "Bash(set:*)",
      "Bash(cls:*)",
      "Skill(*)"
    ]
  },
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/session_start.py",
            "timeout": 5
          },
          {
            "type": "command",
            "command": "python .claude/hooks/orphan_cleanup.py",
            "timeout": 10
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/context_injector.py",
            "timeout": 3
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/safety_firewall.py",
            "timeout": 5
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/auto_lint.py",
            "timeout": 10
          },
          {
            "type": "command",
            "command": "python .claude/hooks/typecheck_gate.py",
            "timeout": 30
          }
        ]
      },
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/audit_logger.py",
            "timeout": 2
          },
          {
            "type": "command",
            "command": "python .claude/hooks/metrics_collector.py",
            "timeout": 2
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/session_checkpoint.py",
            "timeout": 2
          },
          {
            "type": "command",
            "command": "python .claude/hooks/notification_hook.py",
            "timeout": 3
          }
        ]
      }
    ],
    "PreCompact": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/precompact_save.py",
            "timeout": 3
          }
        ]
      }
    ],
    "SubagentStop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/subagent_summarizer.py",
            "timeout": 5
          }
        ]
      }
    ]
  },
  "defaultMode": "acceptEdits"
}
```

**Customization Notes:**
- Both Unix and Windows commands are included by default for cross-platform compatibility
- Add project-specific tool permissions as needed
- Adjust hook timeouts based on your system performance

---

## Task 3: Check Project Structure and Create mcp.json

**First, check your project structure** to determine which paths to include:

```bash
# List your project directories
ls -la
```

Common folder patterns:
- `src/` - Source code (most projects)
- `public/` - Static assets (React/Vue/etc.)
- `docs/` - Documentation
- `lib/` - Libraries
- `.claude/` - Claude configuration (always include)

Then create `.claude/mcp.json` with paths that exist in YOUR project:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic/mcp-server-filesystem",
        "src/",
        "public/",
        ".claude/"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-fetch"]
    }
  }
}
```

**IMPORTANT:** Adjust the filesystem paths above to match YOUR project structure. Only include directories that actually exist.

**Customization Notes:**
- The `${GITHUB_TOKEN}` references your environment variable (see Prerequisites)
- Add database servers (Neo4j, PostgreSQL, etc.) if needed
- Add project-specific MCP servers as required

---

## Task 4: Create Agents

Create the following 9 agent definition files in `.claude/agents/`:

### 4.1 architect.md

```markdown
---
name: architect
description: High-level system design and planning specialist. Use for complex features requiring architectural decisions, multi-file refactors, or new module design.
tools: Read, Grep, Glob, Task
model: opus
permissionMode: plan
---

# Architect Agent

You design implementation approaches for complex features, ensuring alignment with existing patterns and architectural decisions.

## When to Use This Agent

- New feature spanning multiple files/modules
- Significant refactoring efforts
- Integration with new external systems
- Performance optimization strategies
- Security architecture decisions

## Design Process

### 1. Understand Requirements
- Clarify goals and success criteria
- Identify constraints (performance, security, compatibility)
- Understand user expectations

### 2. Explore Existing Patterns
- Find similar implementations in codebase
- Identify reusable components
- Note any anti-patterns to avoid

### 3. Design Options
- Generate 2-3 viable approaches
- Analyze tradeoffs (complexity, performance, maintainability)
- Consider future extensibility

### 4. Recommend & Justify
- Select best approach with clear reasoning
- Acknowledge tradeoffs
- Identify risks and mitigations

### 5. Create Implementation Plan
- Break into discrete, testable steps
- Identify critical files to modify
- Specify tests needed

## Output Format

```markdown
## Architecture Plan: [Feature/Change Name]

### Requirements
- [Requirement 1]
- [Requirement 2]
- [Constraint: ...]

### Existing Patterns
Found in codebase:
- [Pattern 1] in `src/lib/example.ts:50-80`
- [Pattern 2] in `src/api/routes/example.ts`

### Options Considered

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| A: [Name] | [Brief description] | Fast, simple | Limited flexibility |
| B: [Name] | [Brief description] | Flexible, scalable | More complex |

### Recommended Approach
**Option [X]: [Name]**

Rationale: [Why this option is best for this specific case]

### Implementation Plan

**Phase 1: [Name]**
1. [ ] [Step with file reference]
2. [ ] [Step with file reference]

**Phase 2: [Name]**
1. [ ] [Step]
2. [ ] [Step]

### Files to Modify
| File | Changes | Risk |
|------|---------|------|
| src/lib/foo.ts | Add new function X | Low |

### Tests Needed
- [ ] Unit: [What to test]
- [ ] Integration: [What to test]

### Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Low | High | [How to prevent/handle] |
```

## Principles

- **Minimal change**: Prefer solutions that minimize blast radius
- **Existing patterns**: Reuse what works in this codebase
- **Testability**: Design for easy testing
- **Incrementality**: Break into shippable chunks
- **Security first**: Consider OWASP implications
```

### 4.2 code-reviewer.md

```markdown
---
name: code-reviewer
description: Automated code review specialist. Use after significant code changes to verify quality, patterns, and potential issues before committing.
tools: Read, Grep, Glob
model: haiku
permissionMode: plan
---

# Code Reviewer Agent

You review code changes for quality, security, and consistency with project patterns.

## Review Checklist

### Security (CRITICAL)
- [ ] No hardcoded credentials or API keys
- [ ] Parameterized queries (SQL/NoSQL) - no string interpolation
- [ ] Input validation present for user data
- [ ] No XSS vectors (innerHTML, dangerouslySetInnerHTML)

### Quality
- [ ] Functions under 50 lines
- [ ] Files under 300 lines
- [ ] No console.log (use proper logging)
- [ ] Error handling present
- [ ] TypeScript types defined (no `any` abuse)

### Code Style
- [ ] Async/await (not .then chains)
- [ ] Early returns to reduce nesting
- [ ] Meaningful variable names
- [ ] No dead code or commented-out blocks

## Process

1. Read the changed files
2. Check against each category in the checklist
3. Identify issues with file:line references
4. Provide specific fix recommendations
5. Give overall recommendation

## Output Format

```markdown
## Code Review: [files reviewed]

### Summary
[1-2 sentence overview of the changes and their quality]

### Issues Found

| Severity | Location | Issue | Recommended Fix |
|----------|----------|-------|-----------------|
| CRITICAL | src/foo.ts:42 | SQL injection via string concat | Use parameterized query |
| HIGH | src/bar.ts:15 | Missing error handling | Add try/catch |
| MEDIUM | src/baz.ts:88 | Function exceeds 50 lines | Extract helper function |
| LOW | src/qux.ts:3 | Unused import | Remove import |

### Passed Checks
- [x] No hardcoded credentials
- [x] Query timeouts specified

### Recommendation
**APPROVE** / **REQUEST_CHANGES** / **NEEDS_DISCUSSION**

[Brief justification for recommendation]
```

## Severity Definitions

- **CRITICAL**: Security vulnerability, must fix before merge
- **HIGH**: Bug or significant code smell, should fix
- **MEDIUM**: Pattern violation or maintainability concern
- **LOW**: Style or minor improvement suggestion
```

### 4.3 database-optimizer.md

```markdown
---
name: database-optimizer
description: Database query optimization specialist. Use proactively for slow queries, index strategy, and database performance tuning.
tools: Read, Grep, Glob
model: sonnet
permissionMode: plan
---

# Database Optimizer Agent

You are a database optimization specialist focusing on:
- Query performance analysis and optimization
- Index strategy and constraint design
- Query timeout compliance
- Memory management

## Query Analysis Process

### 1. Profile Query
Use EXPLAIN/ANALYZE to understand query execution plan.

### 2. Key Metrics to Check

| Metric | Target | Action if Exceeded |
|--------|--------|-------------------|
| Execution time | < timeout | Optimize query |
| Rows scanned | < 10,000 | Add index |
| Memory usage | < 512MB | Use pagination |

### 3. Common Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| SELECT * | Fetches unused columns | Select specific columns |
| Missing index on WHERE | Full table scan | Create index |
| N+1 queries | Multiple round trips | Use JOIN or batch |
| No LIMIT | Memory explosion | Add pagination |

## Index Strategy

### Index Selection Guidelines

| Query Pattern | Index Type |
|---------------|------------|
| Exact match (WHERE x = $val) | B-tree |
| Range query (WHERE x > $val) | B-tree |
| Text search (LIKE '%x%') | Full-text index |
| JSON field access | GIN index |

## Output Format

```markdown
## Database Optimization Analysis: {target}

### Query Profile
- **Execution time**: {ms}
- **Rows scanned**: {count}
- **Memory usage**: {MB}

### Issues Found

#### [HIGH] {Issue Title}
- **Query**: `{problematic query}`
- **Problem**: {description}
- **Fix**: {optimized query}
- **Expected improvement**: {X}x faster

### Index Recommendations

| Index | Type | Query Benefit |
|-------|------|---------------|

### Implementation Priority
1. {highest impact change}
2. {next priority}
```
```

### 4.4 deep-researcher.md

```markdown
---
name: deep-researcher
description: Comprehensive research specialist for API documentation, competitive analysis, and market research. Use proactively for any research tasks requiring multiple sources.
tools: Read, Bash, Grep, Glob, WebFetch, WebSearch
model: sonnet
permissionMode: plan
---

# Deep Researcher Agent

You are a thorough research specialist. You perform comprehensive, multi-source research to support development decisions.

## Research Focus Areas

- **API Documentation** - Endpoints, authentication, rate limits, schemas
- **Data Availability** - What's accessible via API vs requires scraping
- **Best Practices** - Patterns, anti-patterns, security considerations
- **Competitive Analysis** - Alternative approaches and tools
- **Integration Complexity** - Effort estimates and dependencies

## Research Process

1. **Understand the Query** - What exactly needs to be researched?
2. **Identify Sources** - Official docs, repos, articles, examples
3. **Deep Dive** - Read and analyze each source thoroughly
4. **Cross-Reference** - Validate findings across sources
5. **Synthesize** - Compile into actionable report

## Data Availability Classification

For EACH data source you identify, classify it as:

| Status | Description | Action |
|--------|-------------|--------|
| **API Available** | Official API exists | Document endpoint, auth, rate limits |
| **Scraping Required** | Data exists but no API | Mark for scraping, document URL/fields |
| **Not Accessible** | Paywall, auth-wall, unavailable | Document barrier, note workarounds |

## Output Format

```markdown
## Research Report: {topic}

### Executive Summary
2-3 sentence overview of key findings.

### Data Sources

#### Source 1: {name}
- **URL**: {url}
- **Availability**: API Available / Scraping Required / Not Accessible
- **Auth**: {method}
- **Rate Limit**: {limit}
- **Key Fields**: {fields}

### API Endpoints (if applicable)
| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|

### Recommendations
1. Prioritized list of actionable recommendations

### Risks & Concerns
- Potential issues to be aware of

### Sources
- List of references consulted
```
```

### 4.5 domain-builder.md

```markdown
---
name: domain-builder
description: Expert builder for new features and domains. Use proactively for scaffolding new features, API integration, and database schema design.
tools: Read, Write, Edit, Bash, Grep, Glob
model: opus
permissionMode: bypassPermissions
---

# Domain Builder Agent

You are an expert builder specializing in:
- Project scaffolding from templates
- API integration
- Database schema design
- Data ingestion pipelines

## Build Phases (6 phases)

| Phase | Name | Purpose |
|-------|------|---------|
| 1 | Scaffold | Directory structure, package.json, tsconfig |
| 2 | Schema | Database schema, TypeScript types |
| 3 | Ingestion | Data fetching, parsing, storage |
| 4 | Queries | Database query functions, search |
| 5 | API | Express/Fastify routes, endpoints |
| 6 | Polish | Tests, documentation, error handling |

## Critical Rules

### Security
- Parameterized queries ONLY: `db.prepare('SELECT * WHERE id = ?').get(id)`
- Input validation with Zod schemas
- No credentials in code - use environment variables
- Audit all sensitive operations

### API Integration
- Respect rate limits
- Implement exponential backoff for failures
- Use circuit breaker pattern for unreliable APIs
- Cache responses where appropriate

## Output Format

```markdown
## Build Summary

**Feature**: {feature}
**Status**: Complete/Partial
**Phase**: {current phase}

### Files Created
- list of files

### Database Schema
- Tables/collections created
- Indexes created

### API Integration
- Endpoints configured
- Rate limits respected

### Tests
- Tests created: N
- Tests passing: N

### Next Steps
- Recommended follow-up actions
```

## Error Recovery

If a build phase fails:
1. Check BUILD_CONTEXT.md for last successful step
2. Review error log
3. Fix the specific issue
4. Resume from failed step (not from scratch)
```

### 4.6 llm-architect.md

```markdown
---
name: llm-architect
description: LLM system optimization specialist for model routing, RAG patterns, token cost management, and prompt engineering.
tools: Read, Grep, Glob
model: opus
permissionMode: plan
---

# LLM Architect Agent

You are an LLM architecture specialist focusing on:
- Model selection strategy
- RAG implementation and vector memory optimization
- Token cost tracking and optimization
- Prompt engineering

## Model Selection Strategy

### Model Tiers

| Model | Cost/M tokens | Best For |
|-------|--------------|----------|
| **Opus** | High | Complex reasoning, architecture |
| **Sonnet** | Medium | Implementation, analysis |
| **Haiku** | Low | Fast, simple tasks |

### Routing Guidelines

- Architecture decisions -> Opus (quality compounds)
- Execution tasks -> Sonnet (follow patterns)
- Validation/config -> Haiku (fast, cheap)

## Context Window Optimization

### Token Budget Guidelines

| Context Type | Max Tokens | Strategy |
|--------------|------------|----------|
| System prompt | 2,000 | Keep static, cacheable |
| Conversation history | 8,000 | Summarize after 10 turns |
| Retrieved context (RAG) | 4,000 | Top-K with reranking |
| Tool results | 3,000 | Truncate verbose output |

### Compression Techniques

1. **Conversation Summarization**: After N turns, compress to key facts
2. **Context Pruning**: Remove resolved topics from history
3. **Retrieval Filtering**: Use semantic similarity threshold > 0.7

## RAG Implementation Patterns

### Retrieval Optimization

| Technique | When to Use |
|-----------|-------------|
| Semantic search | General queries |
| Hybrid (semantic + keyword) | Technical terms |
| Reranking | High-stakes decisions |
| MMR (diversity) | Avoiding redundancy |

## Output Format

```markdown
## LLM Architecture Analysis: {target}

### Current State
- Model usage: {breakdown}
- Token consumption: {estimate}
- Cost efficiency: {rating}

### Recommendations

#### Model Routing
| Component | Current | Recommended | Reason |
|-----------|---------|-------------|--------|

#### Context Optimization
1. {specific recommendation}

#### Cost Savings
- Estimated savings: ${amount}/month
- Changes required: {list}
```
```

### 4.7 migration-specialist.md

```markdown
---
name: migration-specialist
description: Database and schema migration specialist. Use for schema changes, data migrations, and backwards-compatible updates.
tools: Read, Grep, Glob, Bash
model: sonnet
permissionMode: plan
---

# Migration Specialist Agent

You handle database schema changes and data migrations safely.

## Migration Protocol

### 1. Analyze Current Schema
Document existing tables, constraints, indexes.

### 2. Design Migration
- Ensure backwards compatibility where possible
- Use idempotent operations (IF NOT EXISTS / IF EXISTS)
- Plan for rollback scenarios
- Consider data volume and performance

### 3. Create Migration Script
File naming: `{version}-{description}.ts` or `.sql`

### 4. Test First
- Run on local/dev database first
- Verify with EXPLAIN/ANALYZE
- Check for lock contention

### 5. Execute with Rollback Plan
- Have rollback script ready
- Execute during low-traffic period
- Verify immediately after

## Migration Script Template

```typescript
// Migration: {version}-{description}
// Date: YYYY-MM-DD
// Backwards Compatible: yes/no

export async function up(): Promise<void> {
  // Step 1: Create new structures
  // Step 2: Migrate data
  // Step 3: Add constraints
}

export async function down(): Promise<void> {
  // Reverse the migration
}
```

## Output Format

```markdown
## Migration Plan: [Description]

### Current State
- Tables: [list]
- Constraints: [existing]
- Indexes: [existing]

### Target State
- New tables: [if any]
- New constraints: [list]
- Schema changes: [description]

### Migration Script
[UP migration code]

### Rollback Script
[DOWN migration code]

### Execution Plan
1. [ ] Test on dev database
2. [ ] Backup production
3. [ ] Execute during maintenance window
4. [ ] Run verification queries
5. [ ] Monitor for 24 hours
```
```

### 4.8 security-auditor.md

```markdown
---
name: security-auditor
description: OWASP security audit specialist. Use proactively for security-sensitive code including auth, payments, file uploads, and database queries.
tools: Read, Grep, Glob
model: sonnet
permissionMode: plan
---

# Security Auditor Agent

You are a security audit specialist following OWASP guidelines.

## OWASP Top 10 Checklist

| ID | Category | What to Check |
|----|----------|---------------|
| A01 | Broken Access Control | Authorization bypasses, privilege escalation |
| A02 | Cryptographic Failures | Weak encryption, exposed secrets |
| A03 | Injection | SQL, NoSQL, OS command injection vectors |
| A04 | Insecure Design | Missing security controls |
| A05 | Security Misconfiguration | Default configs, verbose errors |
| A06 | Vulnerable Components | Known CVEs in dependencies |
| A07 | Auth Failures | Session management, credential storage |
| A08 | Data Integrity Failures | Insecure deserialization |
| A09 | Logging Failures | Missing audit trails |
| A10 | SSRF | Server-side request forgery |

## Audit Process

1. **Scan Code** - Identify security-sensitive patterns
2. **Check Dependencies** - Look for known vulnerabilities
3. **Analyze Auth** - Review authentication/authorization flows
4. **Test Injection Points** - Identify SQL/XSS/command injection vectors
5. **Review Secrets** - Check for exposed credentials

## Security Patterns to Find

### CRITICAL - SQL Injection
```typescript
// DANGEROUS
db.query(`SELECT * FROM users WHERE id = '${userId}'`)

// SAFE
db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
```

### CRITICAL - XSS
```typescript
// DANGEROUS
element.innerHTML = userInput

// SAFE
element.textContent = userInput
```

### HIGH - Exposed Secrets
```typescript
// DANGEROUS
const API_KEY = "sk-abc123..."

// SAFE
const API_KEY = process.env.API_KEY
```

## Output Format

```markdown
## Security Audit: {target}

### Risk Level: CRITICAL / HIGH / MEDIUM / LOW

### Summary
Overall security posture assessment.

### Vulnerabilities Found

#### [CRITICAL] {Title}
- **OWASP**: A03 - Injection
- **Location**: `src/api/users.ts:42`
- **Description**: {what the issue is}
- **Remediation**: {fixed code}

### Passed Checks
- List of security controls that passed

### Blockers
- Issues that MUST be fixed before production deploy
```

## Severity Guidelines

| Severity | Criteria | Action |
|----------|----------|--------|
| CRITICAL | Exploitable, high impact (RCE, data breach) | Block deploy |
| HIGH | Exploitable, medium impact | Fix before prod |
| MEDIUM | Requires specific conditions | Fix soon |
| LOW | Defense in depth, best practice | Track for later |
```

### 4.9 test-runner.md

```markdown
---
name: test-runner
description: Test execution specialist for running and analyzing test suites. Use proactively after code changes to verify nothing is broken.
tools: Read, Bash, Grep
model: haiku
permissionMode: bypassPermissions
---

# Test Runner Agent

You are a test execution specialist. Your job is to run test suites and provide clear, actionable reports.

## Test Execution Process

1. **Discover Tests** - Find all test files in the project
2. **Run Tests** - Execute with appropriate runner
3. **Capture Output** - Full logs, coverage, and timing
4. **Analyze Failures** - Understand why tests failed
5. **Report Results** - Provide structured summary

## Supported Test Runners

### JavaScript/TypeScript
```bash
# Jest
npm test -- --coverage --verbose

# Vitest
npm run test -- --coverage

# Check which is configured
cat package.json | grep -A5 '"test"'
```

### Python
```bash
pytest --cov --verbose -x
```

## Output Format

```markdown
## Test Results: {project/module}

### Summary
| Metric | Value |
|--------|-------|
| Total Tests | N |
| Passed | N |
| Failed | N |
| Skipped | N |
| Duration | X.Xs |

### Coverage
| Type | Coverage |
|------|----------|
| Lines | X% |
| Branches | X% |
| Functions | X% |

### Failures (if any)

#### Test: {test name}
**File**: {path}
**Error**:
```
{error message}
```
**Likely Cause**: {analysis}
**Suggested Fix**: {recommendation}

### Recommendations
- Actions to fix failing tests
- Coverage improvement suggestions
```

## Key Behaviors

- Run tests in verbose mode for maximum information
- If tests fail, analyze the failure before reporting
- Suggest specific fixes, not just "fix the test"
- Report coverage gaps for critical code paths
```

---

## Task 5: Create Hooks

Create the following 13 Python hook files in `.claude/hooks/`:

### 5.1 session_start.py

```python
#!/usr/bin/env python3
"""
SessionStart Hook: Environment Initialization
Runs at the start of each Claude Code session.
"""

import sys
import json
import os
import subprocess
from datetime import datetime
from pathlib import Path

SESSION_LOG = Path('.claude/memory/session_log.md')
REQUIRED_ENV_VARS = ['GITHUB_TOKEN']
OPTIONAL_ENV_VARS = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY']


def check_env_vars() -> dict:
    """Check which environment variables are set."""
    status = {}
    for var in REQUIRED_ENV_VARS:
        status[var] = 'set' if os.environ.get(var) else 'MISSING'
    for var in OPTIONAL_ENV_VARS:
        if os.environ.get(var):
            status[var] = 'set'
    return status


def check_tools() -> dict:
    """Check if required tools are available."""
    tools = {}
    for tool, cmd in [('python', ['python', '--version']),
                       ('node', ['node', '--version']),
                       ('git', ['git', '--version'])]:
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=2)
            tools[tool] = result.stdout.strip() if result.returncode == 0 else 'not found'
        except Exception:
            tools[tool] = 'not found'
    return tools


def get_git_info() -> dict:
    """Get current git state."""
    info = {}
    try:
        result = subprocess.run(['git', 'branch', '--show-current'],
                                capture_output=True, text=True, timeout=2)
        info['branch'] = result.stdout.strip() if result.returncode == 0 else 'unknown'

        result = subprocess.run(['git', 'status', '--porcelain'],
                                capture_output=True, text=True, timeout=3)
        if result.returncode == 0:
            lines = [l for l in result.stdout.strip().split('\n') if l]
            info['uncommitted_files'] = len(lines)
    except Exception:
        pass
    return info


def log_session_start(session_id: str, env_status: dict, git_info: dict):
    """Append session start to log."""
    try:
        SESSION_LOG.parent.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        entry = f"\n## Session {session_id[:8]} - {timestamp}\n\n"
        entry += "**Environment:**\n"
        for var, status in env_status.items():
            icon = 'Y' if status == 'set' else 'X'
            entry += f"- {icon} {var}: {status}\n"
        entry += f"\n**Git:** {git_info.get('branch', 'unknown')} "
        entry += f"({git_info.get('uncommitted_files', 0)} uncommitted)\n"
        entry += "\n---\n"

        with open(SESSION_LOG, 'a', encoding='utf-8') as f:
            f.write(entry)
    except Exception:
        pass


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    session_id = input_data.get('session_id', 'unknown')
    env_status = check_env_vars()
    git_info = get_git_info()
    log_session_start(session_id, env_status, git_info)

    warnings = [f"Missing env var: {var}" for var, status in env_status.items()
                if status == 'MISSING' and var in REQUIRED_ENV_VARS]

    if warnings:
        response = {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "systemMessage": f"[Session Init] Warnings: {'; '.join(warnings)}"
            }
        }
        print(json.dumps(response))
    else:
        response = {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "systemMessage": "startup hook success: Success"
            }
        }
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
```

### 5.2 orphan_cleanup.py

```python
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
```

### 5.3 context_injector.py

```python
#!/usr/bin/env python3
"""
UserPromptSubmit Hook: Context Injector
Automatically injects relevant context into prompts.
"""

import sys
import json
import subprocess
from pathlib import Path


def get_git_branch() -> str:
    """Get current git branch name."""
    try:
        result = subprocess.run(['git', 'branch', '--show-current'],
                                capture_output=True, text=True, timeout=2)
        if result.returncode == 0:
            return result.stdout.strip()
    except Exception:
        pass
    return ""


def get_git_status_summary() -> str:
    """Get brief git status."""
    try:
        result = subprocess.run(['git', 'status', '--porcelain'],
                                capture_output=True, text=True, timeout=3)
        if result.returncode == 0 and result.stdout.strip():
            lines = result.stdout.strip().split('\n')
            modified = len([l for l in lines if l.startswith(' M') or l.startswith('M ')])
            added = len([l for l in lines if l.startswith('A ') or l.startswith('??')])
            deleted = len([l for l in lines if l.startswith(' D') or l.startswith('D ')])

            parts = []
            if modified: parts.append(f"{modified} modified")
            if added: parts.append(f"{added} added/untracked")
            if deleted: parts.append(f"{deleted} deleted")

            if parts:
                return ", ".join(parts)
    except Exception:
        pass
    return ""


def get_active_task() -> str:
    """Read active task from memory file."""
    memory_file = Path('.claude/memory/active_context.md')
    if memory_file.exists():
        try:
            content = memory_file.read_text(encoding='utf-8')
            if '## Current Task' in content:
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if '## Current Task' in line and i + 1 < len(lines):
                        task = lines[i + 1].strip()
                        if task and task != '[No active task]' and not task.startswith('#'):
                            return task[:100]
        except Exception:
            pass
    return ""


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    context_parts = []

    branch = get_git_branch()
    if branch:
        context_parts.append(f"Branch: {branch}")

    status = get_git_status_summary()
    if status:
        context_parts.append(f"Git: {status}")

    task = get_active_task()
    if task:
        context_parts.append(f"Active: {task}")

    if context_parts:
        context_str = " | ".join(context_parts)
        response = {"systemMessage": f"[Context] {context_str}"}
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
```

### 5.4 safety_firewall.py

```python
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
    r'rm\s+(-rf|-fr|--recursive)\s+[/\\]',
    r'rm\s+(-rf|-fr|--recursive)\s+\*',
    r'del\s+/s\s+/q\s+[cC]:\\',
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
        if protected in command or protected.replace('/', '\\') in command:
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
```

### 5.5 auto_lint.py

```python
#!/usr/bin/env python3
"""
PostToolUse Hook: Auto-Lint
Automatically formats and lints files after modification.
"""

import sys
import json
import subprocess
import os
from pathlib import Path

FORMATTERS = {
    '.ts': ['npx', 'prettier', '--write'],
    '.tsx': ['npx', 'prettier', '--write'],
    '.js': ['npx', 'prettier', '--write'],
    '.jsx': ['npx', 'prettier', '--write'],
    '.json': ['npx', 'prettier', '--write'],
    '.md': ['npx', 'prettier', '--write'],
    '.py': ['python', '-m', 'ruff', 'format'],
}

LINTERS = {
    '.ts': ['npx', 'eslint', '--fix', '--quiet'],
    '.tsx': ['npx', 'eslint', '--fix', '--quiet'],
}


def get_project_root() -> Path:
    """Find the project root (where package.json is)."""
    current = Path.cwd()
    while current != current.parent:
        if (current / 'package.json').exists():
            return current
        current = current.parent
    return Path.cwd()


def run_formatter(file_path: str, commands: list) -> tuple:
    """Run a formatter on the file."""
    try:
        full_cmd = commands + [file_path]
        result = subprocess.run(full_cmd, capture_output=True, text=True,
                                cwd=get_project_root(), timeout=10)
        if result.returncode == 0:
            return True, ""
        return False, result.stderr
    except subprocess.TimeoutExpired:
        return False, "Formatter timed out"
    except FileNotFoundError:
        return False, f"Formatter not found: {commands[0]}"
    except Exception as e:
        return False, str(e)


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
    if not file_path or not os.path.exists(file_path):
        sys.exit(0)

    ext = os.path.splitext(file_path)[1].lower()
    messages = []

    if ext in FORMATTERS:
        success, error = run_formatter(file_path, FORMATTERS[ext])
        if success:
            messages.append(f"Formatted {os.path.basename(file_path)}")
        elif error:
            messages.append(f"Format warning: {error}")

    if ext in LINTERS:
        success, error = run_formatter(file_path, LINTERS[ext])
        if success:
            messages.append(f"Linted {os.path.basename(file_path)}")

    if messages:
        response = {"systemMessage": f"[Auto-format] {'; '.join(messages)}"}
        print(json.dumps(response))

    sys.exit(0)


if __name__ == '__main__':
    main()
```

### 5.6 typecheck_gate.py

```python
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
```

### 5.7 audit_logger.py

```python
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
```

### 5.8 metrics_collector.py

```python
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
```

### 5.9 session_checkpoint.py

```python
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
```

### 5.10 notification_hook.py

```python
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
```

### 5.11 precompact_save.py

```python
#!/usr/bin/env python3
"""
PreCompact Hook: State Preservation
Saves critical state before context compaction.
"""

import sys
import json
from datetime import datetime
from pathlib import Path


def save_precompact_state(input_data: dict):
    """Save critical state before compaction."""
    state_file = Path('.claude/memory/precompact_state.md')

    try:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        conversation_id = input_data.get('conversation_id', 'unknown')

        content = f"""# Pre-Compact State Snapshot

**Saved**: {timestamp}
**Conversation**: {conversation_id}

## Note
This file was auto-generated before a context compaction.
If you're resuming work and feel context was lost, check this file.

## Recovery Instructions
1. Read this file to understand where you left off
2. Read .claude/memory/active_context.md for current task
3. Read .claude/memory/session_log.md for recent history

---
*Auto-generated by precompact_save.py hook*
"""

        state_file.parent.mkdir(parents=True, exist_ok=True)
        state_file.write_text(content, encoding='utf-8')

        response = {
            "systemMessage": "[PreCompact] Critical state saved to .claude/memory/precompact_state.md"
        }
        print(json.dumps(response))
    except Exception:
        pass


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    hook_type = input_data.get('hook_type', '')
    if hook_type != 'PreCompact':
        sys.exit(0)

    save_precompact_state(input_data)
    sys.exit(0)


if __name__ == '__main__':
    main()
```

### 5.12 subagent_summarizer.py

```python
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
```

### 5.13 pre-commit.py

```python
#!/usr/bin/env python3
"""
Git Pre-Commit Hook Integration
Install by running: python .claude/hooks/pre-commit.py --install

Note: Uses shell=True for Windows compatibility with npx commands.
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
```

---

## Task 6: Create Scripts

Create utility scripts in `.claude/scripts/`:

### 6.1 metrics_summary.py

```python
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
```

---

## Task 7: Initialize Memory Files

Create empty placeholder files in `.claude/memory/`:

```bash
touch .claude/memory/session_log.md
touch .claude/memory/active_context.md
```

Optionally initialize `active_context.md`:

```markdown
# Active Context

## Current Task
[No active task]

## Recent Decisions
- None recorded

## Open Questions
- None

---
*This file is updated by Claude Code to track session state.*
```

---

## Task 8: Add to .gitignore

Add these entries to your project's `.gitignore`:

```gitignore
# Claude Code runtime data (don't commit)
.claude/audit.log
.claude/metrics.jsonl
.claude/memory/session_log.md
.claude/memory/precompact_state.md
.claude/notifications.log

# Keep configuration (do commit)
# !.claude/settings.local.json
# !.claude/mcp.json
# !.claude/agents/
# !.claude/hooks/
# !.claude/scripts/
```

---

## Task 9: Install Pre-commit Hook (Optional)

Run this command to install the git pre-commit hook:

```bash
python .claude/hooks/pre-commit.py --install
```

---

## Task 10: Verify Setup

Run these commands to verify the setup:

```bash
# Check folder structure
ls -la .claude/
ls -la .claude/agents/
ls -la .claude/hooks/

# Test a hook manually
echo '{}' | python .claude/hooks/session_start.py

# Run metrics summary (will be empty initially)
python .claude/scripts/metrics_summary.py
```

---

## Customization Guide

### Adding Protected Files

Edit `.claude/hooks/safety_firewall.py` and add paths to `PROTECTED_FILES`:

```python
PROTECTED_FILES = [
    '.env',
    '.env.local',
    'src/lib/security.ts',  # Add your protected files
]
```

### Adding Custom Agents

Create new `.md` files in `.claude/agents/` following this template:

```markdown
---
name: my-agent
description: What this agent does
tools: Read, Grep, Glob  # Tools it can use
model: sonnet  # opus, sonnet, or haiku
permissionMode: plan  # plan or bypassPermissions
---

# Agent Name

Agent instructions go here...
```

### Configuring Notifications

Set these environment variables for external notifications:
- `SLACK_WEBHOOK_URL` - Slack incoming webhook URL
- `DISCORD_WEBHOOK_URL` - Discord webhook URL
- `ENABLE_TOAST=1` - Enable Windows toast notifications
- `NOTIFY_ALL=1` - Send all notifications (not just HIGH priority)

---

## Summary

After completing all tasks, your `.claude` folder should contain:

```
.claude/
├── agents/
│   ├── architect.md
│   ├── code-reviewer.md
│   ├── database-optimizer.md
│   ├── deep-researcher.md
│   ├── domain-builder.md
│   ├── llm-architect.md
│   ├── migration-specialist.md
│   ├── security-auditor.md
│   └── test-runner.md
├── hooks/
│   ├── audit_logger.py
│   ├── auto_lint.py
│   ├── context_injector.py
│   ├── metrics_collector.py
│   ├── notification_hook.py
│   ├── orphan_cleanup.py
│   ├── pre-commit.py
│   ├── precompact_save.py
│   ├── safety_firewall.py
│   ├── session_checkpoint.py
│   ├── session_start.py
│   ├── subagent_summarizer.py
│   └── typecheck_gate.py
├── memory/
│   ├── active_context.md
│   └── session_log.md
├── scripts/
│   └── metrics_summary.py
├── mcp.json
└── settings.local.json
```

This configuration provides:
- 9 specialized agents for different tasks
- 13 automation hooks for safety, quality, and observability
- MCP server integration for extended capabilities
- Metrics tracking and audit logging
- Notification system for important events

---

## Troubleshooting

### Pre-commit Hook Fails on Windows
If you get `[WinError 2] The system cannot find the file specified`, the hook already includes `shell=True` for Windows compatibility. If issues persist:
```bash
git commit --no-verify -m "Your message"
```

### Missing GITHUB_TOKEN Warning
Set the environment variable as described in the Prerequisites section. Restart your terminal after setting it.

### Hooks Not Running
Ensure Python is in your PATH and the hooks have execute permissions:
```bash
chmod +x .claude/hooks/*.py
```
