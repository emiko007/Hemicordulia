#!/usr/bin/env pwsh
# GitHub Auto-Sync Script for CyberSculpt Showcase (PowerShell)
# This script automatically commits and pushes changes to GitHub

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoDir

Write-Host "🔄 Starting GitHub sync process..." -ForegroundColor Cyan
Write-Host "Repository: $(pwd)" -ForegroundColor Gray
Write-Host ""

# Check for changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✅ No changes to commit. Repository is up to date." -ForegroundColor Green
    exit 0
}

Write-Host "📝 Staging changes..." -ForegroundColor Yellow
git add -A

Write-Host "✨ Creating commit..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMsg = @"
chore: Auto-sync changes - $timestamp

Auto-generated commit from sync script
"@

git commit -m $commitMsg

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS: Changes synced to GitHub!" -ForegroundColor Green
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    $branch = git rev-parse --abbrev-ref HEAD
    $lastCommit = git log -1 --pretty=format:'%h - %s'
    $remote = git remote get-url origin
    Write-Host "   Branch: $branch"
    Write-Host "   Commit: $lastCommit"
    Write-Host "   Remote: $remote"
} else {
    Write-Host "❌ Error: Push failed. Please check your GitHub credentials." -ForegroundColor Red
    exit 1
}
