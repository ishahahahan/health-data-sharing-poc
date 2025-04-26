import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Dashboard!</Text>
      <Text style={styles.subtitle}>Health Data Sources Connected:</Text>

      <View style={styles.card}>
        <Text>Apple HealthKit / CommonHealth</Text>
        <Text>Status: Connected ✅</Text>
      </View>

      <View style={styles.card}>
        <Text>Data Types Shared:</Text>
        <Text>- Steps</Text>
        <Text>- Heart Rate</Text>
        <Text>- Sleep</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});
