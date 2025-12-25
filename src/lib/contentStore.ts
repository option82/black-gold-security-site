const API_URL = 'https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5';

export interface ContentStore {
  getContent: (key: string) => Promise<any>;
  saveContent: (key: string, data: any) => Promise<void>;
  getAllContent: () => Promise<Record<string, any>>;
}

export const contentStore: ContentStore = {
  async getContent(key: string) {
    try {
      const url = `${API_URL}?key=${encodeURIComponent(key)}`;
      console.log('Fetching content from:', url);
      const response = await fetch(url);
      console.log('Response status:', response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log('Content loaded for key:', key);
        return data;
      }
      console.log('Content not found for key:', key);
      return null;
    } catch (error) {
      console.error(`Fetch error: ${error instanceof Error ? error.message : 'Unknown error'} for ${API_URL}?key=${key}`);
      return null;
    }
  },

  async saveContent(key: string, data: any) {
    try {
      console.log('Saving content for key:', key);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data })
      });
      console.log('Save response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save failed:', errorText);
        throw new Error(`Failed to save content: ${response.statusText}`);
      }
      console.log('Content saved successfully for key:', key);
    } catch (error) {
      console.error(`Error saving content for key ${key}:`, error);
      throw error;
    }
  },

  async getAllContent() {
    try {
      console.log('Fetching all content from:', API_URL);
      const response = await fetch(API_URL);
      console.log('GetAll response status:', response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log('All content loaded:', Object.keys(data));
        return data;
      }
      console.log('No content found, returning empty object');
      return {};
    } catch (error) {
      console.error(`Fetch error: ${error instanceof Error ? error.message : 'Unknown error'} for ${API_URL}`);
      return {};
    }
  }
};