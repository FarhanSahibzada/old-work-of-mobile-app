import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Drivelist from '@/components/Drivelist';
import { Entypo } from '@expo/vector-icons';

export type driverTrips = {
    name : string;
    rating : number;
    lastDrive : string,
    date : string
}

export default function DriverScreen() {
    const [drives , setDrives] = useState<Array<driverTrips>>([]);
       
      const driverData: driverTrips[] = [
        {
          name: 'Farhan',
          rating: 5,
          lastDrive: '2025-02-13',
          date: '2025-02-13',
        },
        {
          name: 'Ali',
          rating: 4.7,
          lastDrive: '2025-02-12',
          date: '2025-02-12',
        },
        {
          name: 'Sara',
          rating: 4.9,
          lastDrive: '2025-02-10',
          date: '2025-02-11',
        },
        {
          name: 'Hassan',
          rating: 4.2,
          lastDrive: '2025-02-08',
          date: '2025-02-09',
        },
        {
          name: 'Ayesha',
          rating: 4.8,
          lastDrive: '2025-02-07',
          date: '2025-02-07',
        },
      ];

      
      useEffect(()=>{
        setDrives(driverData)
      } ,[])
    return (
    <>
    <Stack.Screen  options={{ headerShown : false}}/>
    <View style={styles.mainContainer}>
      <View style={styles.container1}>
        <Image source={{ uri : 'https://t4.ftcdn.net/jpg/02/79/99/21/360_F_279992144_3GWh4mLIPBacjzlYNc6kZbz2F3KpKOeE.jpg' }}  style={styles.image1} />
      <View style={styles.container1Child}>
        <Text style={styles.text2} >Hi' This is Farhan</Text>
        <View style={{flexDirection : "row" , flex : 1 , marginTop: 4 }}>{[1,2,3,4,5].map((item)=>(
            <TouchableOpacity key={item}>     
            <Entypo name='star' size={22} color={'yellow'}/>          
            </TouchableOpacity>
        ))}</View>
      </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.text1}> My Recent <Text style={styles.text1Child}> Drives </Text> </Text>
      </View>
      {drives ? <Drivelist tripsData={drives} /> : null}
    </View>
    </>
  )
}


const styles = StyleSheet.create({
    mainContainer : {flex : 1 , flexDirection :'column', width : '100%'},
    container1 : {position : "relative"},
    image1 :{flexBasis : '50%', objectFit : "cover" , borderRadius : 30},
    container1Child : { position: 'absolute',
        top: '70%',
        left: '40%',
        transform: [{ translateX: -100 }, { translateY: -20 }],
        width: '80%',
        alignItems: 'center' },

    text2 : {   width : '100%',
        paddingVertical: 15,
        backgroundColor : "#FF9D23",
        fontWeight : "800",
        borderRadius : 40,
        textAlign: 'center',
        color: 'white',
        fontSize: 20 },
    
    container2 : {paddingHorizontal : 10 , paddingTop : 10},
    text1 : {fontSize : 18 , fontWeight :'600' , color : "#A94A4A"},
    text1Child : {fontSize : 18 , fontWeight : '800',  }
})