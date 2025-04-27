import EncryptedStorage from 'react-native-encrypted-storage';

// Current timestamp
const now = new Date().toISOString();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

// Storage key
const MOCK_HEALTH_DATA_KEY = 'mock_health_data';

// Mock data for each health data type
const mockHealthData = {
  steps: {
    value: 8743,
    unit: 'steps',
    timestamp: now
  },
  heartRate: {
    value: 72,
    unit: 'bpm',
    timestamp: now
  },
  sleep: {
    hours: 7,
    minutes: 25,
    quality: 'good',
    timestamp: yesterday,
    unit: 'hours'
  },
  bloodPressure: {
    systolic: 124,
    diastolic: 79,
    unit: 'mmHg',
    timestamp: twoDaysAgo
  },
  weight: {
    value: 72.5,
    unit: 'kg',
    timestamp: yesterday
  },
  bloodGlucose: {
    value: 98,
    unit: 'mg/dL',
    timestamp: now
  }
};

// Save mock data into Encrypted Storage
export const saveMockHealthData = async () => {
  try {
    const jsonValue = JSON.stringify(mockHealthData);
    await EncryptedStorage.setItem(MOCK_HEALTH_DATA_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving mock health data:', error);
    throw error;
  }
};

// Get all mock health data securely
export const getMockHealthData = async () => {
  try {
    const jsonValue = await EncryptedStorage.getItem(MOCK_HEALTH_DATA_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    } else {
      // If no saved mock data, return default
      return mockHealthData;
    }
  } catch (error) {
    console.error('Error retrieving mock health data:', error);
    return mockHealthData;
  }
};

// Get mock data for specific types securely
export const getMockDataForTypes = async (dataTypes: string[]) => {
  const allData = await getMockHealthData();
  const result: any = {};

  dataTypes.forEach(type => {
    if (allData[type]) {
      result[type] = allData[type];
    }
  });

  return result;
};

// Mock function to simulate a delay in data fetching
export const fetchWithDelay = async (data: any, delayMs = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
};
