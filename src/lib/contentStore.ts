const DATA_FILE_URL = '/site-data.json';

let cachedData: Record<string, any> | null = null;

export interface ContentStore {
  getContent: (key: string) => Promise<any>;
  saveContent: (key: string, data: any) => Promise<void>;
  getAllContent: () => Promise<Record<string, any>>;
}

export const contentStore: ContentStore = {
  async getAllContent() {
    if (cachedData) {
      return { ...cachedData };
    }

    try {
      const response = await fetch(DATA_FILE_URL + '?t=' + Date.now());
      if (response.ok) {
        cachedData = await response.json();
        return { ...cachedData };
      }
      return {};
    } catch (error) {
      console.error('Error loading content:', error);
      return {};
    }
  },

  async getContent(key: string) {
    const allData = await this.getAllContent();
    return allData[key] || null;
  },

  async saveContent(key: string, data: any) {
    if (!cachedData) {
      cachedData = await this.getAllContent();
    }
    cachedData[key] = data;
    console.log(`Content updated in memory for key: ${key}. Use export to save permanently.`);
  }
};