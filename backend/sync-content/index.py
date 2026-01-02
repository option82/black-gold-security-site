import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создаёт подключение к PostgreSQL"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_cors_headers():
    """Возвращает CORS заголовки"""
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

def sync_to_json(conn) -> Dict[str, Any]:
    """Синхронизирует данные из БД в формат site-data.json"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT content_key, content_data FROM t_p71685242_black_gold_security_.site_content")
        rows = cur.fetchall()
        
        result = {}
        for row in rows:
            result[row['content_key']] = row['content_data']
        
        return result

def sync_from_json(conn, json_data: Dict[str, Any]) -> int:
    """Синхронизирует данные из site-data.json в БД"""
    count = 0
    with conn.cursor() as cur:
        for key, data in json_data.items():
            cur.execute("""
                INSERT INTO t_p71685242_black_gold_security_.site_content (content_key, content_data, updated_at)
                VALUES (%s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (content_key) 
                DO UPDATE SET content_data = EXCLUDED.content_data, updated_at = CURRENT_TIMESTAMP
            """, (key, json.dumps(data) if not isinstance(data, str) else data))
            count += 1
        conn.commit()
    return count

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для синхронизации контента между БД и site-data.json
    
    GET /sync-content?direction=db-to-json - экспорт из БД в формат JSON
    POST /sync-content - импорт JSON данных в БД
    Body: { "data": {...} }
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': get_cors_headers(),
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            direction = params.get('direction', 'db-to-json')
            
            if direction == 'db-to-json':
                result = sync_to_json(conn)
                return {
                    'statusCode': 200,
                    'headers': get_cors_headers(),
                    'body': json.dumps({
                        'success': True,
                        'data': result,
                        'message': 'Данные экспортированы из БД'
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            json_data = body_data.get('data', {})
            
            if not json_data:
                return {
                    'statusCode': 400,
                    'headers': get_cors_headers(),
                    'body': json.dumps({'error': 'Нет данных для импорта'}),
                    'isBase64Encoded': False
                }
            
            count = sync_from_json(conn, json_data)
            
            return {
                'statusCode': 200,
                'headers': get_cors_headers(),
                'body': json.dumps({
                    'success': True,
                    'updated': count,
                    'message': f'Обновлено {count} записей в БД'
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': get_cors_headers(),
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': get_cors_headers(),
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'conn' in locals():
            conn.close()
