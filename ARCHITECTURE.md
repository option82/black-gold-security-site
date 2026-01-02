# 🏗️ Архитектура системы

## 📊 Схема компонентов

```
┌─────────────────────────────────────────────────────────────────┐
│                        ПОЛЬЗОВАТЕЛЬ                              │
└────────────────┬───────────────────────┬────────────────────────┘
                 │                       │
        ┌────────▼────────┐    ┌────────▼────────┐
        │  React версия   │    │ Standalone HTML │
        │  (Vite + TS)    │    │   (Vanilla JS)  │
        └────────┬────────┘    └────────┬────────┘
                 │                      │
                 │                      │
        ┌────────▼──────────────────────▼────────┐
        │         СИСТЕМА ХРАНЕНИЯ                │
        │                                         │
        │  ┌─────────────┐  ┌─────────────┐     │
        │  │ localStorage│  │   БД (PG)   │     │
        │  │  (браузер)  │  │  (облако)   │     │
        │  └──────┬──────┘  └──────┬──────┘     │
        │         │                 │            │
        │         └────────┬────────┘            │
        │                  │                     │
        │         ┌────────▼────────┐            │
        │         │ site-data.json  │            │
        │         │   (Git repo)    │            │
        │         └─────────────────┘            │
        └─────────────────────────────────────────┘
```

---

## 🔄 Поток данных

### 1. Загрузка контента (Priority Chain)

```
┌──────────────┐
│ Пользователь │
│ открывает    │
│ сайт         │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│ 1. Проверка localStorage             │
│    ✓ Есть? → Показать мгновенно     │
│    ✗ Нет? → Идти дальше             │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ 2. Запрос к БД через API             │
│    ✓ Ответил? → Показать + кэшировать│
│    ✗ Ошибка? → Идти дальше          │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ 3. Загрузка site-data.json (fallback)│
│    ✓ Всегда доступен                 │
│    ✗ Показать из бандла             │
└──────────────────────────────────────┘
```

### 2. Сохранение изменений (Multi-target)

```
┌──────────────┐
│ Пользователь │
│ редактирует  │
│ контент      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│ contentStore.saveContent()           │
└──────┬───────────────────────────────┘
       │
       ├─────────────────────────────┐
       │                             │
       ▼                             ▼
┌─────────────────┐        ┌──────────────────┐
│ localStorage    │        │ Backend API      │
│ (моментально)   │        │ POST /content    │
└─────────────────┘        └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │ PostgreSQL       │
                           │ UPSERT запрос    │
                           └──────────────────┘
```

---

## 🧩 Компоненты React версии

### Frontend (src/)

```
App.tsx
  └─ Index.tsx (главная страница)
      ├─ Header
      │   ├─ Logo (редактируемый)
      │   └─ Menu (навигация)
      │
      ├─ ContentSections
      │   ├─ HeroSection (редактируемый)
      │   ├─ AboutSection (редактируемый)
      │   ├─ ServicesSection (редактируемый + DnD)
      │   ├─ PortfolioSection (редактируемый)
      │   ├─ CasesSection (редактируемый)
      │   ├─ BlogSection (редактируемый)
      │   └─ ContactsSection (редактируемый)
      │
      ├─ Footer
      │
      └─ AdminPanel
          ├─ AuthDialog (авторизация)
          ├─ ControlPanel (управление)
          └─ SyncManager (синхронизация)
              ├─ Файл → БД
              └─ БД → Файл
```

### State Management

```
Index.tsx state
  │
  ├─ content: { logo, hero, services, ... }
  ├─ isAdminMode: boolean
  ├─ activeSection: string
  └─ mobileMenuOpen: boolean
       │
       └─ Обновления через useState/useEffect
           │
           ├─ saveContent() → contentStore
           └─ loadContent() → contentStore
```

### Storage Layer (lib/)

