import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { signOut } from 'firebase/auth';

import { auth } from '../config/firebase';

export default function Device({ navigation }) {
  const [machineid, setMachineid] = useState('');
  const [dateAssigned, setDateassigned] = useState('');
  const [dateReturned, setDatereturned] = useState('');
  const [measurement, setMeasurement] = useState('');
  const onSignOut = () => {
    console.log('logout')
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter measurement</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter machine id'
        autoCapitalize='none'
        value={machineid}
        onChangeText={text => setMachineid(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter date assigned'
        value={dateAssigned}
        onChangeText={text => setDateassigned(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter date returned'
        value={dateReturned}
        onChangeText={text => setDatereturned(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter measurement'
        value={measurement}
        onChangeText={text => setMeasurement(text)}
      />
      <Button
          title='Send Measurement'
          color='#f57c00'
      />
      <Button
          onPress={onSignOut}
          title='Logout'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#444',
    alignSelf: 'center',
    paddingBottom: 24
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12
  }
});
