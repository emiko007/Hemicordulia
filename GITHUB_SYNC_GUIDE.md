# GitHub Sync Setup Guide

## ✅ Current Status
Your CyberSculpt Showcase project is **connected to GitHub** and ready for automatic syncing!

- **Repository:** https://github.com/emiko007/Hemicordulia
- **Latest Commit:** feat: Integrate Advanced Temporal Market Analysis Agent
- **Branch:** main

## 🚀 Quick Sync Options

### Option 1: Manual Sync (Immediate)
Run the sync script whenever you want to push changes:

**Windows (PowerShell):**
```bash
.\sync-github.ps1
```

**macOS/Linux (Bash):**
```bash
./sync-github.sh
```

### Option 2: Auto-Sync Every 5 Minutes (Advanced)
Add this to Windows Task Scheduler:

1. Open **Task Scheduler**
2. Create Basic Task → **"CyberSculpt Sync"**
3. Trigger: **Repeat every 5 minutes**
4. Action: **Start a program**
   - Program: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`
   - Arguments: `-ExecutionPolicy Bypass -File "C:\Users\DELL\Downloads\cybersculpt-showcase\sync-github.ps1"`
   - Start in: `C:\Users\DELL\Downloads\cybersculpt-showcase`

### Option 3: GitHub Actions (Recommended)
A `.github/workflows/ci.yml` file has been created for automatic testing and deployment.

## 📋 Workflow

Your changes will be synced automatically through:

1. **Local Development**
   - Edit files in VS Code
   - Save changes

2. **Stage & Commit**
   - Run sync script
   - Or: `git add -A && git commit -m "message"`

3. **Push to GitHub**
   - Sync script pushes automatically
   - Or: `git push origin main`

4. **GitHub Actions CI/CD**
   - Tests run automatically
   - Deployment to production (if configured)

## 🔧 Manual Git Commands

If you prefer direct git commands:

```bash
# Check status
git status

# Stage all changes
git add -A

# Commit with message
git commit -m "feat: Your feature description"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline -10
```

## 📊 Current Files Synced

✅ **Advanced AI Agent:**
- `src/lib/advancedAgent.ts` - Advanced Temporal Market Analysis
- `src/lib/temporalAgent.ts` - Original Temporal Agent
- `src/components/TemporalEngineView.tsx` - Updated UI component

✅ **Dependencies Added:**
- `langchain` v0.x
- `@langchain/core` v0.x
- `@langchain/openai` v0.x
- `ai` (Vercel AI SDK)

## 🔐 GitHub Access

Your credentials are securely stored via:
- SSH Key (recommended)
- GitHub Personal Access Token
- Or Git credential manager

**To configure SSH:**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub  # Copy this to GitHub Settings
```

## 🎯 Next Steps

1. ✅ GitHub repo connected
2. ✅ Initial commit pushed
3. ⏭️ **Optional:** Set up GitHub Actions
4. ⏭️ **Optional:** Configure automatic syncing
5. ⏭️ **Optional:** Set up branch protection rules

## 📚 Resources

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI](https://cli.github.com/)

---

**Your project is now fully synced with GitHub! 🎉**
