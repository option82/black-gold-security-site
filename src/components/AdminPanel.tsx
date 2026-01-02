import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { downloadContentBackup, exportContent } from '@/lib/storage';
import SyncManager from '@/components/SyncManager';

interface AdminPanelProps {
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authPassword: string;
  setAuthPassword: (password: string) => void;
  handleAuth: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

const AdminPanel = ({
  showAuthDialog,
  setShowAuthDialog,
  authPassword,
  setAuthPassword,
  handleAuth,
  isAdminMode,
  setIsAdminMode,
}: AdminPanelProps) => {
  const handleExport = async () => {
    try {
      await downloadContentBackup();
      toast.success('Файл site-data.json скачан! Замените им файл в папке public/', {
        duration: 5000
      });
    } catch (error) {
      toast.error('Ошибка экспорта данных');
    }
  };

  const handleCopyInstructions = () => {
    const instructions = `
ИНСТРУКЦИЯ ПО СОХРАНЕНИЮ ИЗМЕНЕНИЙ:

1. Нажмите кнопку "Скачать изменения"
2. Скачается файл site-data.json
3. Замените им файл public/site-data.json в проекте
4. Закоммитьте изменения в GitHub
5. После деплоя все устройства увидят изменения

Быстрая команда для коммита:
cp ~/Downloads/site-data.json public/site-data.json
git add public/site-data.json
git commit -m "Обновление контента сайта"
git push
    `.trim();
    
    navigator.clipboard.writeText(instructions);
    toast.success('Инструкция скопирована в буфер обмена');
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
              
              <div className="pt-2 border-t border-background/20 space-y-3">
                <div className="text-xs font-semibold opacity-90">Управление данными</div>
                
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExport}
                    className="bg-background text-primary w-full text-xs"
                  >
                    <Icon name="Download" size={14} className="mr-1" />
                    Скачать изменения
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyInstructions}
                    className="bg-background text-primary w-full text-xs"
                  >
                    <Icon name="Copy" size={14} className="mr-1" />
                    Копировать инструкцию
                  </Button>
                </div>

                <div className="pt-2">
                  <SyncManager />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminPanel;