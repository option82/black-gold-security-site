const STORAGE_PREFIX = 'site_content_';
const STORAGE_VERSION = 'v1';

export interface ContentStore {
  getContent: (key: string) => Promise<any>;
  saveContent: (key: string, data: any) => Promise<void>;
  getAllContent: () => Promise<Record<string, any>>;
}

export const contentStore: ContentStore = {
  async getContent(key: string) {
    try {
      const storageKey = `${STORAGE_PREFIX}${STORAGE_VERSION}_${key}`;
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        const data = JSON.parse(stored);
        console.log('Content loaded from localStorage for key:', key);
        return data;
      }
      
      console.log('Content not found in localStorage for key:', key);
      return null;
    } catch (error) {
      console.error(`Error loading content for key ${key}:`, error);
      return null;
    }
  },

  async saveContent(key: string, data: any) {
    try {
      const storageKey = `${STORAGE_PREFIX}${STORAGE_VERSION}_${key}`;
      localStorage.setItem(storageKey, JSON.stringify(data));
      console.log('Content saved to localStorage for key:', key);
    } catch (error) {
      console.error(`Error saving content for key ${key}:`, error);
      throw error;
    }
  },

  async getAllContent() {
    try {
      const result: Record<string, any> = {};
      const prefix = `${STORAGE_PREFIX}${STORAGE_VERSION}_`;
      
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey && storageKey.startsWith(prefix)) {
          const key = storageKey.replace(prefix, '');
          const value = localStorage.getItem(storageKey);
          if (value) {
            result[key] = JSON.parse(value);
          }
        }
      }
      
      console.log('All content loaded from localStorage:', Object.keys(result));
      return result;
    } catch (error) {
      console.error('Error loading all content:', error);
      return {};
    }
  }
};