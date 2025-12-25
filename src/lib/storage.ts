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
}

export const saveContent = async (content: Partial<StoredContent>): Promise<void> => {
  for (const [key, value] of Object.entries(content)) {
    await contentStore.saveContent(key, value);
  }
};

export const loadContent = async (): Promise<StoredContent | null> => {
  const allContent = await contentStore.getAllContent();
  if (Object.keys(allContent).length === 0) return null;
  return allContent as StoredContent;
};

export const exportContent = async (): Promise<string> => {
  const allContent = await contentStore.getAllContent();
  return JSON.stringify(allContent, null, 2);
};

export const downloadContentBackup = async (): Promise<void> => {
  const jsonData = await exportContent();
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `site-data.json`;
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