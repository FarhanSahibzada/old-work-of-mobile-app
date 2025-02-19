import { ThemedButton } from '../components/ThemedButton';
import { ThemedText } from '../components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppRoutes } from './constant/constant';
import { userLogin } from '../Store/UserAuthSlice';
import HomeScreen from './(Driver)/(Home)';

function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log('No token found');
          setLoading(false);
        }
      } catch (e) {
        console.log('Error retrieving token:', e);
        setLoading(false);
      }finally{
        setLoading(false)
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchdata = async () => {
        try {
          const response = await axios.get(AppRoutes.getCurrentUser, {
            headers: { Authorization: `Bearer ${token}` },
          });
        if (response && response.data) {
          const data = response.data?.data ;
          console.log(data)
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
      };
      fetchdata();
    }
  }, [token])


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('@/assets/images/sharelogo.jpg')} style={styles.logo} />
        <ThemedText style={styles.title} type="title">
          Welcome to Car Pool App
        </ThemedText>
        <ThemedText style={styles.description} type="default">
          Join our community to share rides, save costs, and make your journey more enjoyable!
        </ThemedText>
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
        <ThemedText style={styles.footerText} type="default">
          Already have an account?{' '}
          <ThemedText style={styles.loginLink} type="link" onPress={() => router.push('/(authScreen)/login')}>
            Login here
          </ThemedText>
        </ThemedText>
      </ScrollView>
    </>
  );
}
export default Index;
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.9,
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
    color: '#666',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
