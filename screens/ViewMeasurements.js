import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import { signOut } from 'firebase/auth';

import { auth } from '../config/firebase';
import { render } from 'react-dom';

export default function ViewMeasurements( {navigation} ) {
    const onSignOut = () => {
        console.log('logout')
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };
    return (
      <View style={styles.container}>
          <Text>Measurements of Patient</Text>
          <Button
            onPress={onSignOut}
            title='Logout'
          />
        </View>
  
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});