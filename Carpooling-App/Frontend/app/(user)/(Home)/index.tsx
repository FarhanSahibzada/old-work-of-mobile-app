import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert,KeyboardAvoidingView, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
const { width } = Dimensions.get('screen')
const { height } = Dimensions.get('screen')

export type locationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [destination, setDestination] = useState<Location.LocationObject | null>(null)
  const [currentLocationText, setCurrentLocationText] = useState('')
  const [destinationText, setDestinationText] = useState('')
  const userData = useSelector((state: RootState) => state.userAuth.userLogin)

  useEffect(() => {
    const accessLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          console.log("permission was access location is denied")
        }
        const getLocation = await Location.getCurrentPositionAsync()
        setLocation(getLocation)
      } catch (error) {
        console.log("error when getting the location", error)
      }
    }
    accessLocation()
  }, [])

  const defaultPickup = {
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  }
  const region = location
    ? {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    : defaultPickup;

  const confirmRide = async () => {
    if (!currentLocationText || !destinationText) {
      Alert.alert(
        "Empty Input ",
        "Please Fill the pickup route and end route",
        [
          {
            text: "ok"
          }
        ]
      )
    }
    const obj = {
      userID: userData?._id,
      from: currentLocationText,
      to: destinationText
    }
    try {
      const response = await axios.post(AppRoutes.SendRideData, obj)
      if(response && response.data){
        console.log(response.data.data)
      }
    } catch (error) {
      console.log("error when sending the destination",)
    }
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'white' }}>
        <View style={styles.container}>
          {/* Map View */}
          <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20, }}>
            <MapView
              style={{
                width: width,
                height: height * 0.35,
              }}
              showsCompass={true}
              showsTraffic={true}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={region}
            >
              <Marker coordinate={defaultPickup} title="Pickup Location" />
              {destination && (
                <Marker coordinate={destination.coords} title="Destination" pinColor="blue" />
              )}
            </MapView>
          </View>

          {/* Bottom UI Section */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.rideButton}>
              <Text style={styles.rideText}>Book a Ride</Text>
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="my-location" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Enter pickup location"
                value={currentLocationText}
                onChangeText={(text) => setCurrentLocationText(text)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="location-on" size={20} color="red" />
              <TextInput
                style={styles.input}
                placeholder="Enter destination"
                onChangeText={(text) => setDestinationText(text)}
              />
            </View>

            {/* Ride Sharing Options */}
            <View style={styles.rideOptions}>
              {/* <TouchableOpacity style={styles.rideButton}>
                <Ionicons name="car-outline" size={24} color="black" />
                <Text style={styles.rideText}>Book a Ride</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity style={styles.rideButton}>
                <Ionicons name="add-circle-outline" size={24} color="black" />
                <Text style={styles.rideText}>Offer a Ride</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rideButton}>
                <Ionicons name="location-outline" size={24} color="black" />
                <Text style={styles.rideText}>Nearby Rides</Text>
              </TouchableOpacity> */}
            </View>

            {/* Confirm Ride Button */}
            <TouchableOpacity style={styles.confirmButton}
              onPress={() => confirmRide()}
            >
              <Text style={styles.confirmText}>Confirm Ride</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View >
    </>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },


  bottomContainer: {
    marginTop: 4,
    padding: 16,
    height: "50%",
    backgroundColor: 'white',
    // elevation: 5,
    borderRadius: 15,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  rideOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 4,
  },

  rideButton: {
    borderRadius: 10,
  },

  rideText: {
    color: "#1E88E5",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
  },

  confirmButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },

  confirmText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});