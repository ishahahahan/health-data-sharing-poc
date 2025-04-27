# Health Data Sharing POC

A cross-platform mobile application that allows users to securely access and share their personal health data from Apple HealthKit (iOS) and CommonHealth (Android).

## Features

- Connect to native health data sources (HealthKit or CommonHealth)
- Grant or revoke consent for specific health data types
- View historical sharing records
- FHIR-compliant data formatting
- Secure local storage of preferences
- Offline-first design

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/health-data-sharing-poc.git
cd health-data-sharing-poc

# Install dependencies
npm install

# Start the development server
npm start
```

## Running on a Device

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Project Structure

```
health-data-sharing-poc/
│
├── App.tsx                         # Main app entry point
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── app.json                        # Expo app configuration
│
├── /assets/                        # Static assets like images, icons
│
├── /components/                    # Reusable UI components
│   ├── ConsentToggle.tsx           # Toggle switch for data types
│   ├── HealthDataCard.tsx          # Card showing health data
│   └── HistoryItem.tsx             # Component for sharing history 
│
├── /screens/                       # App Screens
│   ├── ConsentScreen.tsx           # Data sharing consent management
│   ├── DashboardScreen.tsx         # Main dashboard
│   ├── HistoryScreen.tsx           # Sharing history view
│   └── ProfileScreen.tsx           # User settings
│
├── /navigation/                    # Navigation setup
│   └── StackNavigator.tsx          # Navigation config
│
├── /utils/                         # Helper functions
│   ├── fhirFormatter.ts            # FHIR formatting utilities
│   ├── storage.ts                  # Local storage handlers
│   └── mockData.ts                 # Mock health data for testing
│
├── /services/                      # API services
│   ├── healthkitService.ts         # HealthKit integration (iOS)
│   ├── commonHealthService.ts      # CommonHealth integration (Android)
│   └── authService.ts              # Authentication service
│
└── /constants/                     # Static data, config
    ├── colors.ts                   # App color palette
    ├── icons.ts                    # Icon mappings
    └── strings.ts                  # Text labels
```

## Technologies Used

- React Native / Expo
- TypeScript
- React Navigation
- HealthKit API (iOS)
- CommonHealth API (Android)
- FHIR standard formatting
- Expo SecureStore for encrypted storage

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.