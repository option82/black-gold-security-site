import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface ArticleImage {
  id: string;
  src: string;
  width: number;
  position: 'left' | 'center' | 'right';
  floatText: boolean;
}

interface ArticleImageEditorProps {
  images: ArticleImage[];
  onImagesChange: (images: ArticleImage[]) => void;
}

const ArticleImageEditor = ({ images, onImagesChange }: ArticleImageEditorProps) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const newImage: ArticleImage = {
        id: Date.now().toString(),
        src: base64,
        width: 100,
        position: 'center',
        floatText: false
      };
      onImagesChange([...images, newImage]);
      setUploading(false);
    };

    reader.onerror = () => {
      alert('Ошибка загрузки изображения');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
  };

  const updateImage = (id: string, updates: Partial<ArticleImage>) => {
    onImagesChange(images.map(img => 
      img.id === id ? { ...img, ...updates } : img
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="article-image-upload"
          disabled={uploading}
        />
        <label htmlFor="article-image-upload">
          <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
            <span>
              <Icon name="Image" size={14} className="mr-2" />
              {uploading ? 'Загрузка...' : 'Добавить изображение'}
            </span>
          </Button>
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((image) => (
            <Card key={image.id} className="p-3 bg-muted border-primary/20">
              <div className="space-y-3">
                <div className={`${
                  image.floatText 
                    ? (image.position === 'left' ? 'float-left mr-4 mb-2' : 'float-right ml-4 mb-2')
                    : (image.position === 'left' ? 'mr-auto' : image.position === 'right' ? 'ml-auto' : 'mx-auto')
                }`} style={{ width: image.floatText ? `${Math.min(image.width, 50)}%` : `${image.width}%` }}>
                  <img 
                    src={image.src} 
                    alt="Article" 
                    className="rounded object-cover w-full"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-card-foreground">Ширина: {image.width}%</label>
                    <Input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={image.width}
                      onChange={(e) => updateImage(image.id, { width: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant={image.position === 'left' ? 'default' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateImage(image.id, { position: 'left' });
                        }}
                      >
                        <Icon name="AlignLeft" size={14} />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={image.position === 'center' ? 'default' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateImage(image.id, { position: 'center' });
                        }}
                        disabled={image.floatText}
                      >
                        <Icon name="AlignCenter" size={14} />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={image.position === 'right' ? 'default' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateImage(image.id, { position: 'right' });
                        }}
                      >
                        <Icon name="AlignRight" size={14} />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant={image.floatText ? 'default' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateImage(image.id, { 
                          floatText: !image.floatText,
                          position: image.floatText ? 'center' : (image.position === 'center' ? 'left' : image.position)
                        });
                      }}
                      className="text-xs"
                    >
                      <Icon name="WrapText" size={14} className="mr-1" />
                      Обтекание текстом
                    </Button>
                  </div>
                  
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleImageEditor;