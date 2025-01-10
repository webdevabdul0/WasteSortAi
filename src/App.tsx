import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroScreen from './screens/IntroScreen';
import CameraScreen from './screens/CameraScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerTransparent: true, // Makes the header background transparent
          headerTitleAlign: 'center', // Centers the header title
          headerTintColor: '#FFFFFF', // White text color
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{title: 'Welcome Back'}}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
