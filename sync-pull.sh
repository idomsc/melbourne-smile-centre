#!/bin/bash
# Auto-pull every 4 seconds (for the other collaborator's machine)
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "⬇  Auto-pulling into $REPO_DIR"
echo "    Press Ctrl+C to stop."
echo ""

while true; do
  cd "$REPO_DIR"
  RESULT=$(git pull --quiet 2>&1)
  if [[ "$RESULT" != "Already up to date." && -n "$RESULT" ]]; then
    echo "✓ Updated at $(date '+%H:%M:%S'): $RESULT"
  fi
  sleep 4
done
