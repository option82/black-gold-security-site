CREATE TABLE IF NOT EXISTS t_p71685242_black_gold_security_.site_content (
    id SERIAL PRIMARY KEY,
    content_key VARCHAR(255) NOT NULL UNIQUE,
    content_data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_key ON t_p71685242_black_gold_security_.site_content(content_key);

COMMENT ON TABLE t_p71685242_black_gold_security_.site_content IS 'Хранилище контента сайта для редактируемых элементов';
COMMENT ON COLUMN t_p71685242_black_gold_security_.site_content.content_key IS 'Уникальный ключ секции (например: hero, services, blog)';
COMMENT ON COLUMN t_p71685242_black_gold_security_.site_content.content_data IS 'JSON данные контента секции';