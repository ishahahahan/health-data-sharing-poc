import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface HealthDataCardProps {
  dataType: string;
  isConnected: boolean;
  data?: any;
}

const HealthDataCard: React.FC<HealthDataCardProps> = ({ dataType, isConnected, data }) => {
  // Function to determine the icon for each data type
  const getIconForDataType = (type: string) => {
    switch (type) {
      case 'steps':
        return 'footsteps-outline';
      case 'heartRate':
        return 'heart-outline';
      case 'sleep':
        return 'moon-outline';
      case 'bloodPressure':
        return 'pulse-outline';
      case 'weight':
        return 'barbell-outline';
      case 'bloodGlucose':
        return 'water-outline';
      default:
        return 'medical-outline';
    }
  };

  // Function to get a human-readable name for the data type
  const getDataTypeName = (type: string) => {
    switch (type) {
        case 'steps':
          return 'Steps';
        case 'heartRate':
          return 'Heart Rate';
        case 'sleep':
          return 'Sleep';
        case 'bloodPressure':
          return 'Blood Pressure';
        case 'weight':
          return 'Weight';
        case 'bloodGlucose':
          return 'Blood Glucose';
        default:
          return type.charAt(0).toUpperCase() + type.slice(1);
      }
    };
  
    // Function to format the data based on type
    const formatData = (type: string, data: any) => {
      if (!data) return 'No data available';
      
      switch (type) {
        case 'steps':
          return `${data.value} steps`;
        case 'heartRate':
          return `${data.value} bpm`;
        case 'sleep':
          return `${data.hours}h ${data.minutes}m`;
        case 'bloodPressure':
          return `${data.systolic}/${data.diastolic} mmHg`;
        case 'weight':
          return `${data.value} ${data.unit}`;
        case 'bloodGlucose':
          return `${data.value} ${data.unit}`;
        default:
          return JSON.stringify(data);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={getIconForDataType(dataType)} size={24} color={colors.primary} />
          </View>
          <Text style={styles.title}>{getDataTypeName(dataType)}</Text>
        </View>
        
        <View style={styles.content}>
          {isConnected ? (
            <>
              <Text style={styles.dataValue}>
                {data ? formatData(dataType, data) : 'No recent data'}
              </Text>
              {data && data.timestamp && (
                <Text style={styles.timestamp}>
                  Last updated: {new Date(data.timestamp).toLocaleString()}
                </Text>
              )}
            </>
          ) : (
            <View style={styles.notConnected}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.warning} />
              <Text style={styles.notConnectedText}>Not connected to health data source</Text>
            </View>
          )}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.statusText}>
            {isConnected ? 'Sharing enabled' : 'Sharing disabled'}
          </Text>
          <View style={[
            styles.statusIndicator, 
            isConnected ? styles.statusActive : styles.statusInactive
          ]} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 8,
      marginBottom: 15,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryVeryLight,
      borderRadius: 20,
      marginRight: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textDark,
    },
    content: {
      padding: 15,
    },
    dataValue: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textDark,
      marginBottom: 5,
    },
    timestamp: {
      fontSize: 12,
      color: colors.textLight,
    },
    notConnected: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notConnectedText: {
      fontSize: 14,
      color: colors.warning,
      marginLeft: 5,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: colors.background,
    },
    statusText: {
      fontSize: 12,
      color: colors.textLight,
    },
    statusIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusActive: {
      backgroundColor: colors.success,
    },
    statusInactive: {
      backgroundColor: colors.danger,
    },
  });
  
  export default HealthDataCard;