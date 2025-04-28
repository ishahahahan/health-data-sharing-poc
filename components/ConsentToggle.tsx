import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface DataType {
  id: string;
  name: string;
  description: string;
}

interface ConsentToggleProps {
  dataType: DataType;
  isSelected: boolean;
  onToggle: () => void;
}

const ConsentToggle: React.FC<ConsentToggleProps> = ({ dataType, isSelected, onToggle }) => {
  // Function to determine the icon for each data type
  const getIconForDataType = (id: string) => {
    switch (id) {
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

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected ? styles.containerSelected : null
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={getIconForDataType(dataType.id)} 
          size={24} 
          color={isSelected ? colors.primary : colors.textLight} 
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.name}>{dataType.name}</Text>
        <Text style={styles.description}>{dataType.description}</Text>
      </View>
      
      <Switch
        value={isSelected}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primaryLight }}
        thumbColor={isSelected ? colors.primary : colors.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryVeryLight,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
});

export default ConsentToggle;