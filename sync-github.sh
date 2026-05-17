#!/bin/bash
# GitHub Auto-Sync Script for CyberSculpt Showcase
# This script automatically commits and pushes changes to GitHub

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo "🔄 Starting GitHub sync process..."
echo "Repository: $(pwd)"
echo ""

# Check for changes
if git diff-index --quiet HEAD --; then
    echo "✅ No changes to commit. Repository is up to date."
    exit 0
fi

echo "📝 Staging changes..."
git add -A

echo "✨ Creating commit..."
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_MSG="chore: Auto-sync changes - $TIMESTAMP

Auto-generated commit from sync script"

git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS: Changes synced to GitHub!"
    echo "📊 Summary:"
    echo "   Branch: $(git rev-parse --abbrev-ref HEAD)"
    echo "   Commit: $(git log -1 --pretty=format:'%h - %s')"
    echo "   Remote: $(git remote get-url origin)"
else
    echo "❌ Error: Push failed. Please check your GitHub credentials."
    exit 1
fi
