#!/usr/bin/env python3
import json
import os
import sys
import psycopg2

def load_site_data():
    """Загрузить данные из site-data.json"""
    json_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'site-data.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def migrate_to_database(dsn):
    """Мигрировать данные в БД"""
    data = load_site_data()
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    try:
        for key, value in data.items():
            print(f'Migrating {key}...')
            cursor.execute("""
                INSERT INTO t_p71685242_black_gold_security_.site_content (content_key, content_data, updated_at)
                VALUES (%s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (content_key) 
                DO UPDATE SET content_data = EXCLUDED.content_data, updated_at = CURRENT_TIMESTAMP
            """, (key, json.dumps(value, ensure_ascii=False)))
        
        conn.commit()
        print('Migration completed successfully!')
        
    except Exception as e:
        conn.rollback()
        print(f'Error during migration: {e}')
        sys.exit(1)
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        print('ERROR: DATABASE_URL environment variable not set')
        sys.exit(1)
    
    migrate_to_database(dsn)
