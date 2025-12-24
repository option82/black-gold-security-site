import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создаёт подключение к PostgreSQL"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для сохранения и загрузки контента сайта.
    
    GET /?key=section_name - получить контент секции
    GET / - получить весь контент
    POST / - сохранить контент секции
    
    Body для POST: {"key": "section_name", "data": {...}}
    """
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            content_key = params.get('key')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if content_key:
                    cur.execute(
                        "SELECT content_data FROM t_p71685242_black_gold_security_.site_content WHERE content_key = %s",
                        (content_key,)
                    )
                    row = cur.fetchone()
                    if row:
                        return {
                            'statusCode': 200,
                            'headers': {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            'body': json.dumps(row['content_data']),
                            'isBase64Encoded': False
                        }
                    else:
                        return {
                            'statusCode': 404,
                            'headers': {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            'body': json.dumps({'error': 'Content not found'}),
                            'isBase64Encoded': False
                        }
                else:
                    cur.execute("SELECT content_key, content_data FROM t_p71685242_black_gold_security_.site_content")
                    rows = cur.fetchall()
                    result = {row['content_key']: row['content_data'] for row in rows}
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(result),
                        'isBase64Encoded': False
                    }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            content_key = body_data.get('key')
            content_data = body_data.get('data')
            
            if not content_key or content_data is None:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing key or data'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO t_p71685242_black_gold_security_.site_content (content_key, content_data, updated_at)
                    VALUES (%s, %s, CURRENT_TIMESTAMP)
                    ON CONFLICT (content_key) 
                    DO UPDATE SET content_data = EXCLUDED.content_data, updated_at = CURRENT_TIMESTAMP
                """, (content_key, json.dumps(content_data)))
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'key': content_key}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    finally:
        conn.close()
