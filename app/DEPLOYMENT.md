# Configuration InseApp

## 🔧 Variables d'Environnement

### Base de Données PostgreSQL
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inseapp
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
```

### JWT Configuration
```
JWT_SECRET=your-secret-key-here-make-it-long-and-secure
JWT_EXPIRATION=86400000
```

### Serveur Configuration
```
SERVER_PORT=8081
FRONTEND_URL=http://localhost:4200
```

## 📋 Checklist de Déploiement

### Environnement de Développement
- [ ] PostgreSQL installé et configuré
- [ ] Java 17+ installé
- [ ] Node.js 18+ installé
- [ ] Variables d'environnement configurées
- [ ] Base de données créée
- [ ] Tables générées (auto-création avec JPA)

### Environnement de Production
- [ ] Serveur configuré (Linux/Windows)
- [ ] Base de données PostgreSQL en production
- [ ] Variables d'environnement de production
- [ ] Certificats SSL configurés
- [ ] Reverse proxy configuré (Nginx/Apache)
- [ ] Monitoring configuré
- [ ] Sauvegardes automatiques

## 🚀 Commandes de Déploiement

### Build Production Frontend
```bash
cd Frontend
npm run build --prod
```

### Build Production Backend
```bash
cd Backend
./mvnw clean package -DskipTests
```

### Docker (Optionnel)
```bash
# Créer images Docker
docker build -t inseapp-frontend ./Frontend
docker build -t inseapp-backend ./Backend

# Lancer avec Docker Compose
docker-compose up -d
```

## 📊 Performance

### Métriques Cibles
- Time to First Byte: < 200ms
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

### Optimisations
- Lazy loading des modules
- Compression gzip activée
- Images optimisées
- CDN pour les assets statiques
- Cache navigateur configuré

## 🔒 Sécurité

### Checklist Sécurité
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] CORS configuré correctement
- [ ] Validation des entrées côté serveur
- [ ] Mots de passe hashés (BCrypt)
- [ ] Tokens JWT sécurisés
- [ ] Logs de sécurité activés
- [ ] Rate limiting configuré

## 📈 Monitoring

### Métriques à Surveiller
- Temps de réponse API
- Utilisation CPU/RAM
- Connexions base de données
- Erreurs 4xx/5xx
- Temps de chargement frontend
- Nombre d'utilisateurs actifs

### Outils Recommandés
- Backend: Spring Boot Actuator + Micrometer
- Frontend: Angular DevTools
- Infrastructure: Prometheus + Grafana
- Logs: ELK Stack (Elasticsearch, Logstash, Kibana)

## 🔄 CI/CD

### Pipeline Recommandé
1. Tests automatisés (Jest + JUnit)
2. Analyse de code (SonarQube)
3. Build des artifacts
4. Tests d'intégration
5. Déploiement automatique
6. Tests post-déploiement

### GitHub Actions Example
```yaml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Setup Java
        uses: actions/setup-java@v2
        with:
          java-version: '17'
      - name: Test Frontend
        run: |
          cd Frontend
          npm ci
          npm run test
      - name: Test Backend
        run: |
          cd Backend
          ./mvnw test
```
