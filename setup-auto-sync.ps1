#!/usr/bin/env pwsh
# Automatic GitHub Sync Setup for Windows Task Scheduler
# Run this ONCE to enable automatic syncing every 5 minutes

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CyberSculpt Auto-Sync Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$batchFile = Join-Path $scriptPath "sync-github.bat"
$taskName = "CyberSculpt-AutoSync"

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "[ERROR] This script requires Administrator privileges!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please right-click PowerShell and select 'Run as administrator'" -ForegroundColor Yellow
    Write-Host "Then run: Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser"
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "[?] Task already exists. Do you want to update it?" -ForegroundColor Yellow
    $response = Read-Host "Enter 'yes' to update or 'no' to skip"
    if ($response -ne "yes") {
        Write-Host "[SKIP] Auto-sync setup cancelled." -ForegroundColor Yellow
        exit 0
    }
    # Remove existing task
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "[OK] Removed existing task." -ForegroundColor Green
}

Write-Host "[*] Setting up automatic sync every 5 minutes..." -ForegroundColor Cyan
Write-Host ""

# Create scheduled task action
$action = New-ScheduledTaskAction -Execute $batchFile -WorkingDirectory $scriptPath

# Create trigger for every 5 minutes
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 36500)

# Create task settings
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -MultipleInstances IgnoreNew

# Register the task
Register-ScheduledTask -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Description "Auto-sync CyberSculpt project to GitHub every 5 minutes" `
    -RunLevel Highest | Out-Null

Write-Host "[OK] Task created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Auto-Sync Settings:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Task Name: $taskName"
Write-Host "Schedule: Every 5 minutes"
Write-Host "Script: $batchFile"
Write-Host "Log File: $scriptPath\sync-log.txt"
Write-Host ""

# Start the task immediately
Write-Host "[*] Starting first sync..." -ForegroundColor Cyan
Start-ScheduledTask -TaskName $taskName
Start-Sleep -Seconds 2

# Show task status
$task = Get-ScheduledTask -TaskName $taskName
Write-Host "[OK] Task Status: $($task.State)" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your changes will now automatically sync to GitHub every 5 minutes!" -ForegroundColor Yellow
Write-Host ""
Write-Host "To manage the task:" -ForegroundColor Cyan
Write-Host "  - Open Task Scheduler (taskschd.msc)"
Write-Host "  - Look for 'CyberSculpt-AutoSync' in the task list"
Write-Host "  - Right-click to run, disable, or delete"
Write-Host ""
Write-Host "To view sync logs:" -ForegroundColor Cyan
Write-Host "  - Open: $scriptPath\sync-log.txt"
Write-Host ""
