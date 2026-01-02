#!/usr/bin/env node

/**
 * Скрипт автоматической двусторонней синхронизации
 * Следит за изменениями в site-data.json и БД
 * Использование: node scripts/auto-sync.js
 */

const fs = require('fs');
const path = require('path');

const SYNC_API = 'https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc';
const CONTENT_API = 'https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5';
const DATA_FILE = path.join(__dirname, '../public/site-data.json');
const CHECK_INTERVAL = 10000;

let lastLocalHash = null;
let lastDbTimestamp = null;

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  return require('crypto').createHash('md5').update(content).digest('hex');
}

async function getDbTimestamp() {
  try {
    const response = await fetch(`${CONTENT_API}?key=_last_update`);
    if (response.ok) {
      const data = await response.json();
      return data.timestamp || null;
    }
  } catch (e) {
    return null;
  }
}

async function syncLocalToDb() {
  try {
    console.log('📤 Локальные изменения → БД');
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    const response = await fetch(SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: jsonData }),
    });

    const result = await response.json();
    if (result.success) {
      console.log(`✅ Синхронизировано ${result.updated} записей`);
      
      await fetch(CONTENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: '_last_update', 
          data: { timestamp: Date.now() }
        }),
      });
    }
  } catch (error) {
    console.error('❌ Ошибка синхронизации в БД:', error.message);
  }
}

async function syncDbToLocal() {
  try {
    console.log('📥 БД → Локальный файл');
    const response = await fetch(`${SYNC_API}?direction=db-to-json`);
    const result = await response.json();

    if (result.success) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(result.data, null, 2), 'utf-8');
      console.log('✅ Файл site-data.json обновлён из БД');
      lastLocalHash = getFileHash(DATA_FILE);
    }
  } catch (error) {
    console.error('❌ Ошибка синхронизации из БД:', error.message);
  }
}

async function checkAndSync() {
  const currentHash = getFileHash(DATA_FILE);
  
  if (lastLocalHash === null) {
    lastLocalHash = currentHash;
    lastDbTimestamp = await getDbTimestamp();
    return;
  }

  if (currentHash !== lastLocalHash) {
    console.log('🔍 Обнаружены локальные изменения');
    await syncLocalToDb();
    lastLocalHash = currentHash;
    lastDbTimestamp = await getDbTimestamp();
  } else {
    const currentDbTimestamp = await getDbTimestamp();
    if (currentDbTimestamp && currentDbTimestamp !== lastDbTimestamp) {
      console.log('🔍 Обнаружены изменения в БД');
      await syncDbToLocal();
      lastDbTimestamp = currentDbTimestamp;
    }
  }
}

console.log('🚀 Автосинхронизация запущена');
console.log(`📂 Отслеживаю: ${DATA_FILE}`);
console.log(`⏱️  Интервал проверки: ${CHECK_INTERVAL / 1000}с\n`);

setInterval(checkAndSync, CHECK_INTERVAL);
checkAndSync();
