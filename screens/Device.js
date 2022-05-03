import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { signOut } from 'firebase/auth';

import { auth } from '../config/firebase';

export default function Device({ route, navigation }) {
  const { patient_id } = route.params;
  const [machineid, setMachineid] = useState('');
  const [dateAssigned, setDateassigned] = useState('');
  const [dateReturned, setDatereturned] = useState('');
  const [measurement, setMeasurement] = useState('');
  const onSignOut = () => {
    console.log('logout')
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  const sendMeasurements = () => {
    console.log(patient_id);
    const userdata = {patient_id, machineid, dateAssigned, dateReturned, measurement};
    fetch('http://ec2-52-200-233-118.compute-1.amazonaws.com/user/create_patient_device_measurement/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata)
          }).then(res => {
            return res.json();
          }).then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err.message);
          })
  }
  
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
          onPress={sendMeasurements}
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
