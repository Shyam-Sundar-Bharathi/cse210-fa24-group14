// This is the service to interact with the Chrome storage
// We can switch this service to IndexedDBService if we want to use IndexedDB instead of Chrome storage
export class StorageService {
  async get(key, defaultValue = null) {
    return new Promise((resolve) => {
      chrome.storage.sync.get({ [key]: defaultValue }, (data) => {
        resolve(data[key]);
      });
    });
  }

  async set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, resolve);
    });
  }
}
