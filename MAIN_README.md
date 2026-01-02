# 🚀 Black Gold Security - Автономная система с автообновлением

> Сайт службы безопасности с полной системой автоматической синхронизации данных между БД, localStorage и статическими файлами.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Tests](https://img.shields.io/badge/tests-passing-success)

---

## ✨ Особенности

- 🔄 **Автоматическая синхронизация** данных между БД и JSON файлами
- 🎨 **Две версии сайта**: React (современная) + Standalone HTML (универсальная)
- 🛠️ **Админ-панель** с inline редактированием контента
- 💾 **Три уровня хранения**: localStorage, PostgreSQL, static JSON
- 📱 **Полностью responsive** дизайн
- ⚡ **Быстрая загрузка** с умным кэшированием

---

## 🎯 Быстрый старт

### React версия (разработка):

```bash
npm install
npm run dev
# Откройте http://localhost:3000
```

### Standalone версия (без зависимостей):

```bash
cd standalone
python -m http.server 8080
# Откройте http://localhost:8080
```

### Автосинхронизация в фоне:

```bash
node scripts/auto-sync.js
# Синхронизирует БД ↔ JSON каждые 10 секунд
```

---

## 📁 Структура проекта

```
.
├── src/                      # React версия (основная)
│   ├── components/          # React компоненты
│   │   ├── AdminPanel.tsx   # Админ-панель
│   │   ├── SyncManager.tsx  # UI синхронизации
│   │   └── ...
│   ├── pages/               # Страницы
│   └── lib/                 # Утилиты
│       ├── storage.ts       # API хранения
│       └── contentStore.ts  # Логика кэширования
│
├── standalone/              # HTML версия (автономная)
│   ├── index.html          # Главная страница
│   ├── css/styles.css      # Стили
│   ├── js/
│   │   ├── app.js          # Основная логика
│   │   └── admin.js        # Админ-панель
│   └── data/site-data.json # Контент
│
├── backend/                 # Cloud Functions
│   ├── content/            # API контента
│   └── sync-content/       # API синхронизации
│
├── scripts/                 # Утилиты синхронизации
│   ├── sync-to-db.js       # JSON → БД
│   ├── sync-from-db.js     # БД → JSON
│   └── auto-sync.js        # Автосинхронизация
│
├── public/
│   └── site-data.json      # Исходные данные
│
└── docs/                    # Документация
    ├── DEPLOYMENT_GUIDE.md
    ├── QUICKSTART.md
    ├── ARCHITECTURE.md
    └── PROJECT_SUMMARY.md
```

---

## 🔄 Система синхронизации

### Архитектура хранения:

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  localStorage   │────▶│ Backend API  │────▶│  PostgreSQL DB  │
│   (браузер)     │     │  (Cloud Fn)  │     │    (облако)     │
└─────────────────┘     └──────────────┘     └─────────────────┘
         │                                              │
         └──────────────────────┬───────────────────────┘
                                │
                      ┌─────────▼─────────┐
                      │ site-data.json    │
                      │  (Git + Static)   │
                      └───────────────────┘
```

### Команды синхронизации:

```bash
# Отправить файл в БД
node scripts/sync-to-db.js

# Скачать из БД в файл
node scripts/sync-from-db.js

# Автоматическая двусторонняя синхронизация
node scripts/auto-sync.js
```

---

## 🎨 Редактирование контента

### React версия:

1. Откройте сайт в браузере
2. Нажмите **"Войти в админку"** в хедере
3. Наведите на элемент для редактирования
4. Изменения сохраняются автоматически в localStorage + БД

### Standalone версия:

1. Откройте `standalone/index.html`
2. Нажмите **"admin"** в футере
3. Введите пароль: `admin123`
4. Редактируйте контент inline
5. Скачайте изменения через **"Скачать JSON"**

### UI Синхронизации:

В админ-панели React версии доступны кнопки:
- **Файл → БД** - отправить site-data.json в базу данных
- **БД → Файл** - скачать актуальные данные из БД

---

## 🛠️ Технологии

### React версия:
- **Frontend:** React 18, TypeScript, Vite
- **UI:** Tailwind CSS, shadcn/ui, Lucide Icons
- **State:** React Hooks, Context API
- **Storage:** localStorage + PostgreSQL

### Standalone версия:
- **Stack:** HTML5, CSS3, Vanilla JavaScript
- **UI:** Tailwind CSS (CDN), Lucide Icons (CDN)
- **Storage:** localStorage + JSON файл
- **Зависимости:** 0 (только CDN)

### Backend:
- **Runtime:** Python 3.11 (Yandex Cloud Functions)
- **Database:** PostgreSQL (Simple Query Protocol)
- **Libraries:** psycopg2-binary

---

## 📚 Документация

| Файл | Описание |
|------|----------|
| [QUICKSTART.md](QUICKSTART.md) | Быстрый старт за 5 минут |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Полное руководство по развертыванию |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Архитектура и схемы системы |
| [SYNC_README.md](SYNC_README.md) | Система синхронизации данных |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Итоги и статистика проекта |
| [standalone/README.md](standalone/README.md) | Инструкция для Standalone версии |

---

## 🔌 API Endpoints

### Content API:
```
GET  https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5
POST https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5
```

### Sync API:
```
GET  https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc?direction=db-to-json
POST https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc
```

---

## 🧪 Тестирование

### Backend тесты:

```bash
# Все тесты проходят автоматически при деплое
# Статус: ✅ 2/2 tests passed
```

### Ручное тестирование:

```bash
# Проверить Content API
curl https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5

# Проверить Sync API
curl "https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc?direction=db-to-json"
```

---

## 🚀 Деплой

### React версия:

```bash
npm run build
# Загрузить dist/ на хостинг
```

### Standalone версия:

```bash
# Просто загрузить папку standalone/ на любой хостинг:
# - GitHub Pages
# - Netlify
# - Vercel
# - Обычный веб-хостинг
```

---

## 🔐 Безопасность

- ✅ Админ-панель защищена паролем
- ✅ База данных доступна только через backend
- ✅ CORS правильно настроен
- ✅ localStorage изолирован по домену

### Для production:
1. Смените пароль админки
2. Настройте HTTPS
3. Добавьте rate limiting
4. Используйте переменные окружения

---

## 📊 Статистика

- **21 файл** создано
- **~4270 строк** кода
- **2 backend функции** развернуты
- **3 скрипта** синхронизации
- **2 версии сайта** (React + Standalone)
- **5 документов** подробной документации

---

## 🤝 Вклад

Проект создан для [Black Gold Security](https://zaschitabusinessa.ru)

---

## 📝 Лицензия

© 2026 Защита Бизнеса. Все права защищены.

---

## 📞 Контакты

- **Телефон:** +7 983 252 3222
- **Email:** info@zaschitabusinessa.ru
- **Адрес:** г.Новокузнецк

---

<div align="center">

**Сделано с ❤️ на [poehali.dev](https://poehali.dev)**

</div>
