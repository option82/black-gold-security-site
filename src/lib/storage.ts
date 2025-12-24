const STORAGE_KEY = 'zaschita-business-content';

export interface StoredContent {
  hero: any;
  services: any[];
  blog: any[];
  about: any;
  contacts: any;
  lastUpdated: string;
}

export const saveContent = (content: Partial<StoredContent>): void => {
  try {
    const existing = loadContent();
    const updated = {
      ...existing,
      ...content,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save content:', error);
  }
};

export const loadContent = (): StoredContent | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load content:', error);
    return null;
  }
};

export const clearContent = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear content:', error);
  }
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
