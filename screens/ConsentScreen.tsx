import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';

export default function ConsentScreen({ navigation }: any) {
  const [stepConsent, setStepConsent] = useState(false);
  const [heartRateConsent, setHeartRateConsent] = useState(false);
  const [sleepConsent, setSleepConsent] = useState(false);

  const handleConsentSubmit = () => {
    console.log('User consents:', { stepConsent, heartRateConsent, sleepConsent });
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Data to Share</Text>

      <View style={styles.row}>
        <Text>Steps</Text>
        <Switch value={stepConsent} onValueChange={setStepConsent} />
      </View>

      <View style={styles.row}>
        <Text>Heart Rate</Text>
        <Switch value={heartRateConsent} onValueChange={setHeartRateConsent} />
      </View>

      <View style={styles.row}>
        <Text>Sleep</Text>
        <Switch value={sleepConsent} onValueChange={setSleepConsent} />
      </View>

      <Button title="Submit Consent" onPress={handleConsentSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
