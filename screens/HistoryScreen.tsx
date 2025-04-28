import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import HistoryItem from '../components/HistoryItem';
import { colors } from '../constants/colors';
import { getStoredConsent } from '../utils/storage';

// In a real app, you'd have a history of sharing events
// For this POC, we'll just mock some sharing history
const mockSharingHistory = [
  {
    id: '1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    dataTypes: ['steps', 'heartRate'],
    recipient: 'Dr. Smith Clinic',
    status: 'completed',
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    dataTypes: ['sleep', 'weight'],
    recipient: 'City Hospital',
    status: 'completed',
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    dataTypes: ['bloodPressure'],
    recipient: 'Health Research Study',
    status: 'pending',
  },
];

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consentInfo, setConsentInfo] = useState(null);

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = async () => {
    try {
      // In a real app, you'd fetch actual sharing history from a persistent store
      setHistory(mockSharingHistory);
      
      // Get current consent info for display
      const consent = await getStoredConsent();
      setConsentInfo(consent);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load history:', error);
      setLoading(false);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <HistoryItem historyItem={item} />
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sharing History</Text>
        <Text style={styles.subtitle}>
          View a record of when your health data was shared
        </Text>
      </View>

      {consentInfo && (
        <View style={styles.consentSummary}>
          <Text style={styles.consentTitle}>Current Consent</Text>
          <Text style={styles.consentDate}>
            Last updated: {new Date(consentInfo.consentDate).toLocaleDateString()}
          </Text>
          <Text style={styles.consentTypes}>
            Data types: {consentInfo.consentedDataTypes.join(', ')}
          </Text>
        </View>
      )}

      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No sharing history available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  consentSummary: {
    backgroundColor: colors.white,
    padding: 15,
    margin: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  consentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  consentDate: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 5,
  },
  consentTypes: {
    fontSize: 14,
    color: colors.textDark,
    marginTop: 5,
  },
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default HistoryScreen;