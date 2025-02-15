import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Geocoder from "react-native-geocoding";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";


Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_API_KEY!);
export default function HomeScreen() {
  const [pickup, setPickup] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
  });
  const [destination, setDestination] = useState({
    latitude: 24.8605,
    longitude: 67.021,
  });

  const handleLocationSelect = async (
    address: string,
    type: "pickup" | "destination"
  ) => {
    try {
      const response = await Geocoder.from(address);
      const location = response.results[0].geometry.location;

      if (type === "pickup") {
        setPickup({ latitude: location.lat, longitude: location.lng });
      } else {
        setDestination({ latitude: location.lat, longitude: location.lng });
      }
    } catch (error) {
      console.error("Location not found", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Car Pooling</Text>
        <TouchableOpacity>
                <Ionicons name="person-circle-outline" size={30} color="white" />
                </TouchableOpacity>
      </View>
      {/* Map View */}
      <MapView
        style={styles.map}
        region={{
          latitude: pickup.latitude,
          longitude: pickup.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        >
        {/* <MapViewDirections
          origin={pickup}
          destination={destination}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
          strokeColor="red"
          strokeWidth={3}
          onError={(e) => console.log(e)}
          /> */}
        {/* Map polyline */}
        <Polyline
          coordinates={[
            { latitude: 24.8607, longitude: 67.0011 },
            { latitude: 24.8605, longitude: 67.021 },
          ]}
          strokeColor="red"
          strokeColors={['#B24112',]}
          strokeWidth={4}
        />
        <Marker coordinate={pickup} title="Pickup Location" />
        <Marker coordinate={destination} title="Destination" pinColor="blue" />
      </MapView>

      {/* Bottom UI Section */}
      <View style={styles.bottomContainer}>
        {/* Pickup Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="my-location" size={20} color="gray" />
          <GooglePlacesAutocomplete
            placeholder="Enter pickup location"
            onPress={(data) => handleLocationSelect(data.description, "pickup")}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
              language: "en",
            }}
            styles={{
              textInput: styles.input,
            }}
          />
        </View>

        {/* Destination Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="location-on" size={20} color="red" />
          <GooglePlacesAutocomplete
            placeholder="Enter destination"
            onPress={(data) =>
              handleLocationSelect(data.description, "destination")
            }
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
              language: "en",
            }}
            styles={{
              textInput: styles.input,
            }}
          />
        </View>

        {/* Ride Sharing Options */}
        <View style={styles.rideOptions}>
          <TouchableOpacity style={styles.rideButton}>
            <Ionicons name="car-outline" size={24} color="black" />
            <Text style={styles.rideText}>Book a Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rideButton}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
            <Text style={styles.rideText}>Offer Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rideButton}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Text style={styles.rideText}>Nearby Rides</Text>
          </TouchableOpacity>
        </View>
        {/* Confirm Ride Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Search for Rides</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  navbar: {
    height: 70,
    backgroundColor: "#1E88E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  menuButton: {
    padding: 5,
  },

  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  map: { flex: 1 },

  bottomContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  rideButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },

  rideText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },

  confirmButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  confirmText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
