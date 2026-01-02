#!/usr/bin/env node

/**
 * Скрипт для синхронизации данных из БД в site-data.json
 * Использование: node scripts/sync-from-db.js
 */

const fs = require('fs');
const path = require('path');

const SYNC_API = 'https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc';
const DATA_FILE = path.join(__dirname, '../public/site-data.json');
const STANDALONE_FILE = path.join(__dirname, '../standalone/data/site-data.json');

async function syncFromDatabase() {
  try {
    console.log('🔄 Получаю данные из БД...');
    
    const response = await fetch(`${SYNC_API}?direction=db-to-json`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('❌ Ошибка получения данных:', result.error || 'Неизвестная ошибка');
      process.exit(1);
    }

    console.log('💾 Сохраняю в site-data.json...');
    
    const formattedData = JSON.stringify(result.data, null, 2);
    fs.writeFileSync(DATA_FILE, formattedData, 'utf-8');
    console.log(`✅ Обновлен файл: ${DATA_FILE}`);

    if (fs.existsSync(path.dirname(STANDALONE_FILE))) {
      fs.writeFileSync(STANDALONE_FILE, formattedData, 'utf-8');
      console.log(`✅ Обновлен файл: ${STANDALONE_FILE}`);
    }

    console.log('✅ Синхронизация завершена успешно!');
  } catch (error) {
    console.error('❌ Ошибка синхронизации:', error.message);
    process.exit(1);
  }
}

syncFromDatabase();
