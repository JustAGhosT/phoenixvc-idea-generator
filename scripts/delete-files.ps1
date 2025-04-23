# PowerShell script to delete duplicate provider and hook files

# Provider files to delete
$providerFiles = @(
    "providers/notification-service-provider.tsx",
    "providers/notification-service-provider-provider.tsx",
    "providers/notification-provider.tsx",
    "providers/notification-provider-provider.tsx",
    "providers/notification-provider-provider-provider.tsx",
    "providers/notification-context-provider-provider.tsx",
    "providers/notification-context-provider-provider-provider.tsx",
    "providers/notification-service-provider-provider-provider.tsx"
)

# Hook files to delete
$hookFiles = @(
    "hooks/use-notification-service.ts",
    "hooks/use-notification-provider.ts",
    "hooks/use-notification-api.ts",
    "hooks/use-notifications.ts",
    "hooks/use-search-service.ts",
    "hooks/use-search-provider.ts",
    "hooks/use-search-api.ts",
    "hooks/use-theme-service.ts",
    "hooks/use-theme-provider.ts",
    "hooks/use-theme-api.ts"
)

# Function to safely delete a file with confirmation
function Remove-FileWithConfirmation {
    param (
        [string]$FilePath
    )
    
    if (Test-Path $FilePath) {
        Write-Host "Deleting: $FilePath" -ForegroundColor Yellow
        Remove-Item -Path $FilePath -Force
        Write-Host "Deleted: $FilePath" -ForegroundColor Green
    }
    else {
        Write-Host "File not found: $FilePath" -ForegroundColor Red
    }
}

# Create backup directory
$backupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -Path $backupDir -ItemType Directory -Force | Out-Null
Write-Host "Created backup directory: $backupDir" -ForegroundColor Cyan

# Backup and delete provider files
foreach ($file in $providerFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir $file
        $backupFolder = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupFolder)) {
            New-Item -Path $backupFolder -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path $file -Destination $backupPath -Force
        Write-Host "Backed up: $file to $backupPath" -ForegroundColor Blue
    }
    Remove-FileWithConfirmation -FilePath $file
}

# Backup and delete hook files
foreach ($file in $hookFiles) {
    if (Test-Path $file) {
        $backupPath = Join-Path $backupDir $file
        $backupFolder = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupFolder)) {
            New-Item -Path $backupFolder -ItemType Directory -Force | Out-Null
        }
        Copy-Item -Path $file -Destination $backupPath -Force
        Write-Host "Backed up: $file to $backupPath" -ForegroundColor Blue
    }
    Remove-FileWithConfirmation -FilePath $file
}

Write-Host "`nCleanup complete! All files have been backed up to the '$backupDir' directory." -ForegroundColor Green
Write-Host "If you need to restore any files, you can find them in the backup directory." -ForegroundColor Cyan