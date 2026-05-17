@echo off
REM Auto-elevate batch script for GitHub auto-sync setup
REM This file automatically elevates to admin and runs the setup

setlocal enabledelayedexpansion

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% == 0 (
    REM Already admin, run the setup
    cd /d "%~dp0"
    powershell.exe -ExecutionPolicy Bypass -File "setup-auto-sync.ps1"
) else (
    REM Need to elevate - create VBS script that runs as admin
    for /f %%A in ('cd') do set "currdir=%%A"
    (
        echo Set objShell = CreateObject^("Shell.Application"^)
        echo objShell.ShellExecute "cmd.exe", "/c cd /d !currdir! ^& powershell.exe -ExecutionPolicy Bypass -File setup-auto-sync.ps1", "", "runas", 1
    ) > "%temp%\elevate.vbs"
    cscript.exe "%temp%\elevate.vbs"
    del "%temp%\elevate.vbs"
)
