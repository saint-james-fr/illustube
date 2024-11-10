import { apiKeyStore } from 'stores';

export const clearApiKey = () => {
  apiKeyStore.set({ key: '', isValid: false });
  // sessionStorage removal is handled by the store subscription
}; 