import { useState, useEffect, useCallback } from 'react';
import { contentStore } from '@/lib/contentStore';
import { toast } from 'sonner';

export function useContent<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await contentStore.getContent(key);
        if (stored) {
          setData(stored);
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [key]);

  const saveData = useCallback(async (newData: T) => {
    try {
      await contentStore.saveContent(key, newData);
      setData(newData);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      toast.error('Ошибка сохранения данных');
      throw error;
    }
  }, [key]);

  const updateData = useCallback((updater: (prev: T) => T) => {
    setData(prev => {
      const newData = updater(prev);
      saveData(newData);
      return newData;
    });
  }, [saveData]);

  return { data, setData: updateData, loading, saveData };
}