```
storage.ts (High-level API)
  │
  ├─ saveContent()
  ├─ loadContent()
  ├─ exportContent()
  └─ downloadContentBackup()
      │
      └─ contentStore.ts (Low-level)
          │
          ├─ getAllContent()
          │   ├─ Check cache
          │   ├─ Try DB (fetch API)
          │   └─ Fallback to JSON
          │
          ├─ getContent(key)
          │   └─ Return specific section
          │
          └─ saveContent(key, data)
              ├─ Update cache
              └─ POST to API → PostgreSQL
```

---

## 📦 Компоненты Standalone версии

### Structure (standalone/)

```
index.html
  │
  ├─ <head>
  │   ├─ Tailwind CSS (CDN)
  │   ├─ Lucide Icons (CDN)
  │   └─ styles.css
  │
  ├─ <body>
  │   ├─ Header (навигация)
  │   ├─ Sections (контент)
  │   ├─ Footer
  │   ├─ Admin Panel (модальное окно)
  │   └─ Toast Notifications
  │
  ├─ <script src="js/app.js">
  │   ├─ loadData()
  │   ├─ renderContent()
  │   ├─ initNavigation()
  │   └─ handleScroll()
  │
  └─ <script src="js/admin.js">
      ├─ initAdmin()
      ├─ handleAuth()
      ├─ enableEditing()
      ├─ saveChanges()
      └─ exportJSON()
```

### Data Flow (Standalone)

```
1. Page Load
   │
   ├─ loadData()
   │   ├─ localStorage.getItem('site-data')
   │   └─ fetch('data/site-data.json')
   │
   ├─ renderContent(data)
   │   └─ Populate HTML elements
   │
   └─ initNavigation()

2. Admin Edit
   │
   ├─ User logs in
   │   └─ Check password
   │
   ├─ enableEditing()
   │   └─ contenteditable="true"
   │
   ├─ User edits content
   │   └─ Auto-save to localStorage
   │
   └─ exportJSON()
       └─ Download site-data.json
```

---

## 🔌 Backend API

### Endpoints

```
/backend/content/
  │
  ├─ GET /
  │   └─ Returns: ALL content from DB
  │
  ├─ GET /?key=hero
  │   └─ Returns: Specific section
  │
  └─ POST /
      ├─ Body: { key: "hero", data: {...} }
      └─ Action: UPSERT to DB
```

```
/backend/sync-content/
  │
  ├─ GET /?direction=db-to-json
  │   └─ Returns: Export from DB
  │
  └─ POST /
      ├─ Body: { data: {...all sections...} }
      └─ Action: Bulk UPSERT to DB
```

### Database Schema

```sql
CREATE TABLE site_content (
  content_key VARCHAR PRIMARY KEY,  -- 'logo', 'hero', 'services', etc.
  content_data JSONB NOT NULL,      -- Actual content
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_updated_at ON site_content(updated_at);
```

### Backend Function Structure

```
backend/content/
  ├─ index.py
  │   ├─ handler(event, context)
  │   ├─ get_db_connection()
  │   └─ get_cors_headers()
  │
  ├─ requirements.txt
  │   └─ psycopg2-binary
  │
  └─ tests.json

backend/sync-content/
  ├─ index.py
  │   ├─ handler(event, context)
  │   ├─ sync_to_json(conn)
  │   └─ sync_from_json(conn, data)
  │
  ├─ requirements.txt
  └─ tests.json
```

---

## 🔧 Утилиты синхронизации (scripts/)

### sync-to-db.js

```javascript
Read public/site-data.json
  │
  ├─ Parse JSON
  │
  └─ POST to /sync-content
      └─ Bulk insert to DB
```

### sync-from-db.js

```javascript
GET /sync-content?direction=db-to-json
  │
  ├─ Receive data from DB
  │
  ├─ Write to public/site-data.json
  │
  └─ Write to standalone/data/site-data.json
```

### auto-sync.js

