import React from 'react';
import {View, Text,Image} from "react-native";

const NoBinAssigned = () => {
 
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
                  source={ require('../assets/images/empty_bin.png') }
                  style={{width: 100, height: 100,bottom:30}}
                />
        <Text style={{fontSize:18,marginBottom:50,fontWeight:'600'}}>No Bin Assigned</Text>
        </View>
    );
}

export default NoBinAssigned;