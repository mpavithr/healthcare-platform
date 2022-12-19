import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUID] = useState('');

  const onHandleLogin = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)==false){
      /*
      Alert.alert(
        "Enter valid email address",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
        )
      */
     window.alert('Enter valid email address');
    }
    else if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) =>{
          setUID(response['user']['uid']);
          const userId = response["user"]["uid"];
          const userdata = {userId};
          fetch('http://ec2-52-200-233-118.compute-1.amazonaws.com/user/get_user/',{
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
            window.alert(err.message);
          })
        })
        .catch(err =>  window.alert(err.message));
      
      
    }
    else{
      window.alert("Enter your login credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Patient Monitoring App!</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
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
      <Button onPress={onHandleLogin} color='#f57c00' title='Login' />
      <Button
        onPress={() => navigation.navigate('Signup')}
        title='Go to Signup'
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
