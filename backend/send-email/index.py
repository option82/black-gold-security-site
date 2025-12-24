import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, ValidationError

class ContactForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=20)
    message: str = Field(..., min_length=1, max_length=5000)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка email с данными формы обратной связи
    Args: event - dict с httpMethod, body, headers
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    try:
        form_data = ContactForm(**body_data)
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Validation error', 'details': e.errors()}),
            'isBase64Encoded': False
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient = os.environ.get('RECIPIENT_EMAIL')
    
    if not all([smtp_host, smtp_user, smtp_password, recipient]):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'SMTP settings not configured'}),
            'isBase64Encoded': False
        }
    
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = recipient
    msg['Subject'] = f'Новая заявка от {form_data.name}'
    
    email_body = f"""
    Новая заявка с сайта:
    
    Имя: {form_data.name}
    Email: {form_data.email}
    Телефон: {form_data.phone}
    
    Сообщение:
    {form_data.message}
    """
    
    msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
    
    try:
        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10)
        else:
            server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
            server.starttls()
        
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'}),
            'isBase64Encoded': False
        }
