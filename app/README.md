# InseApp - Application de Gestion Scolaire

Une application complète de gestion scolaire développée avec Angular (Frontend) et Spring Boot (Backend).

## 🚀 Fonctionnalités

### ✅ Authentification
- Connexion avec email et mot de passe
- Inscription des nouveaux utilisateurs
- Gestion des tokens JWT
- Protection des routes

### ✅ Gestion des Notes
- Interface pour les enseignants
- Saisie des notes par classe et élément
- Sélection dynamique des étudiants
- Validation des données

### ✅ Interface Utilisateur
- Design moderne avec thème vert
- Navigation intuitive
- Notifications temps réel
- Interface responsive

## 🛠️ Technologies Utilisées

### Frontend (Angular 18)
- **Framework**: Angular 18
- **Language**: TypeScript
- **Styling**: SCSS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Reactive Forms

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.3
- **Language**: Java
- **Base de données**: PostgreSQL
- **Sécurité**: Spring Security + JWT
- **ORM**: Hibernate/JPA

## 📁 Structure du Projet

```
App0106/
├── Frontend/                 # Application Angular
│   ├── src/app/
│   │   ├── components/      # Composants réutilisables
│   │   ├── guards/          # Guards de route
│   │   ├── interceptors/    # Intercepteurs HTTP
│   │   └── services/        # Services Angular
│   ├── auth/               # Composants d'authentification
│   ├── notes/              # Composants de gestion des notes
│   └── services/           # Services (legacy)
└── Backend/                # Application Spring Boot
    └── src/main/java/com/monsite/Backend/
        ├── controller/     # Contrôleurs REST
        ├── service/        # Services métier
        ├── model/          # Entités JPA
        ├── repository/     # Repositories JPA
        └── security/       # Configuration sécurité
```

## 🚦 Démarrage Rapide

### Prérequis
- Node.js 18+ et npm
- Java 17+
- PostgreSQL
- Maven

### 1. Configuration de la Base de Données
Créez une base de données PostgreSQL et configurez les paramètres dans `Backend/src/main/resources/application.properties`

### 2. Démarrage du Backend
```bash
cd Backend
./mvnw spring-boot:run
```
Le backend sera accessible sur `http://localhost:8081`

### 3. Démarrage du Frontend
```bash
cd Frontend
npm install
npm start
```
Le frontend sera accessible sur `http://localhost:4200`

## 📋 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/inscriptions/creer` - Inscription utilisateur

### Notes
- `GET /api/notes/classes` - Liste des classes
- `GET /api/notes/classes/{id}/elements` - Éléments d'une classe
- `GET /api/notes/classes/{id}/etudiants` - Étudiants d'une classe
- `POST /api/notes` - Créer une note
- `GET /api/notes` - Liste des notes

## 🔧 Configuration

### Variables d'Environnement Frontend
Fichier: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api'
};
```

### Configuration Backend
Fichier: `src/main/resources/application.properties`
```properties
server.port=8081
spring.datasource.url=jdbc:postgresql://localhost:5432/votre_db
spring.datasource.username=votre_username
spring.datasource.password=votre_password
```

## 🎨 Thème et Design

L'application utilise un thème vert moderne avec :
- Palette de couleurs verte cohérente
- Interface responsive
- Notifications toast
- Navigation fluide
- Forms stylisés

## 🔒 Sécurité

- Authentification JWT
- Protection CORS configurée
- Intercepteur HTTP pour l'ajout automatique des tokens
- Guards de route pour protéger les pages sensibles
- Validation côté client et serveur

## 📱 Fonctionnalités Avancées

### Système de Notifications
- Notifications de succès, erreur, info et warning
- Auto-dismiss configurable
- Interface utilisateur non-intrusive

### Gestion d'État
- Service d'authentification centralisé
- Gestion du localStorage pour la persistance
- États de chargement et d'erreur

### Validation
- Validation de formulaires en temps réel
- Messages d'erreur contextuels
- Validation côté serveur

## 🚀 Déploiement

### Frontend
```bash
npm run build
# Les fichiers seront dans dist/frontend
```

### Backend
```bash
./mvnw clean package
# Le JAR sera dans target/Backend-0.0.1-SNAPSHOT.jar
```

## 👥 Rôles Utilisateurs

- **Administrateur**: Gestion complète du système
- **Enseignant**: Saisie et consultation des notes
- **Étudiant**: Consultation des notes

## 🔄 Prochaines Fonctionnalités

- [ ] Dashboard analytique
- [ ] Export des notes en PDF/Excel
- [ ] Système de messagerie
- [ ] Calendrier des cours
- [ ] Gestion des absences
- [ ] Interface mobile native

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur de connexion API**
   - Vérifiez que le backend tourne sur le port 8081
   - Contrôlez la configuration CORS

2. **Erreur de base de données**
   - Vérifiez la connexion PostgreSQL
   - Contrôlez les paramètres de connexion

3. **Problèmes de compilation Angular**
   - Supprimez `node_modules` et relancez `npm install`
   - Vérifiez la version de Node.js

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Développement

Pour contribuer au projet :
1. Forkez le repository
2. Créez une branche feature
3. Committez vos changements
4. Ouvrez une Pull Request

---

**InseApp** - Solution complète de gestion scolaire moderne 🎓
