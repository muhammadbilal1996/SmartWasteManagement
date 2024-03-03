
import React, { useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';


const App = () =>{
  useEffect(()=>{
    database()
    .ref('/users')
    .set({
      name: 'Ada Lovelace',
      age: 31,
    })
    .then(() => console.log('Data set.'));

  },[])

  return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <Text style={{color:'black'}}>Hello World</Text>
        </View>
  );

}


export default App;
