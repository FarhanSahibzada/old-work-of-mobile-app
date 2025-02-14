import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { driverTrips } from '@/app/pages/DriverScreen'
import { MaterialIcons , AntDesign, Entypo } from '@expo/vector-icons'

type child = {
    trips : driverTrips
}

const Driverlistitem = ({ trips }: child) => {
    return (
        <View
        style={ styles.mainContainer}
    >
        <View style={{ width: 60, height: "100%" , justifyContent: "center", alignItems: "center", borderRadius: 40 }}>
            <Image  source={{uri : 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'}} 
            style={{width : 50 , height : 50 , borderRadius : 40 ,}}
            />
        </View>
        <View style={{ flex: 1 }}>
            <Text
                numberOfLines={2}
                style={{
                    fontSize: 18, marginBottom: 3,
                    fontFamily: "raleway-bold",
                    fontWeight: "600"
                }}
            >
                {trips.name}
            </Text>
            <View style={{display : "flex" , alignItems: "center" ,  flexDirection : 'row', marginBottom : 5  }}>
                <Entypo name="location" size={17} color="#C1BAA1" />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: '#C1BAA1',
                    marginLeft :6 ,
                }}
                    numberOfLines={1}>
                    {trips.rating}
                </Text>
            </View>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    flexDirection: "row",
                }}
            >
                <AntDesign name="star" size={20} color='#FCC737' />
                <Text style={{fontFamily : "railway-bold" , fontWeight : "700" , color:"#FCC737"}}>
                    {trips.lastDrive}
                </Text>
            </View>

        </View>
        <View>
            <View style={{
                borderWidth: 0.3,
                marginTop: 10,
                borderColor: "#E5E3D4"
            }}></View>
        </View>

    </View>
    )
}

export default Driverlistitem

const styles = StyleSheet.create({
mainContainer : {    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 6,
    marginTop: 10,
    borderRadius: 20,
    width: "100%",
    height: 100,
    backgroundColor: "#F1F0E8",
    elevation: 4,}
})