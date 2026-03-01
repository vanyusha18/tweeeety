$sourcePath = "C:\Users\VANYUSHA\OneDrive\Desktop\project"
$destZip = "$sourcePath\tweety_submission.zip"
$tempPath = "$env:TEMP\tweety_submission"

Write-Host "Preparing project for submission..." -ForegroundColor Cyan

# Clean up temp path if it already exists
If (Test-Path $tempPath) {
    Remove-Item $tempPath -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $tempPath | Out-Null

# Clean up previous zip if it exists
If (Test-Path $destZip) {
    Remove-Item $destZip -Force
}

# Copy files over excluding node_modules and .git to keep the file size minimal
Write-Host "Copying files to temporary directory (ignoring node_modules and .git)..." -ForegroundColor Yellow
Get-ChildItem -Path $sourcePath -Exclude "node_modules", ".git", "tweety_submission.zip" | Copy-Item -Destination $tempPath -Recurse -Container -Force

# Create Zip
Write-Host "Compressing archive..." -ForegroundColor Yellow
Compress-Archive -Path "$tempPath\*" -DestinationPath $destZip
Remove-Item $tempPath -Recurse -Force

Write-Host "Done!" -ForegroundColor Green
Write-Host "✔ Successfully created the submission file at:" -ForegroundColor DarkGreen
Write-Host $destZip -ForegroundColor White
Write-Host "You can submit this zip file directly to your project guide." -ForegroundColor Cyan
