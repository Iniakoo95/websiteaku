@echo off
setlocal

echo ==========================================
echo   Hugging Face CLI - Windows Installer
 echo ==========================================
echo.
echo Installing the official Hugging Face CLI (hf)...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://hf.co/cli/install.ps1 | iex"

if errorlevel 1 (
    echo.
    echo Installation failed. Please make sure Windows PowerShell is available and you have an internet connection.
    pause
    exit /b 1
)

echo.
echo Installation command completed.
echo.
echo Testing hf command...
hf --version

if errorlevel 1 (
    echo.
    echo Hugging Face was installed, but Windows may need a new terminal window before 'hf' is recognized.
    echo Close this window, open PowerShell again, and run: hf --version
) else (
    echo.
    echo SUCCESS! Hugging Face CLI is installed.
)

echo.
pause
endlocal
