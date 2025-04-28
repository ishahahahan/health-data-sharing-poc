import EncryptedStorage from 'react-native-encrypted-storage';

// Keys for storage
const CONSENT_KEY = 'health_data_consent';
const HISTORY_KEY = 'health_data_sharing_history';

// Define types for storing consent
export interface ConsentData {
  consentedDataTypes: string[];
  consentDate: string;
  hasRequestedPermissions?: boolean;
}

// Define types for storing sharing history
export interface SharingHistoryItem {
  id: string;
  date: string;
  dataTypes: string[];
  recipient: string;
  status: string;
}

// Save consent settings securely
export const saveConsent = async (consentData: ConsentData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(consentData);
    await EncryptedStorage.setItem(CONSENT_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving consent data:', error);
    throw error;
  }
};

// Get stored consent settings
export const getStoredConsent = async (): Promise<ConsentData | null> => {
  try {
    const jsonValue = await EncryptedStorage.getItem(CONSENT_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting consent data:', error);
    return null;
  }
};

// Clear stored consent settings
export const clearConsent = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(CONSENT_KEY);
  } catch (error) {
    console.error('Error clearing consent data:', error);
    throw error;
  }
};

// Save a new sharing history item
export const saveHistoryItem = async (historyItem: SharingHistoryItem): Promise<void> => {
  try {
    const history = await getHistoryItems();
    const updatedHistory = [historyItem, ...history];
    const jsonValue = JSON.stringify(updatedHistory);
    await EncryptedStorage.setItem(HISTORY_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving history item:', error);
    throw error;
  }
};

// Get all sharing history items
export const getHistoryItems = async (): Promise<SharingHistoryItem[]> => {
  try {
    const jsonValue = await EncryptedStorage.getItem(HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting history items:', error);
    return [];
  }
};

// Clear all history
export const clearHistory = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
    throw error;
  }
};
