const STORAGE_KEY = 'site_content_v2';
const DATA_FILE_URL = '/site-data.json';

export interface ContentStore {
  getContent: (key: string) => Promise<any>;
  saveContent: (key: string, data: any) => Promise<void>;
  getAllContent: () => Promise<Record<string, any>>;
  syncToFile: () => Promise<void>;
}

export const contentStore: ContentStore = {
  async getContent(key: string) {
    try {
      const allData = await this.getAllContent();
      return allData[key] || null;
    } catch (error) {
      console.error(`Error loading content for key ${key}:`, error);
      return null;
    }
  },

  async saveContent(key: string, data: any) {
    try {
      const allData = await this.getAllContent();
      allData[key] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
      console.log('Content saved for key:', key);
    } catch (error) {
      console.error(`Error saving content for key ${key}:`, error);
      throw error;
    }
  },

  async getAllContent() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        return JSON.parse(stored);
      }
      
      const response = await fetch(DATA_FILE_URL);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('Initial data loaded from file');
        return data;
      }
      
      return {};
    } catch (error) {
      console.error('Error loading all content:', error);
      return {};
    }
  },

  async syncToFile() {
    console.log('Синхронизация с файлом доступна через экспорт/импорт');
  }
};