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
    const userdata = {patient_id, machineid, dateAssigned, dateReturned, measurement};
    if(isNaN(machineid) || machineid < 1 || machineid > 5){
      window.alert('Enter a number corresponding to a machine id for the measurement you are taking ie 1 to 5.')
    }
    var re = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if(re.test(dateAssigned)==false && re.test(dateReturned)==false){
      window.alert('Enter the date in YYYY-MM-DD format to send measurements')
    }
    if (machineid !== '' && dateAssigned !== '' && dateReturned !== '' && measurement !== '') {
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
    else{
      window.alert("All details are required to send measurements.");
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter measurement</Text>
      <Text>Machine ID: 1 - thermometer, 2 - glucometer, 3 - BP monitor, 4 - weighing scale, 5 - height machine</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter machine id'
        autoCapitalize='none'
        value={machineid}
        onChangeText={text => setMachineid(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter date assigned in YYYY-MM-DD format'
        value={dateAssigned}
        onChangeText={text => setDateassigned(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter date returned in YYYY-MM-DD format'
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
