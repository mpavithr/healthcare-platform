import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
//after navigation container put this //{user ? <ChatStack /> : <AuthStack />}
import { auth } from './config/firebase';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Homescreen from './screens/Homescreen';
import Device from './screens/Device';
import ViewMeasurements from './screens/ViewMeasurements';

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homescreen" component={Homescreen}/>
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='Device' component={Device} />
      <Stack.Screen name='ViewMeasurements' component={ViewMeasurements}/>
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homescreen" component={Homescreen}/>
      {/* <Stack.Screen name='Chat' component={Chat} /> */}
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

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

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  //useEffect is a hook 
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber ie handles the user's logged in state changes
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
