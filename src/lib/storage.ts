import { contentStore } from './contentStore';

export interface StoredContent {
  logo?: string;
  hero: any;
  services: any;
  blog: any;
  about: any;
  portfolio: any;
  cases: any;
  contacts: any;
  footer: any;
  lastUpdated?: string;
}

export const saveContent = async (content: Partial<StoredContent>): Promise<void> => {
  try {
    for (const [key, value] of Object.entries(content)) {
      if (key !== 'lastUpdated') {
        await contentStore.saveContent(key, value);
      }
    }
  } catch (error) {
    console.error('Failed to save content:', error);
    throw error;
  }
};

export const loadContent = async (): Promise<StoredContent | null> => {
  try {
    const allContent = await contentStore.getAllContent();
    if (Object.keys(allContent).length === 0) return null;
    return allContent as StoredContent;
  } catch (error) {
    console.error('Failed to load content:', error);
    return null;
  }
};

export const clearContent = async (): Promise<void> => {
  localStorage.removeItem('site_content_v2');
  console.log('Content cleared');
};

export const exportContent = async (): Promise<string> => {
  const allContent = await loadContent();
  return JSON.stringify(allContent, null, 2);
};

export const importContent = async (jsonData: string): Promise<void> => {
  try {
    const data = JSON.parse(jsonData) as StoredContent;
    await saveContent(data);
    console.log('Content imported successfully');
  } catch (error) {
    console.error('Failed to import content:', error);
    throw new Error('Неверный формат данных');
  }
};

export const downloadContentBackup = async (): Promise<void> => {
  const jsonData = await exportContent();
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `site-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const saveImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};