import React, { useState, createContext, useContext, useEffect } from 'react';
import { Flatlist, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { signOut } from 'firebase/auth';

import { auth } from '../config/firebase';
import { render } from 'react-dom';
import { onAuthStateChanged } from 'firebase/auth';

const AuthenticatedUserContext = createContext({});
//Creating an auth provider - this provider allows screen components to access the current user in the app.
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export default function HomeScreen( {navigation} ) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [role, setRole] = useState(1);
  const [userdata, setUserdata] = useState({});
  const [patientsdata, setPatientsdata] = useState([]);
  const [doctorsdata, setDoctorsdata] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber ie handles the user's logged in state changes
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        if (authenticatedUser == null) {
          return;
        }
        const userId = authenticatedUser["uid"];
        const userdata = {userId};
        setUid(userdata["userId"]);
        fetch('http://ec2-52-200-233-118.compute-1.amazonaws.com/user/get_user/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata)
          }).then(res => {
            return res.json();
          }).then(data => {
            setUserdata(data);
            setRole(data["role"]);
            fetch('http://ec2-52-200-233-118.compute-1.amazonaws.com/user/get_doctors/',{
              method: 'GET'
            }).then(res => {
              return res.json();
            }).then(data => {
              setDoctorsdata(data);
            })
            fetch('http://ec2-52-200-233-118.compute-1.amazonaws.com/user/get_patients/',{
              method: 'GET'
            }).then(res => {
              return res.json();
            }).then(data => {
              setPatientsdata(data);
            })
          })
          .catch(err => {
            console.log(err.message);
          })
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  

  const onSignOut = () => {
      console.log('logout')
      signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  var patientloop = [];

  for (let i = 0; i < doctorsdata.length; i++) {
    const doctor = doctorsdata[i]
    patientloop.push(
      <View key={i}>
      <h4>{i+1}. Dr. {doctor.first_name} {doctor.last_name}</h4>
      <Button
        onPress={() => navigation.navigate('Chat', {myID:uid, otherID:doctor.id, myRole:role})}
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
            onPress={() => navigation.navigate('Device',{patient_id: uid})}
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
      <h4>{i+1}. {patient.first_name} {patient.last_name}</h4>
      <Button
          onPress={() => navigation.navigate('ViewMeasurements', {measurementData: patient.measurements})}
          title='View health measurements'
          color='#f57c00'
      />
      <Button
        onPress={() => navigation.navigate('Chat', {myID: uid, otherID: patient.id, myRole:role})}
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
