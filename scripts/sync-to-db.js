#!/usr/bin/env node

/**
 * Скрипт для синхронизации site-data.json с базой данных
 * Использование: node scripts/sync-to-db.js
 */

const fs = require('fs');
const path = require('path');

const SYNC_API = 'https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc';
const DATA_FILE = path.join(__dirname, '../public/site-data.json');

async function syncToDatabase() {
  try {
    console.log('📖 Читаю site-data.json...');
    
    if (!fs.existsSync(DATA_FILE)) {
      console.error('❌ Файл site-data.json не найден!');
      process.exit(1);
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    console.log('🔄 Отправляю данные в БД...');
    
    const response = await fetch(SYNC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: jsonData }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log(`✅ Успешно! Обновлено ${result.updated} записей в БД`);
    } else {
      console.error('❌ Ошибка:', result.error || 'Неизвестная ошибка');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Ошибка синхронизации:', error.message);
    process.exit(1);
  }
}

syncToDatabase();
