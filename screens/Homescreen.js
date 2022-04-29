import React, { useState, useEffect } from 'react';
import { Flatlist, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { signOut } from 'firebase/auth';

import { auth } from '../config/firebase';
import { render } from 'react-dom';

export default function HomeScreen( {navigation} ) {
  const [role, setRole] = useState(1);
  const [userdata, setUserdata] = useState({});
  const [patientsdata, setPatientsdata] = useState([]);
  const [doctorsdata, setDoctorsdata] = useState([]);
  /*
  useEffect(()=> {
    const url = "https://randomuser.me/api/?results=15";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json['results']))
      .catch((error) => console.log(error));
  },[]);
  */
  useEffect(() => {
    setUserdata({
      "primary_key": 8,
      "role": 1,
      "firstname": "John",
      "lastname": "Smith"
    })
    setRole(userdata["role"]);
    //setRole(1);
  },[role]);
  //API Call to get list of all doctors
  useEffect(() => {
    const drdata = [
      {
        "primary_key": 8,
        "firstname": "Ned",
        "lastname": "Stark"
      },
      {
        "primary_key": 9,
        "firstname": "Arya",
        "lastname": "Stark"
      },
      {
        "primary_key": 10,
        "firstname": "Ryle",
        "lastname": "Kinkaid"
      }
    ]
    setDoctorsdata(drdata);
  },[doctorsdata]);
  //API Call to get list of all patients
  useEffect(() => {
    const pdata = [
      {
        "primary_key": 4,
        "firstname": "Jaime",
        "lastname": "Lannister"
      },
      {
        "primary_key": 5,
        "firstname": "Lily",
        "lastname": "Bloom"
      },
      {
        "primary_key": 6,
        "firstname": "Sonmi",
        "lastname": "451"
      }
    ]
    setPatientsdata(pdata);
  },[patientsdata]);
  //to sign out
  const onSignOut = () => {
      console.log('logout')
      signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  var patientloop = [];

  for (let i = 0; i < doctorsdata.length; i++) {
    const doctor = doctorsdata[i]
    patientloop.push(
      <View key={i}>
      <h4>{i+1}. {doctor.firstname} {doctor.lastname}</h4>
      <Button
        onPress={() => navigation.navigate('Chat')}
        title='Chat'
      />
      </View>
    );
  }
  if (role === 1){
    return (
      <View style={styles.container}>
          <h1 align='center'>Welcome to your home page, patient!</h1>
          <h3 align='center'>Chat with the doctor of your choice at any time!</h3>
          { patientloop }
          <View style={styles.space} /> 
          <h3 align='center'>Record your measurements</h3>
          <Button
            onPress={() => navigation.navigate('Device')}
            title='Device'
            color='#f57c00'
          />
          <View style={styles.space} />
          <h3 align='center'>Get better soon :)</h3> 
          <Button
            onPress={onSignOut}
            title='Logout'
          />
        </View>
  
    );
  }
  
  var myloop = [];

  for (let i = 0; i < patientsdata.length; i++) {
    const patient = patientsdata[i]
    myloop.push(
      <View key={i}>
      <h4>{i+1}. {patient.firstname} {patient.lastname}</h4>
      <Button
          onPress={() => navigation.navigate('ViewMeasurements')}
          title='View health measurements'
          color='#f57c00'
      />
      <Button
        onPress={() => navigation.navigate('Chat')}
        title='Chat with this patient'
      />
      </View>
    );
  }
  return (
    <View style={styles.container}>
        <h1 align='center'>Welcome to your home page, doctor!</h1>
        <h3 align='center'>Here are the patients</h3>
        { myloop }
        <View style={styles.space} /> 
        <h3 align='center'>Help patients outside the clinic :)</h3>
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
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});
