import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { driverTrips } from '../app/pages/DriverScreen'
import Driverlistitem from './Driverlistitem'

type driverlistprops = {
    tripsData : Array<driverTrips>
}

export default function Drivelist({tripsData } :driverlistprops ) {

    return (
    <View>
     <FlatList
            style={{paddingBottom : 20}}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{display : 'flex' , justifyContent : "center" , alignItems : "center" , paddingTop : 50}}>
                        <Text style={{flex : 1 , fontWeight : "600" , color : "blue" , fontSize : 22  }}>No Drives found</Text>
                    </View>
                }
                data={tripsData}
                renderItem={({ item, index }) => (
                    <TouchableOpacity  > 
                    <Driverlistitem trips={item} />
                    </TouchableOpacity>
                )}
            />
    </View>
  )
}