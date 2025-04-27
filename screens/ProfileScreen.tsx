import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { getStoredConsent, clearConsent } from '../utils/storage';

const ProfileScreen = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [consentInfo, setConsentInfo] = useState(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const consent = await getStoredConsent();
      setHasConsent(!!consent && consent.consentedDataTypes?.length > 0);
      setConsentInfo(consent);
    } catch (error) {
      console.error('Failed to load profile data:', error);
    }
  };

  const handleRevokeConsent = () => {
    Alert.alert(
      'Revoke All Consent',
      'Are you sure you want to revoke consent for sharing all health data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Revoke All', 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearConsent();
              setHasConsent(false);
              setConsentInfo(null);
              Alert.alert('Consent Revoked', 'All health data sharing has been stopped.');
            } catch (error) {
              Alert.alert('Error', 'Failed to revoke consent');
              console.error(error);
            }
          }
        },
      ]
    );
  };

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile & Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Source</Text>
        <View style={styles.infoRow}>
          <Ionicons name="medkit-outline" size={24} color={colors.primary} />
          <Text style={styles.infoText}>
            Connected to: {Platform.OS === 'ios' ? 'Apple HealthKit' : 'CommonHealth'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Offline Mode</Text>
            <Text style={styles.settingDescription}>
              When enabled, your data will only be stored locally and not shared
            </Text>
          </View>
          <Switch
            value={offlineMode}
            onValueChange={toggleOfflineMode}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={offlineMode ? colors.primary : colors.white}
          />
        </View>
      </View>

      {consentInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consent Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={colors.textLight} />
            <Text style={styles.infoText}>
              Last updated: {new Date(consentInfo.consentDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="list-outline" size={20} color={colors.textLight} />
            <Text style={styles.infoText}>
              Consented data types: {consentInfo.consentedDataTypes.length}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.actionsSection}>
        {hasConsent && (
          <TouchableOpacity style={styles.dangerButton} onPress={handleRevokeConsent}>
            <Text style={styles.dangerButtonText}>Revoke All Consent</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Export My Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Health Data Sharing v1.0.0</Text>
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
  section: {
    padding: 20,
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textDark,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.textDark,
    marginLeft: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  actionsSection: {
    padding: 20,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  dangerButton: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  dangerButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: colors.textLight,
  },
});

export default ProfileScreen;