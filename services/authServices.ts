// Authentication service for secure storage using react-native-encrypted-storage

import EncryptedStorage from 'react-native-encrypted-storage';

// Keys for auth storage
const AUTH_TOKEN_KEY = 'health_data_auth_token';
const USER_INFO_KEY = 'health_data_user_info';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

// Mock function to simulate sign in with email and password
export const signIn = async (email: string, password: string): Promise<UserInfo> => {
  // For the POC, we'll just simulate a successful login with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would make an API call to your backend
  // and store the returned authentication token
  
  // For now, generate a mock user and token
  const mockUser: UserInfo = {
    id: 'user123',
    name: 'Test User',
    email: email,
  };
  
  const mockToken = `mock_token_${Date.now()}`;
  
  // Store the mock user and token securely
  await EncryptedStorage.setItem(USER_INFO_KEY, JSON.stringify(mockUser));
  await EncryptedStorage.setItem(AUTH_TOKEN_KEY, mockToken);
  
  return mockUser;
};

// Sign out function
export const signOut = async (): Promise<void> => {
  // Clear authentication data from secure storage
  await EncryptedStorage.removeItem(AUTH_TOKEN_KEY);
  await EncryptedStorage.removeItem(USER_INFO_KEY);
};

// Check if the user is signed in
export const isSignedIn = async (): Promise<boolean> => {
  const token = await EncryptedStorage.getItem(AUTH_TOKEN_KEY);
  return token !== null;
};

// Get user info if signed in
export const getUserInfo = async (): Promise<UserInfo | null> => {
  const userInfo = await EncryptedStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

// Get auth token if available
export const getAuthToken = async (): Promise<string | null> => {
  return EncryptedStorage.getItem(AUTH_TOKEN_KEY);
};

// Mock function to simulate sharing data with a healthcare provider
export const shareDataWithProvider = async (
  providerId: string,
  dataTypes: string[],
  fhirData: any
): Promise<{ success: boolean; id: string }> => {
  // Simulate a request to the server
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would send the FHIR data to your backend
  // which would then route it to the appropriate provider
  
  console.log(`Sharing data with provider ${providerId}:`, dataTypes);
  
  // Return a mock success response
  return {
    success: true,
    id: `share_${Date.now()}`
  };
};
