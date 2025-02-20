import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import { useRouter } from "expo-router";
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('screen');

export default function HomeScreen() {
  const [pickupLocation, setPicupLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [destinationText, setDestinationText] = useState('');
  const [currentLocationText, setCurrentLocationText] = useState('');
  const userData = useSelector((state: RootState) => state.userAuth.userLogin);
  const [seats, setSeats] = useState('');
  const [fare, setFare] = useState('');
  const [centerPoint , setCenterPoint] = useState<{ latitude: number, longitude: number }[]>([])
  const ApiKey = process.env.EXPO_PUBLIC_API_KEY;
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const accessLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied");
        }
        const getLocation = await Location.getCurrentPositionAsync();
        setCurrentLocation(getLocation);
      } catch (error) {
        console.log("Error getting location:", error);
      }
    };
    accessLocation();
  }, []);

  useEffect(() => {
    if (pickupLocation && mapRef.current) {
      const newRegion = {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  }, [pickupLocation]);

  const confirmRide = async () => {
    if (!currentLocationText || !destinationText) {
      Alert.alert("Empty Input", "Please fill the pickup route and end route", [{ text: "OK" }]);
      return;
    }

    try {
      const pickupGeo = await Location.geocodeAsync(currentLocationText);
      const destinationGeo = await Location.geocodeAsync(destinationText);
      if (pickupGeo.length > 0) {
        setPicupLocation({
          latitude: pickupGeo[0].latitude,
          longitude: pickupGeo[0].longitude
        });
      }
      if (destinationGeo.length > 0) {
        setDestinationLocation({
          latitude: destinationGeo[0].latitude,
          longitude: destinationGeo[0].longitude
        });
      }
    } catch (error) {
      console.log("error when getting the location", error);
    }
  };

  const SearchRide = async () => {
    const obj = {
      userID: userData?._id,
      from: currentLocationText,
      to: destinationText,
      availableSeats: seats,
      fairPerSeat: fare,
      routes : centerPoint
    };

    try {
      const response = await axios.post(AppRoutes.SendRideShare, obj);
      if (response && response.data) {
        const data = response.data.data;
        if (data?.matchedRides.length > 0) {
          // Handle matched rides
        } else {
          Alert.alert("No Rides Match", "please try again");
        }
      }
    } catch (error) {
      console.log("Error sending destination");
    }
  };

  useEffect(() => {
    if (currentLocationText === "" || destinationText === "") {
      setPicupLocation(null);
      setDestinationLocation(null);
    }
  }, [currentLocationText, destinationText]);

  const handleDirectionsBetween =(result : any)=>{
    if(result.coordinates.length >=5){
      const betweenSpace = Math.floor(result.coordinates.length / 5)
     const betweenPoint = [
      result.coordinates[betweenSpace],
      result.coordinates[betweenSpace * 2],
      result.coordinates[betweenSpace * 3],
      result.coordinates[betweenSpace * 4]
      ]
      setCenterPoint(betweenPoint)
      console.log("4 betweenPoint Coordinates:", betweenPoint);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Map Section */}
          <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
            <MapView
              style={{ width: width, height: height * 0.6 }} // 60% height
              ref={mapRef}
              showsCompass={true}
              showsTraffic={true}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={region}
            >
              {pickupLocation && (
                <Marker
                  coordinate={pickupLocation}
                  title="Pickup Location"
                  description="This is your pickup location"
                  pinColor="blue"
                />
              )}

              {destinationLocation && (
                <Marker
                  coordinate={destinationLocation}
                  title="Destination"
                  description="This is your destination location"
                  pinColor="red"
                />
              )}

              {pickupLocation && destinationLocation && (
                <MapViewDirections
                  origin={pickupLocation}
                  destination={destinationLocation}
                  apikey={ApiKey}
                  strokeWidth={4}
                  strokeColor="blue"
                  onReady={handleDirectionsBetween}
                />
              )}
            </MapView>
          </View>

          {/* Bottom UI Section */}
          <View style={[styles.bottomContainer, { height: height * 0.4 }]}>
            <TouchableOpacity style={styles.rideButton}>
              <Text style={styles.rideText}>Ride Share</Text>
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

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={styles.inputWrapperB}>
                <MaterialIcons name="chair" size={20} color="#1E88E5" />
                <TextInput
                  placeholder="Number of Seats Available"
                  keyboardType="numeric"
                  value={seats}
                  onChangeText={setSeats}
                />
              </View>
              <View style={styles.inputWrapperB}>
                <MaterialIcons name="attach-money" size={20} color="red" />
                <TextInput
                  placeholder="Fare Amount"
                  keyboardType="numeric"
                  value={fare}
                  onChangeText={setFare}
                />
              </View>
            </View>

            {/* Confirm Ride Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={pickupLocation && destinationLocation ? SearchRide : confirmRide}>
              <Text style={styles.confirmText}>
                {pickupLocation && destinationLocation ? "Search Rider" : "Confirm Ride"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 39,
    marginBottom: 7,
  },
  inputWrapperB: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 39,
    marginBottom: 7,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  rideButton: {
    borderRadius: 10,
  },
  rideText: {
    color: "#1E88E5",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 1,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});