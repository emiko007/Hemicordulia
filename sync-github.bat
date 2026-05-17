@echo off
REM GitHub Auto-Sync Batch Wrapper for Task Scheduler
REM This file allows sync-github.ps1 to run automatically via Windows Task Scheduler

cd /d "%~dp0"
powershell.exe -ExecutionPolicy Bypass -File "%~dp0sync-github.ps1" >> "%~dp0sync-log.txt" 2>&1
exit /b %ERRORLEVEL%
