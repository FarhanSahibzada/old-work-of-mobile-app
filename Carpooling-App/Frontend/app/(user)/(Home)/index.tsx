import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [pickup, setPickup] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
  });

  const [destination, setDestination] = useState({
    latitude: 24.9207,
    longitude: 67.1500,
  });

  return (
    <>
    <View style={{flex : 1 , justifyContent : "center" , alignItems : 'center'}}>
    <View style={styles.container}>
      
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Car Sharing</Text>
        <TouchableOpacity>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40' }} // Replace with user image URL
            style={styles.userImage} 
          />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: pickup.latitude,
          longitude: pickup.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={pickup} title="Pickup Location" />
        <Marker coordinate={destination} title="Destination" pinColor="blue" />
      </MapView>

      {/* Bottom UI Section */}
      <View style={styles.bottomContainer}>
        
        {/* Pickup Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="my-location" size={20} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Enter pickup location"
            onChangeText={(text) => setPickup({ ...pickup, latitude: parseFloat(text) })}
          />
        </View>

        {/* Destination Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="location-on" size={20} color="red" />
          <TextInput
            style={styles.input}
            placeholder="Enter destination"
            onChangeText={(text) => setDestination({ ...destination, latitude: parseFloat(text) })}
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
            <Text style={styles.rideText}>Offer a Ride</Text>
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
    </View>
    </>
  );
}
 
  
const styles = StyleSheet.create({
  container: { flex: 1 },

  navbar: {
    height: 60,
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  menuButton: {
    padding: 5,
  },

  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  map: { flex: 1 },

  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
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
    justifyContent: 'space-around',
    marginTop: 10,
  },

  rideButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },

  rideText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  confirmButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },

  confirmText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
