#!/bin/bash
# Auto-push whenever a file changes
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "👁  Watching for changes in $REPO_DIR"
echo "    Press Ctrl+C to stop."
echo ""

fswatch -o "$REPO_DIR" \
  --exclude "\.git" \
  --exclude "\.DS_Store" \
  --exclude "sync-push\.sh" \
  --latency 1.5 | while read; do
    cd "$REPO_DIR"
    if [[ -n $(git status --porcelain) ]]; then
      git add -A
      git commit -m "auto-sync $(date '+%H:%M:%S')" --quiet
      git push --quiet
      echo "✓ Pushed at $(date '+%H:%M:%S')"
    fi
done
