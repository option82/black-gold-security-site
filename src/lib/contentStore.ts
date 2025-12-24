const API_URL = 'https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5';

export interface ContentStore {
  getContent: (key: string) => Promise<any>;
  saveContent: (key: string, data: any) => Promise<void>;
  getAllContent: () => Promise<Record<string, any>>;
}

export const contentStore: ContentStore = {
  async getContent(key: string) {
    try {
      const response = await fetch(`${API_URL}?key=${encodeURIComponent(key)}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error(`Error loading content for key ${key}:`, error);
      return null;
    }
  },

  async saveContent(key: string, data: any) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save content: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error saving content for key ${key}:`, error);
      throw error;
    }
  },

  async getAllContent() {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        return await response.json();
      }
      return {};
    } catch (error) {
      console.error('Error loading all content:', error);
      return {};
    }
  }
};
