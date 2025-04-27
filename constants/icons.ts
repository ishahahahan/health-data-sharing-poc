// This file maps data types to their corresponding Ionicons
// Makes it easier to maintain consistent iconography throughout the app

export const dataTypeIcons = {
    steps: 'footsteps-outline',
    heartRate: 'heart-outline',
    sleep: 'moon-outline',
    bloodPressure: 'pulse-outline',
    weight: 'barbell-outline',
    bloodGlucose: 'water-outline',
    default: 'medical-outline',
  };
  
  export const statusIcons = {
    completed: 'checkmark-circle',
    pending: 'time',
    failed: 'close-circle',
    default: 'ellipsis-horizontal-circle',
  };
  
  export const tabIcons = {
    dashboard: {
      active: 'home',
      inactive: 'home-outline',
    },
    consent: {
      active: 'shield-checkmark',
      inactive: 'shield-checkmark-outline',
    },
    history: {
      active: 'time',
      inactive: 'time-outline',
    },
    profile: {
      active: 'person',
      inactive: 'person-outline',
    },
  };