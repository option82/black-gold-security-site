import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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
        <div className="fixed bottom-4 right-4 z-50">
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
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminPanel;