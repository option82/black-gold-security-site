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
          <Card className="p-4 bg-primary text-background shadow-2xl">
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} />
              <span className="font-semibold">Режим редактирования</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAdminMode(false);
                  toast.success('Изменения сохранены');
                }}
                className="ml-4 bg-background text-primary"
              >
                Сохранить и выйти
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
