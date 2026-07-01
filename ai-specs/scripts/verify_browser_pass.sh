#!/usr/bin/env bash
#
# PreToolUse gate for `git commit`: enforce the mandatory Playwright MCP browser
# verification for user-facing OpenSpec changes.
#
# Contract (Claude Code PreToolUse hook):
#   - Reads the tool-call payload as JSON on stdin.
#   - Exit 0  -> allow the commit.
#   - Exit 2  -> block the commit; stderr is shown to the agent as the reason.
#
# Honest scope: this checks that the change's `tasks.md` has its
# "Browser Verification" section fully checked ([x]). It proves the agent did
# not skip / leave-unchecked the mandatory step. It does NOT prove a browser
# actually rendered the canvas — a deterministic shell hook cannot. See
# docs/openspec-tasks-mandatory-steps.md for the evidence-based follow-up.
#
# It deliberately NO-OPs (allows the commit) when:
#   - the tool call is not a `git commit`,
#   - the branch does not map to an openspec change,
#   - the change has no tasks.md, or
#   - the tasks.md has no "Browser Verification" section (non-user-facing change).

set -euo pipefail

payload="$(cat)"

# --- 1. Only gate `git commit` -------------------------------------------------
command="$(printf '%s' "$payload" | jq -r '.tool_input.command // ""')"
case "$command" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

# --- 2. Resolve the active change from the branch name ------------------------
# Convention: feature/<change-id> (or the feat/<change-id> shorthand)
#             -> openspec/changes/<change-id>/
repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
[ -n "$repo_root" ] || exit 0

branch="$(git -C "$repo_root" branch --show-current 2>/dev/null || true)"
case "$branch" in
  feature/*) change_id="${branch#feature/}" ;;
  feat/*)    change_id="${branch#feat/}" ;;
  *) exit 0 ;;   # not a change branch -> nothing to enforce
esac

tasks_file="$repo_root/openspec/changes/$change_id/tasks.md"
[ -f "$tasks_file" ] || exit 0   # no matching change -> no-op

# --- 3. Locate the Browser Verification section -------------------------------
# Match a heading line containing "Browser Verification". If absent, the change
# is treated as non-user-facing and the gate passes.
if ! grep -qiE '^#+.*Browser Verification' "$tasks_file"; then
  exit 0
fi

# Extract the lines from that heading up to (not including) the next heading,
# then look for any unchecked task box "[ ]".
section="$(awk '
  /^#+.*[Bb]rowser [Vv]erification/ { capture=1; next }
  capture && /^#+ / { capture=0 }
  capture { print }
' "$tasks_file")"

if printf '%s\n' "$section" | grep -qE '^\s*-\s*\[ \]'; then
  unchecked="$(printf '%s\n' "$section" | grep -E '^\s*-\s*\[ \]' | sed 's/^/    /')"
  cat >&2 <<EOF
BLOCKED: mandatory Playwright MCP browser verification is incomplete for change "$change_id".

Unchecked items in the "Browser Verification" section of $tasks_file:
$unchecked

Per docs/openspec-tasks-mandatory-steps.md, the agent MUST execute the browser
pass (navigate -> snapshot -> drive interaction -> verify spec scenario) and
mark each item [x] before committing. Run the verification, check the boxes,
then commit again.
EOF
  exit 2
fi

exit 0
