import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface HistoryItemProps {
  historyItem: {
    id: string;
    date: string;
    dataTypes: string[];
    recipient: string;
    status: string;
  };
}

const HistoryItem: React.FC<HistoryItemProps> = ({ historyItem }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'failed':
        return colors.danger;
      default:
        return colors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'failed':
        return 'close-circle';
      default:
        return 'ellipsis-horizontal-circle';
    }
  };

  // Get a human-readable name for data types
  const formatDataTypes = (types: string[]) => {
    return types.map(type => {
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
    }).join(', ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.recipient}>
          <Ionicons name="business-outline" size={16} color={colors.textLight} />
          <Text style={styles.recipientText}>{historyItem.recipient}</Text>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: getStatusColor(historyItem.status) + '20' }]}>
          <Ionicons name={getStatusIcon(historyItem.status)} size={14} color={getStatusColor(historyItem.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(historyItem.status) }]}>
            {historyItem.status.charAt(0).toUpperCase() + historyItem.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.date}>{formatDate(historyItem.date)}</Text>
        <Text style={styles.dataTypesLabel}>Shared data:</Text>
        <Text style={styles.dataTypes}>{formatDataTypes(historyItem.dataTypes)}</Text>
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
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recipient: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipientText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  content: {
    padding: 12,
  },
  date: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  dataTypesLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  dataTypes: {
    fontSize: 14,
    color: colors.textDark,
  },
});

export default HistoryItem;