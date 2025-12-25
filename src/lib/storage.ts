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
  console.log('Clear content not implemented for DB storage');
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