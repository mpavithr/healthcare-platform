import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import { signOut } from 'firebase/auth';

import { auth } from '../config/firebase';
import { render } from 'react-dom';
//API call to get device of that particular patient
export default function ViewMeasurements( { route, navigation} ) {
    const { measurementData } = route.params;
    const onSignOut = () => {
        console.log('logout')
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    var myloop = [];

    for (let i = 0; i < measurementData.length; i++) {
      const measurementUnit = measurementData[i]
      myloop.push(
        <View key={i}>
        <h7>{i+1}. Machine ID: {measurementUnit.machine_id}, Date Assigned: {measurementUnit.date_assigned}, Date Returned: {measurementUnit.date_returned}, Measurement: {measurementUnit.measurement}</h7>
        </View>
      );
    }
    return (
      <View style={styles.container}>
          <h3 align='center'>Patient's self measurement records</h3>
          <h4>Machine ID: 1 - thermometer, 2 - glucometer, 3 - BP monitor, 4 - weighing scale, 5 - height machine</h4>
          { myloop }
          <View style={styles.space} /> 
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