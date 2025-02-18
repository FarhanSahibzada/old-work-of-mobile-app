import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import axios from 'axios';
import { AppRoutes } from '../../constant/constant';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('screen');

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [destinationText, setDestinationText] = useState('');
  const [currentLocationText, setCurrentLocationText] = useState('');
  const userData = useSelector((state: RootState) => state.userAuth.userLogin);
  const router = useRouter()

  useEffect(() => {
    const accessLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied");
        }
        const getLocation = await Location.getCurrentPositionAsync();
        setLocation(getLocation);
      } catch (error) {
        console.log("Error getting location:", error);
      }
    };
    accessLocation();
  }, []);

  const confirmRide = async () => {
    if (!currentLocationText || !destinationText) {
      Alert.alert("Empty Input", "Please fill the pickup route and end route", [{ text: "OK" }]);
      return;
    }

    const obj = {
      userID: userData?._id,
      from: currentLocationText,
      to: destinationText,
    };

    try {
      const response = await axios.post(AppRoutes.SendRideData, obj);
      if (response && response.data) {
        const data = response.data.data; 
        console.log(data)
        if(data?.matchedRides.length >0){
          router.push({
            pathname : "/pages/UserHome",
            params : {data : JSON.stringify(data)}
          })
        }else{
          Alert.alert(
            "No Rides Match",
            "please try again"
          )
        }
      }
    } catch (error) {
      console.log("Error sending destination");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: 'white' }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Map Section */}
          <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
            <MapView
              style={{ width: width, height: height * 0.35 }}
              showsCompass={true}
              showsTraffic={true}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 24.8607,
                longitude: 67.0011,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker coordinate={{ latitude: 24.8607, longitude: 67.0011 }} title="Pickup Location" />
            </MapView>
          </View>
          {/* Bottom UI Section */}
          <View style={[styles.bottomContainer]}>
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
                onChangeText={(text) => setDestinationText(text)}/>
            </View>

            {/* Confirm Ride Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={confirmRide}>
              <Text style={styles.confirmText}>Confirm Ride</Text>
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
    marginTop: 4,
    padding: 16,
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
    height: 45,
    marginBottom: 10,
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

