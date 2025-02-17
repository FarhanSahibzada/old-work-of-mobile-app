import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import MapView, { MapPolyline, Marker } from "react-native-maps";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";

export default function RiderScreen() {
  const [pickup, setPickup] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
  });
  const [destination, setDestination] = useState({
    latitude: 24.8605,
    longitude: 67.021,
 });
  const [seats, setSeats] = useState(null);
  const [fare, setFare] = useState(""); 
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Car Sharing</Text>
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
        <MapViewDirections
          origin={pickup}
          destination={destination} 
          apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
          strokeColor="red"
          strokeWidth={4}
        />
         {/* Map polyline */}
         <MapPolyline
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

      {/* Ride Details */}
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Starting Point"
          value={pickup}
          onChangeText={setPickup}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination Point"
          value={destination}
          onChangeText={setDestination}
        />
        <View style={{ flexDirection:"row",justifyContent:"space-between"}}>
        <TextInput
          style={styles.input}
          placeholder="Number of Seats Available"
          keyboardType="numeric"
          value={seats}
          onChangeText={setSeats}
        />  
        <TextInput
          style={styles.input}
          placeholder="Fare Amount"
          keyboardType="numeric"
          value={fare}
          onChangeText={setFare}
        />
        </View>
        <TouchableOpacity style={styles.addRideButton}>
          <Text style={styles.addRideText}>Add Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

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

  bottomContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addRideButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addRideText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
