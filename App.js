import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './src/screens/MapScreen'
import MapScreen2 from './src/screens/MapScreen2'
import { Router, Scene } from 'react-native-router-flux';
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="MapScreen2" component={MapScreen2} title="Map Page" hideNavBar={true} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}} headerTintColor='#fff' /> 
          <Scene key="MapScreen" component={MapScreen} title="Search Page" hideNavBar={true} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}} headerTintColor='#fff' />  
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
