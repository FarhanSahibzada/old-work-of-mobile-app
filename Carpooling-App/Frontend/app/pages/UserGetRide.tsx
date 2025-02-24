import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';

const ApiKey = process.env.EXPO_PUBLIC_API_KEY; // Google API Key

interface RiderData {
    profile: string;
    name: string;
    seats: number;
    fare: number;
    location: {
        latitude: number;
        longitude: number;
    };
}

const UserGetRide = () => {
    const [myLocation, setMyLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [riderData, setRiderData] = useState<RiderData | null>(null);
    const [riders, setRiders] = useState<RiderData[]>([
        {
            profile: "https://example.com/profile1.jpg",
            name: "Ahmed Khan",
            seats: 4,
            fare: 500,
            location: {
                latitude: 24.8607,
                longitude: 67.0011
            }
        },
        {
            profile: "https://example.com/profile2.jpg",
            name: "Ali Raza",
            seats: 3,
            fare: 450,
            location: {
                latitude: 24.8717,
                longitude: 67.0305
            }
        },
        {
            profile: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
            name: "Usman Malik",
            seats: 2,
            fare: 600,
            location: {
                latitude: 24.8800,
                longitude: 67.0400
            }
        }
    ]);

    console.log("current location=>",myLocation);
    // console.log("rider loaction=>",riderData?.location);
    console.log("rider loaction=>",riders[0].location);
    
    const mapRef = useRef<MapView>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        _getUserLocation();
        _fetchRiderData();

        const interval = setInterval(_fetchRiderLocation, 5000);
        return () => clearInterval(interval);
    }, []);

    const _getUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.warn("Location permission denied!");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(location.coords);
        } catch (error) {
            console.warn("Error fetching location:", error);
        }
    };

    const _fetchRiderData = async () => {
        try {
            const response = await axios.get("https://api.example.com/rider"); // Replace with actual API
            setRiderData(response.data);
            setLoading(false);
        } catch (error) {
            console.warn("Error fetching rider data:", error);
            setLoading(false);
        }
    };

    const _fetchRiderLocation = async () => {
        try {
            const response = await axios.get("https://api.example.com/rider/location"); // Replace with actual API
            if (response.data.latitude && response.data.longitude) {
                setRiderData(prevData => prevData ? { ...prevData, location: response.data } : null);
                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        latitude: response.data.latitude,
                        longitude: response.data.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    });
                }
            }
        } catch (error) {
            console.warn("Error updating rider location:", error);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: myLocation?.latitude || 24.8607,
                    longitude: myLocation?.longitude || 67.0011,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                provider="google"
            >
                {myLocation && (
                    <Marker
                        coordinate={myLocation}
                        title="Your Location"
                        description="You are here"
                        pinColor="blue"
                    />
                )}
                {riders[0].location && (
                    <Marker
                        coordinate={riders[0].location}
                        title="Rider Location"
                        description="Rider is moving..."
                        pinColor="red"
                    >
                        <View style={{ alignItems: "center" }}>
    <MaterialIcons name="two-wheeler" size={50} color="red" />
  </View>
                    </Marker>
                )}
                  {myLocation && riders[0].location && (
                <MapViewDirections
                  origin={myLocation}
                  destination={riders[0].location }
                  apikey={ApiKey}
                  strokeWidth={4}
                  strokeColor="blue"
                />
              )}
            </MapView>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="blue" />
                    <Text>Loading...</Text>
                </View>
            )}

            {riderData && (
                <View style={styles.riderCard}>
                    <Image source={{ uri: riderData.profile }} style={styles.profileImage} />
                    <View style={styles.riderInfo}>
                        <Text style={styles.riderName}>{riderData.name}</Text>
                        <Text>Seats: {riderData.seats}</Text>
                        <Text>Fare: {riderData.fare} PKR</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button title="Start Ride" color="green" onPress={() => console.log("Ride Started")} />
                        <Button title="Cancel Ride" color="red" onPress={() => console.log("Ride Cancelled")} />
                    </View>
                </View>
            )}
            {riders.map((rider, index) => (
    <View key={index} style={styles.riderCard}>
        <Image source={{ uri: rider.profile }} style={styles.profileImage} />
        <View style={styles.riderInfo}>
            <Text style={styles.riderName}>{rider.name}</Text>
            <Text>Seats: {rider.seats}</Text>
            <Text>Fare: {rider.fare} PKR</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 10 }}> 
        <Button title="Start Ride" color={"#28A745"} onPress={() => 
            console.log(`Start ${rider.name}`

            )} />
        <Button title="Cancell Ride" onPress={() =>
             console.log(`Cancell ${rider.name}`
                
             )} />
    </View>
    </View>
))}

        </View>
    );
};

export default UserGetRide;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    loadingContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    riderCard: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    riderInfo: {
        flex: 1,
        marginLeft: 10,
    },
    riderName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonGroup: {
        flexDirection: "row",
        gap: 10,
    },
});
