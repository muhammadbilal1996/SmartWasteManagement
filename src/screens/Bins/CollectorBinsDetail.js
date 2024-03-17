import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import BinComponent from './component/BinComponent';
import WasteBin from './ViewBins';
import Header from '../../components/Header';
import NoBinAssigned from '../../components/NoBinAssigned';

const CollectorBinsDetail = ({navigation,route}) => {
  const {binsData} = route.params;

  return (
    <View style={styles.mainContainer}>
      <Header title={'Bins Status'} />
      {binsData ?
      <>
      <WasteBin percentage={binsData.binPercentage} />
      
       
     { binsData   && <BinComponent
              key={binsData?.binId}
              binsData={binsData}
              navigation={navigation}
            />}
          
      </>
      : <NoBinAssigned/>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  menu: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  map: {
    height: 150,
    width: '100%',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  itemDetails: {
    fontSize: 14,
    color: 'black',
  },
});

export default CollectorBinsDetail;
