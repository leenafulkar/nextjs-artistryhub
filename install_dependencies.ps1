# install_dependencies.ps1

# Ensure PowerShell treats any error as a terminating error
$ErrorActionPreference = "Stop"

Write-Host "Starting dependency installation..."

# Install dependencies
npm install --force

Write-Host "Dependencies installed successfully"
