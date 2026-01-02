import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const SYNC_API = 'https://functions.poehali.dev/d936140f-1158-4c59-85e7-bb904b44c4bc';

export default function SyncManager() {
  const [loading, setLoading] = useState(false);

  const syncToDb = async () => {
    setLoading(true);
    try {
      const response = await fetch('/site-data.json');
      const data = await response.json();

      const result = await fetch(SYNC_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const resultData = await result.json();

      if (resultData.success) {
        toast.success(`✅ Синхронизировано ${resultData.updated} записей в БД`);
      } else {
        toast.error('Ошибка синхронизации: ' + resultData.error);
      }
    } catch (error) {
      toast.error('Ошибка: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const syncFromDb = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SYNC_API}?direction=db-to-json`);
      const result = await response.json();

      if (result.success) {
        const jsonStr = JSON.stringify(result.data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'site-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('✅ Данные экспортированы из БД');
      } else {
        toast.error('Ошибка: ' + result.error);
      }
    } catch (error) {
      toast.error('Ошибка: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 bg-card/50 border-border">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="Database" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold">Синхронизация данных</h3>
      </div>
      
      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <p>Управление синхронизацией между локальным файлом и базой данных</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={syncToDb}
          disabled={loading}
          variant="outline"
          className="flex-1"
        >
          <Icon name="Upload" size={16} className="mr-2" />
          Файл → БД
        </Button>

        <Button
          onClick={syncFromDb}
          disabled={loading}
          variant="outline"
          className="flex-1"
        >
          <Icon name="Download" size={16} className="mr-2" />
          БД → Файл
        </Button>
      </div>

      <div className="mt-3 p-2 rounded bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
          <div>
            <strong>Файл → БД:</strong> Отправить site-data.json в базу данных<br/>
            <strong>БД → Файл:</strong> Скачать актуальные данные из БД
          </div>
        </div>
      </div>
    </Card>
  );
}
