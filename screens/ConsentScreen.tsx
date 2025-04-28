import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  Platform 
} from 'react-native';
import ConsentToggle from '../components/ConsentToggle';
import { colors } from '../constants/colors';
import { getStoredConsent, saveConsent } from '../utils/storage';
import { requestHealthKitPermissions } from '../services/healthKitService';
import { requestCommonHealthPermissions } from '../services/commonHealthService';

const HEALTH_DATA_TYPES = [
  { id: 'steps', name: 'Steps', description: 'Daily step count' },
  { id: 'heartRate', name: 'Heart Rate', description: 'Heart rate measurements' },
  { id: 'sleep', name: 'Sleep', description: 'Sleep duration and quality' },
  { id: 'bloodPressure', name: 'Blood Pressure', description: 'Systolic and diastolic readings' },
  { id: 'weight', name: 'Weight', description: 'Body weight measurements' },
  { id: 'bloodGlucose', name: 'Blood Glucose', description: 'Blood sugar readings' },
];

const ConsentScreen = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [hasRequestedPermissions, setHasRequestedPermissions] = useState(false);

  useEffect(() => {
    loadSavedConsent();
  }, []);

  const loadSavedConsent = async () => {
    try {
      const consent = await getStoredConsent();
      if (consent && consent.consentedDataTypes) {
        setSelectedTypes(consent.consentedDataTypes);
        setHasRequestedPermissions(consent.hasRequestedPermissions || false);
      }
    } catch (error) {
      console.error('Failed to load saved consent:', error);
    }
  };

  interface ToggleDataTypeFunction {
    (dataTypeId: string): void;
  }

  const toggleDataType: ToggleDataTypeFunction = (dataTypeId) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(dataTypeId)) {
        return prevSelectedTypes.filter(id => id !== dataTypeId);
      } else {
        return [...prevSelectedTypes, dataTypeId];
      }
    });
  };

  const saveConsentSettings = async () => {
    try {
      await saveConsent({
        consentedDataTypes: selectedTypes,
        consentDate: new Date().toISOString(),
        hasRequestedPermissions: true,
      });
      
      // Request OS-level permissions
      if (!hasRequestedPermissions && selectedTypes.length > 0) {
        if (Platform.OS === 'ios') {
          await requestHealthKitPermissions(selectedTypes);
        } else {
          await requestCommonHealthPermissions(selectedTypes);
        }
        setHasRequestedPermissions(true);
      }
      
      Alert.alert(
        'Consent Updated',
        'Your data sharing preferences have been saved.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save consent settings');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Sharing Consent</Text>
        <Text style={styles.description}>
          Select which health data types you want to share. You can change these settings at any time.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Data Types</Text>
        {HEALTH_DATA_TYPES.map((dataType) => (
          <ConsentToggle
            key={dataType.id}
            dataType={dataType}
            isSelected={selectedTypes.includes(dataType.id)}
            onToggle={() => toggleDataType(dataType.id)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveConsentSettings}
        >
          <Text style={styles.saveButtonText}>Save Consent Settings</Text>
        </TouchableOpacity>
        
        <Text style={styles.disclaimer}>
          Your data will always remain in your control. You can revoke consent at any time.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.textLight,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textDark,
  },
  footer: {
    padding: 20,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 20,
  },
});

export default ConsentScreen;