import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Alert } from 'react-native';
import HealthDataCard from '../components/HealthDataCard';
import { getStoredConsent } from '../utils/storage';
import { colors } from '../constants/colors';
import { getMockHealthData } from '../utils/mockData';
import { checkHealthDataPermissions } from '../services/healthkitService';
import { checkCommonHealthPermissions } from '../services/commonHealthService';

const DashboardScreen = () => {
  const [consentedData, setConsentedData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [healthData, setHealthData] = useState({});

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get stored consent settings
      const consent = await getStoredConsent();
      if (consent && consent.consentedDataTypes) {
        setConsentedData(consent.consentedDataTypes);
      }
      
      // Check if we're connected to health data source
      let connected = false;
      if (Platform.OS === 'ios') {
        connected = await checkHealthDataPermissions();
      } else {
        connected = await checkCommonHealthPermissions();
      }
      setIsConnected(connected);
      
      // For the POC, we'll use mock data
      if (connected) {
        const data = await getMockHealthData();
        setHealthData(data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
      console.error(error);
    }
  };

  const getSourceName = () => {
    return Platform.OS === 'ios' ? 'Apple HealthKit' : 'CommonHealth';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Health Data</Text>
        <Text style={styles.subtitle}>
          {isConnected
            ? `Connected to ${getSourceName()}`
            : `Not connected to ${getSourceName()}`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Data Types</Text>
        {consentedData.length > 0 ? (
          consentedData.map((dataType) => (
            <HealthDataCard
              key={dataType}
              dataType={dataType}
              isConnected={isConnected}
              data={healthData[dataType]}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No health data types selected. Visit the Consent tab to select data to share.
          </Text>
        )}
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
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
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
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
});

export default DashboardScreen;