```javascript
setInterval(10 seconds)
  │
  ├─ getFileHash(site-data.json)
  │   └─ Compare with lastHash
  │       └─ Changed? → syncLocalToDb()
  │
  └─ getDbTimestamp()
      └─ Compare with lastTimestamp
          └─ Changed? → syncDbToLocal()
```

---

## 🔐 Security Architecture

### Authentication Flow

```
React Version:
  User clicks "Войти в админку"
    │
    ├─ First time?
    │   └─ Prompt for password
    │       └─ Store hash in localStorage
    │
    └─ Returning?
        └─ Check localStorage hash
            └─ Match? → Enable admin mode

Standalone Version:
  User clicks "admin"
    │
    └─ Prompt for password
        └─ Compare with hardcoded ADMIN_PASSWORD
            └─ Match? → Enable editing
```

### Data Protection

```
┌────────────────────────────────────┐
│ localStorage                       │
│ - Isolated per domain              │
│ - No server access                 │
│ - User can clear                   │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ PostgreSQL                         │
│ - Backend-only access              │
│ - HTTPS encrypted                  │
│ - Yandex Cloud secured             │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ site-data.json                     │
│ - Public readable                  │
│ - Git version controlled           │
│ - No sensitive data                │
└────────────────────────────────────┘
```

---

## 🚀 Deployment Flow

### Development

```
1. npm run dev (React)
2. node scripts/auto-sync.js (background)
3. Edit content via admin panel
4. Auto-save to localStorage + DB
5. Sync to site-data.json
6. Commit to Git
```

### Production Build

```
1. npm run build
   │
   ├─ Vite builds React app
   │   └─ dist/ folder
   │
   └─ Copy dist/ to hosting
       └─ Configure Nginx/Apache
```

### Standalone Deploy

```
1. Upload standalone/ to hosting
   │
   ├─ Any static hosting works:
   │   ├─ GitHub Pages
   │   ├─ Netlify
   │   ├─ Vercel
   │   └─ Traditional hosting
   │
   └─ No build step needed!
```

---

## 📈 Performance Optimization

### Caching Strategy

```
Level 1: In-Memory Cache (cachedData)
  ├─ Fastest access
  └─ Lost on page reload

Level 2: localStorage (5-10 MB)
  ├─ Persistent across reloads
  └─ Per-domain isolation

Level 3: Database (PostgreSQL)
  ├─ Centralized source of truth
  └─ Network latency

Level 4: Static JSON (fallback)
  ├─ Bundled with app
  └─ Always available
```

### Loading Performance

```
React Version:
  - Code splitting (Vite)
  - Lazy loading images
  - Debounced autosave (1 second)
  - Cached API responses

Standalone Version:
  - No bundler overhead
  - Direct HTML parsing
  - CDN caching (Tailwind + Lucide)
  - Minimal JavaScript
```

---

## 🔍 Monitoring & Debugging

### Debug Points

```
Frontend (React):
  - Console: "Content loaded from database"
  - Console: "Content loaded from static file"
  - localStorage key: 'site-data-source'

Frontend (Standalone):
  - Console: "Data loaded from localStorage"
  - Console: "Data loaded from file"

Backend:
  - Yandex Cloud Function logs
  - Print statements in Python
  - Database query logs

Sync Scripts:
  - stdout: "✅ Синхронизировано X записей"
  - stderr: "❌ Ошибка: ..."
```

---

## 🎯 Design Decisions

### Why Three Storage Layers?

1. **localStorage** - Instant user experience
2. **Database** - Centralized truth, multi-device sync
3. **JSON file** - Failover, version control, static deploy

### Why Two Versions?

1. **React** - Rich admin features, modern development
2. **Standalone** - Universal compatibility, zero dependencies

### Why Separate Sync API?

- Decouples read/write operations
- Enables bulk operations
- Simplifies migration scripts

---

**Система спроектирована для:**
- ✅ Максимальной надежности (3 уровня хранения)
- ✅ Простоты использования (админ-панель)
- ✅ Универсальности (React + Standalone)
- ✅ Автономности (работа без сети)
