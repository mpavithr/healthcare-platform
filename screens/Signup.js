import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebase';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState(0);
  const [isPending, setIsPending] = useState('false');
  const [uid, setUID] = useState(''); 

  const onHandleSignup = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)==false){
      window.alert('Enter valid email address')
    }
    else if(role!=1 && role!=2){
      window.alert('Please enter a valid role')
    }
    else if(password.length < 6){
      window.alert('Password has to be atleast 6 characters.')
    }
    else if (email !== '' && password !== '' && firstname !== '' && lastname !== '' && role !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          setUID(response['user']['uid']);
          const userId = response["user"]["uid"];
          const userdata = {userId, firstname, lastname, email, role};
          setIsPending('true');
          fetch('http://ec2-52-200-233-118.compute-1.amazonaws.com/user/create_user/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata)
          }).then(res => {
            console.log(res);
            return res.json();
          }).then(data => {
            console.log(data);
          })
          .catch(err => {
            window.alert(err.message);
          })
        })
        .catch(err =>  window.alert(err.message));
    }
    else{
      window.alert("All details are required to sign up");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter first name'
        autoCapitalize='none'
        textContentType='givenName'
        value={firstname}
        onChangeText={text => setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter last name'
        autoCapitalize='none'
        textContentType='familyName'
        value={lastname}
        onChangeText={text => setLastname(text)}
      />
      <Text>Enter role (1 if patient, 2 if doctor)</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter role (1 if patient, 2 if doctor)'
        autoCapitalize='none'
        textContentType='none'
        value={role}
        onChangeText={text => setRole(text)}
      />
      <Button onPress={onHandleSignup} color='#f57c00' title='Signup' />
  
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
