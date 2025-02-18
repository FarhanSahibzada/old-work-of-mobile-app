import React from 'react';
import Header from '../../components/Header';
import { View, ScrollView } from 'react-native';
import RideCard from '../../components/RideCard';
import { RootState } from '../../Store/Store';
import { useLocalSearchParams } from 'expo-router';


function UserHome() {
   const { data }  = useLocalSearchParams()
   const rideData = typeof data === "string" ? JSON.parse(data) : [];
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <Header />
      <ScrollView>
         {rideData?.matchedRides.map((ride, index) => (
          <RideCard
            key={index}
            name={ride.name}
            profileImage={ride.profileImage}
            vehicleNo={ride.vehicleNo}
            vehicleCategory={ride.vehicleCategory}
            gender={ride.gender}
            startLocation={rideData?.rideExpense?.from}
            endLocation={rideData?.rideExpense?.to}
            fare={rideData?.rideExpense?.expense}
            seatsAvailable={2}
            price={ride.fare} 
            time={ride.time} 
            onRideSelect={() => console.log(`${ride.driverName}'s ride selected`)}
          />
        ))} 
      </ScrollView>
    </View>
  );
}

export default UserHome;
