import React from 'react';
import Header from '../../components/Header';
import { View, ScrollView } from 'react-native';
import RideCard from '../../components/RideCard';
import { RootState } from '../../Store/Store';

const rideData = [
  {
    driverName: 'Bilal Ahmed',
    driverImage:
      'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
    vehicleNumber: 'XYZ 1234',
    categoryType: 'Honda Civic',
    gender: 'Male',
    startLocation: 'Gulshan-e-Iqbal',
    endLocation: 'Saddar',
    fare: 2000,
    time: '10:30 AM',
  },
  {
    driverName: 'Ahmed Khan',
    driverImage:
      'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
    vehicleNumber: 'ABC 5678',
    categoryType: 'Toyota Corolla',
    gender: 'Male',
    startLocation: 'Nazimabad',
    endLocation: 'Clifton',
    fare: 1500,
    time: '11:15 AM',
  },
  {
    driverName: 'Ayesha Baloch',
    driverImage:
      'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
    vehicleNumber: 'LMN 9090',
    categoryType: 'Suzuki Alto',
    gender: 'Female',
    startLocation: 'Malir',
    endLocation: 'Defence',
    fare: 1800,
    time: '12:00 PM',
  },
];


function UserHome() {


  const genderVarify = "Male";

  const filterRide = rideData.filter((userGender)=> userGender.gender === genderVarify)

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <Header />
      <ScrollView>
        {filterRide.map((ride, index) => (
          <RideCard
            key={index}
            driverName={ride.driverName}
            driverImage={ride.driverImage}
            vehicleNumber={ride.vehicleNumber}
            categoryType={ride.categoryType}
            gender={ride.gender}
            startLocation={ride.startLocation}
            endLocation={ride.endLocation}
            fare={ride.fare}
            seatsAvailable={4}
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
