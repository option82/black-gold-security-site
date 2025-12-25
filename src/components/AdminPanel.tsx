import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { downloadContentBackup, importContent, exportContent } from '@/lib/storage';
import { useRef } from 'react';

interface AdminPanelProps {
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authPassword: string;
  setAuthPassword: (password: string) => void;
  handleAuth: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  onContentReload?: () => void;
}

const AdminPanel = ({
  showAuthDialog,
  setShowAuthDialog,
  authPassword,
  setAuthPassword,
  handleAuth,
  isAdminMode,
  setIsAdminMode,
  onContentReload,
}: AdminPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      await downloadContentBackup();
      toast.success('Резервная копия скачана');
    } catch (error) {
      toast.error('Ошибка экспорта данных');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importContent(text);
      toast.success('Данные импортированы успешно');
      onContentReload?.();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Ошибка импорта данных');
    }
  };

  const handleCopyData = async () => {
    try {
      const data = await exportContent();
      await navigator.clipboard.writeText(data);
      toast.success('Данные скопированы в буфер обмена');
    } catch (error) {
      toast.error('Ошибка копирования данных');
    }
  };

  return (
    <>
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Вход в админ-панель</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                className="bg-muted"
                placeholder="admin123"
              />
            </div>
            <Button onClick={handleAuth} className="w-full gold-gradient text-background font-semibold">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isAdminMode && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          <Card className="p-4 bg-primary text-background shadow-2xl max-w-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={20} />
                  <span className="font-semibold">Редактирование</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAdminMode(false);
                    toast.success('Изменения сохранены');
                  }}
                  className="bg-background text-primary"
                >
                  Выход
                </Button>
              </div>
              <div className="text-xs space-y-1 opacity-90">
                <p>• Наведите на элемент для редактирования</p>
                <p>• Перетаскивайте карточки для изменения порядка</p>
                <p>• Загружайте изображения прямо с ПК</p>
              </div>
              
              <div className="pt-2 border-t border-background/20 space-y-2">
                <div className="text-xs font-semibold opacity-90">Резервное копирование</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExport}
                    className="bg-background text-primary flex-1 text-xs"
                  >
                    <Icon name="Download" size={14} className="mr-1" />
                    Скачать
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleImportClick}
                    className="bg-background text-primary flex-1 text-xs"
                  >
                    <Icon name="Upload" size={14} className="mr-1" />
                    Загрузить
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyData}
                  className="bg-background text-primary w-full text-xs"
                >
                  <Icon name="Copy" size={14} className="mr-1" />
                  Копировать данные
                </Button>
                <div className="text-[10px] opacity-70 leading-tight space-y-1">
                  <p><strong>Как работает:</strong></p>
                  <p>• Все изменения сохраняются в браузере автоматически</p>
                  <p>• Для синхронизации между устройствами:</p>
                  <p className="pl-2">1. Нажмите "Скачать" на этом устройстве</p>
                  <p className="pl-2">2. Нажмите "Загрузить" на другом устройстве</p>
                  <p>• Без интернета сайт работает полностью автономно</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default AdminPanel;