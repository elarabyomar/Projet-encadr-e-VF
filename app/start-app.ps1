# Script de démarrage pour InseApp
# Ce script démarre le backend Spring Boot et le frontend Angular

Write-Host "🎓 Démarrage d'InseApp..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Vérification des prérequis
Write-Host "📋 Vérification des prérequis..." -ForegroundColor Yellow

# Vérifier Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✅ Java détecté: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Java non trouvé. Veuillez installer Java 17+" -ForegroundColor Red
    exit 1
}

# Vérifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non trouvé. Veuillez installer Node.js 18+" -ForegroundColor Red
    exit 1
}

# Vérifier npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm détecté: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm non trouvé." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Installation des dépendances Frontend..." -ForegroundColor Yellow
Set-Location "Frontend"
npm install --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dépendances installées" -ForegroundColor Green

Set-Location ".."

Write-Host ""
Write-Host "🚀 Démarrage du Backend (Spring Boot)..." -ForegroundColor Yellow
Set-Location "Backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Backend Spring Boot démarré sur http://localhost:8081' -ForegroundColor Green; .\mvnw.cmd spring-boot:run"

Set-Location ".."

Write-Host "⏳ Attente du démarrage du backend (30 secondes)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "🎨 Démarrage du Frontend (Angular)..." -ForegroundColor Yellow
Set-Location "Frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Frontend Angular démarré sur http://localhost:4200' -ForegroundColor Green; npm start"

Set-Location ".."

Write-Host ""
Write-Host "🎉 InseApp démarré avec succès!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:4200" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:8081" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour arrêter l'application, fermez les fenêtres PowerShell ouvertes." -ForegroundColor Yellow

# Ouvrir le navigateur après un délai
Write-Host "🌐 Ouverture du navigateur..." -ForegroundColor Yellow
Start-Sleep -Seconds 10
Start-Process "http://localhost:4200"

Write-Host ""
Write-Host "Appuyez sur une touche pour quitter ce script..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
