import React, { memo } from "react";
import {Text, View, StyleSheet} from 'react-native';


const Divison = ({text,left}) => {

    return (
      <View style={{...styles.view,left:left}}>
        <View style={{...styles.subView}} />
        <Text style={{...styles.text,}}>{text}</Text>
        <View style={{...styles.subView,}} />
      </View>
    );
  };

  
  export default memo(Divison)

  const styles =StyleSheet.create({
    view : {position: 'absolute',top:70,right:230, justifyContent: 'center', alignItems: 'center'},
    subView:{height: 50, width: 1,backgroundColor:'#000000',paddingBottom:20,},
    text:{fontSize: 28,  marginVertical: 55, transform: [{rotate: '270deg'}]}


  })