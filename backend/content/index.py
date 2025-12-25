import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создаёт подключение к PostgreSQL"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_cors_headers():
    """Возвращает CORS заголовки для всех ответов"""
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json'
    }

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    API для сохранения и загрузки контента сайта.
    
    GET /?key=section_name - получить контент секции
    GET / - получить весь контент
    POST / - сохранить контент секции
    
    Body для POST: {"key": "section_name", "data": {...}}
    """
    method: str = event.get('httpMethod', 'GET')
    print(f"Request method: {method}")
    print(f"Request path: {event.get('path', '/')}")
    
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
            content_key = params.get('key')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if content_key:
                    cur.execute(
                        "SELECT content_data FROM t_p71685242_black_gold_security_.site_content WHERE content_key = %s",
                        (content_key,)
                    )
                    row = cur.fetchone()
                    if row:
                        print(f"Content found for key: {content_key}")
                        return {
                            'statusCode': 200,
                            'headers': get_cors_headers(),
                            'body': json.dumps(row['content_data']),
                            'isBase64Encoded': False
                        }
                    else:
                        print(f"Content not found for key: {content_key}")
                        return {
                            'statusCode': 404,
                            'headers': get_cors_headers(),
                            'body': json.dumps({'error': 'Content not found'}),
                            'isBase64Encoded': False
                        }
                else:
                    cur.execute("SELECT content_key, content_data FROM t_p71685242_black_gold_security_.site_content")
                    rows = cur.fetchall()
                    result = {row['content_key']: row['content_data'] for row in rows}
                    print(f"Returning all content, keys: {list(result.keys())}")
                    return {
                        'statusCode': 200,
                        'headers': get_cors_headers(),
                        'body': json.dumps(result),
                        'isBase64Encoded': False
                    }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            content_key = body_data.get('key')
            content_data = body_data.get('data')
            
            print(f"POST request for key: {content_key}")
            
            if not content_key or content_data is None:
                print("Missing key or data in POST request")
                return {
                    'statusCode': 400,
                    'headers': get_cors_headers(),
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
            
            print(f"Content saved successfully for key: {content_key}")
            return {
                'statusCode': 200,
                'headers': get_cors_headers(),
                'body': json.dumps({'success': True, 'key': content_key}),
                'isBase64Encoded': False
            }
        
        else:
            print(f"Method not allowed: {method}")
            return {
                'statusCode': 405,
                'headers': get_cors_headers(),
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': get_cors_headers(),
            'body': json.dumps({'error': 'Internal server error', 'message': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'conn' in locals():
            conn.close()