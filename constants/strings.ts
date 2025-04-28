export const strings = {
    // App information
    appName: 'Health Data Sharing',
    appVersion: 'v1.0.0',
    
    // Screens
    dashboard: {
      title: 'Your Health Data',
      connectedTo: 'Connected to',
      notConnectedTo: 'Not connected to',
      sectionTitle: 'Connected Data Types',
      emptyMessage: 'No health data types selected. Visit the Consent tab to select data to share.',
    },
    
    consent: {
      title: 'Data Sharing Consent',
      description: 'Select which health data types you want to share. You can change these settings at any time.',
      sectionTitle: 'Health Data Types',
      saveButton: 'Save Consent Settings',
      disclaimer: 'Your data will always remain in your control. You can revoke consent at any time.',
      updateSuccess: 'Consent Updated',
      updateSuccessMessage: 'Your data sharing preferences have been saved.',
      updateError: 'Error',
      updateErrorMessage: 'Failed to save consent settings',
    },
    
    history: {
      title: 'Sharing History',
      subtitle: 'View a record of when your health data was shared',
      consentTitle: 'Current Consent',
      lastUpdated: 'Last updated:',
      dataTypes: 'Data types:',
      emptyMessage: 'No sharing history available',
    },
    
    profile: {
      title: 'Profile & Settings',
      dataSources: 'Data Source',
      privacySettings: 'Privacy Settings',
      offlineMode: 'Offline Mode',
      offlineModeDescription: 'When enabled, your data will only be stored locally and not shared',
      consentInfo: 'Consent Information',
      revokeConsent: 'Revoke All Consent',
      revokeConsentConfirm: 'Are you sure you want to revoke consent for sharing all health data? This action cannot be undone.',
      revokeConsentSuccess: 'Consent Revoked',
      revokeConsentSuccessMessage: 'All health data sharing has been stopped.',
      exportData: 'Export My Data',
      privacyPolicy: 'Privacy Policy',
    },
    
    // Data types
    dataTypes: {
      steps: 'Steps',
      stepsDescription: 'Daily step count',
      heartRate: 'Heart Rate',
      heartRateDescription: 'Heart rate measurements',
      sleep: 'Sleep',
      sleepDescription: 'Sleep duration and quality',
      bloodPressure: 'Blood Pressure',
      bloodPressureDescription: 'Systolic and diastolic readings',
      weight: 'Weight',
      weightDescription: 'Body weight measurements',
      bloodGlucose: 'Blood Glucose',
      bloodGlucoseDescription: 'Blood sugar readings',
    },
    
    // Statuses
    status: {
      sharingEnabled: 'Sharing enabled',
      sharingDisabled: 'Sharing disabled',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
    },
    
    // General
    ok: 'OK',
    cancel: 'Cancel',
    connected: 'Connected to health data source',
    notConnected: 'Not connected to health data source',
    noRecentData: 'No recent data',
    lastUpdated: 'Last updated:',
  };