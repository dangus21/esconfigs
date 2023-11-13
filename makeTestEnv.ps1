# create-directory.ps1
New-Item -ItemType Directory -Path ".\testEnv" | Out-Null
Set-Location testEnv