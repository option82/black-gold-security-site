import { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ImageUploadProps {
  currentImage?: string;
  onImageUpload: (imageBase64: string) => void;
  label?: string;
  showPreview?: boolean;
}

const ImageUpload = ({ currentImage, onImageUpload, label = 'Загрузить изображение', showPreview = true }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const inputId = useId();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Размер файла не должен превышать 5 МБ');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload(base64String);
        toast.success('Изображение загружено');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageUpload('');
    toast.success('Изображение удалено');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={inputId}
        />
        <label htmlFor={inputId}>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="cursor-pointer"
            asChild
          >
            <span>
              <Icon name="Upload" size={16} className="mr-2" />
              {label}
            </span>
          </Button>
        </label>
        
        {preview && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleRemove}
            className="text-red-500"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        )}
      </div>

      {showPreview && preview && (
        <div className="relative w-full h-32 border border-primary/20 rounded overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;