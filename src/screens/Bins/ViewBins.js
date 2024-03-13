import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import Division from './component/Division';

const WasteBin = ({percentage}) => {
  const [lidOpen, setLidOpen] = useState(false);
  const [lidAngle] = useState(new Animated.Value(0));

  // Calculate the height of the filled part of the bin based on the percentage
  const fillHeight = percentage * 2; // Adjust this factor according to your design

  // Animate lid opening or closing based on the percentage filled
  useEffect(() => {
    Animated.timing(lidAngle, {
      toValue: lidOpen ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [percentage, lidOpen]);


  useEffect(() => {
    // Toggle lid automatically every 3 seconds
    const timer = setTimeout(() => {
      setLidOpen(!lidOpen);
    }, 3000);

    return () => clearTimeout(timer);
  }, [lidOpen]);

  // Calculate lid rotation angle based on lidOpen state
  const lidRotation = lidAngle.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '60deg'],
  });

  return (
    <View style={styles.container}>
       <Division
      
      text={`${percentage}% Filled`}/>
      <TouchableOpacity
      disabled={true}
      onPress={() => setLidOpen(!lidOpen)}>
      <Animated.View style={[styles.binLid, { transform: [{ rotate: lidRotation }] }]} />

        <View style={styles.bin}>
          {/* Bin lid */}
          {/* Bin body */}
          <View style={styles.binBody}>
            {/* Filled part */}
            <Animated.View style={[styles.binFill, { height: fillHeight,backgroundColor:percentage>70&&percentage<80  ? 'yellow' :percentage>80 ? 'red' :'green'}]} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
  },
  bin: {
    position: 'relative',
    width:150,
    height: 180,
    left:10,
    marginTop:100,
    backgroundColor: '#D3D3D3',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,

    overflow: 'hidden',
  },
  binBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D3D3D3',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  binFill: {
    backgroundColor: 'green',
  },
  binLid: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 15,
    height: 30,
    width:170,
   // borderWidth:1,
    //borderColor:'#000000',
    backgroundColor: '#D3D3D3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  percentageText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WasteBin;