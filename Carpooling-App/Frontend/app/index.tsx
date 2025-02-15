import { ThemedButton } from '../components/ThemedButton';
import { ThemedText } from '../components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import { AppRoutes } from './constant/constant';
import { useDispatch } from 'react-redux';
import { userLogin } from '@/Store/UserAuthSlice';

function index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [token, setToken] = useState('')


  useEffect(() => {
    setLoading(true)
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setToken(token)
        } else {
          console.log('No token found');
        }
      } catch (e) {
        console.log('Error retrieving token: ', e);
      }
    };
    getToken()
  }, [])


  useEffect(() => {
    if(token){
      setLoading(true)
      const fetchdata = async () => {
     
        try {
        const response = await axios.get(AppRoutes.getCurrentUser, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        if(response && response.data){
          const data = response.data?.data ;
          
          dispatch(userLogin(data))
         
          if(data?.role === 'rider'){
            router.push('/(Driver)/(Home)')
            return
          }else{
            router.push('/(user)/(Home)')
          } 
         }
      } catch (error) {
        console.log("error when fetching the data ", error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchdata()
  }
  }, [token])


  if (loading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* App Logo */}
        <Image
          source={require('@/assets/images/riderlogo.png')} // Replace with your app logo
          style={styles.logo}
        />

        {/* Welcome Text */}
        <ThemedText style={styles.title} type="title">
          Welcome to Car Pool App
        </ThemedText>

        {/* Description Text */}
        <ThemedText style={styles.description} type="default">
          Join our community to share rides, save costs, and make your journey more enjoyable!
        </ThemedText>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <ThemedButton
            icon={<AntDesign style={styles.icon} name="user" size={24} color="white" />}
            bgColor="#28A745"
            txt="Register as Rider"
            style={styles.button}
            onPress={() => router.push('/(authScreen)/registerRider')}
          />
          <ThemedButton
            icon={<AntDesign style={styles.icon} name="user" size={24} color="white" />}
            bgColor="#007BFF"
            txt="Register as User"
            style={styles.button}
            onPress={() => router.push('/(authScreen)/registerUser')}
          />
        </View>

        {/* Footer Text */}
        <ThemedText style={styles.footerText} type="default">
          Already have an account?{' '}
          <ThemedText
            style={styles.loginLink}
            type="link"
            onPress={() => router.push('/(authScreen)/login')}
          >
            Login here
          </ThemedText>
        </ThemedText>
      </ScrollView>
    </>

  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background color
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333', // Dark text color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666', // Medium text color
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.9, // 90% of screen width
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    color: 'white',
    marginEnd: 10,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666', // Medium text color
  },
  loginLink: {
    color: '#007BFF', // Link color
    fontWeight: 'bold',
  },
});
