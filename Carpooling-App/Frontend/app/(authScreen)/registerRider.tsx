import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import axios from 'axios'
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
import { AppRoutes } from "../constant/constant";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { userLogin } from "@/Store/UserAuthSlice";

interface FormData {
  name: string;
  contact: string;
  cnic: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleImage: string | null;
  licenseNumber: string;
  role? : string
  // experience: string;
}

const RegisterRider = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      contact: "",
      cnic: "",
      email: "",
      password: "",
      address: "",
      gender: "",
      vehicleType: "",
      vehicleNumber: "",
      vehicleImage: null,
      licenseNumber: "",
       
      // experience: "",
    },
  });
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  const [loading , setLoading ] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const pickVehicleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4], // yaha image crop ho rhi h
      quality: 1, //full image quality set kerte hen
    });

    if (!result.canceled) {
      setVehicleImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const formDataWithImage = { ...data, vehicleImage };
    console.log("Submitted Data:", formDataWithImage.email);

    const obj = {
      email: formDataWithImage.email,
      password: formDataWithImage.password,
      name: formDataWithImage.name,
      gender: formDataWithImage.gender,
      phoneNumber: formDataWithImage.contact,
      address: formDataWithImage.address,
      // profileImage : formDataWithImage.profileImage,
      profileImage: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
      nicNo: formDataWithImage.cnic,
      vehicleCategory: formDataWithImage.vehicleType,
      vehicleNo: formDataWithImage.vehicleType,
      licenseNo: "ked-0987",
      // vehicleImage: formDataWithImage.vehicleImage,
      vehicleImage: "https://i.dawn.com/primary/2022/05/6293d74452150.jpg",
      role: "rider",
    };
    try {
      const res = await axios.post(AppRoutes.signupRider, obj);
      if (res && res.data) {
        dispatch(userLogin(res.data.data))
        if(data?.role === 'rider'){
          router.push('/(Driver)/(Home)')
          return
        }else{
          router.push('/(user)/(Home)')
        }
      }
    } catch (error) {
      console.log("error when submiting the data", error)
    }finally{
      setLoading(false)
    }
  }

  if(loading){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container} style={{ marginTop: 20 }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 12, color: "#28A745" }}>Sign Up</Text>
        </View>
        <View style={styles.formContainer}>
          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Enter your name" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Contact */}
          <Text style={styles.label}>Contact</Text>
          <Controller
            control={control}
            name="contact"
            rules={{ required: "Contact is required", pattern: { value: /^[0-9]+$/, message: "Invalid contact number" } }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={onChange} value={value} placeholder="Enter your contact" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* CNIC */}
          <Text style={styles.label}>CNIC</Text>
          <Controller
            control={control}
            name="cnic"
            rules={{ required: "CNIC is required", minLength: { value: 13, message: "CNIC must be 13 digits" } }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} keyboardType="numeric" onChangeText={onChange} value={value} placeholder="Enter your CNIC" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} keyboardType="email-address" onChangeText={onChange} value={value} placeholder="Enter your email" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} secureTextEntry onChangeText={onChange} value={value} placeholder="Enter your password" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <Controller
            control={control}
            name="address"
            rules={{ required: "Address is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Enter your address" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Vehicle Number */}
          <Text style={styles.label}>Vehicle Number</Text>
          <Controller
            control={control}
            name="vehicleNumber"
            rules={{ required: "Vehicle number is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Enter vehicle number" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={styles.picker}>
                <Picker selectedValue={value} onValueChange={onChange} style={{ height: 50, width: "100%" }}>
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            )}
          />

          {/* Vehicle Type (Dropdown) */}
          <Text style={styles.label}>Vehicle Type</Text>

          <Controller
            control={control}
            name="vehicleType"
            render={({ field: { onChange, value } }) => (
              <View style={styles.picker}>
                <Picker selectedValue={value} onValueChange={onChange} style={{ height: 50, width: "100%" }}>
                  <Picker.Item label="Select Vehicle Type" value="" />
                  <Picker.Item label="Bike" value="Bike" />
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Rickshaw" value="Rickshaw" />
                </Picker>
              </View>
            )}
          />



          {/* Vehicle Image */}
          <TouchableOpacity onPress={pickVehicleImage} style={styles.imagePickerButton}>
            <Text style={styles.imagePickerText}>Pick Vehicle Image</Text>
          </TouchableOpacity>
          {vehicleImage && <Image source={{ uri: vehicleImage }} style={styles.image} />}

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit(onSubmit, (errors) => {
            console.log("erros", errors)
            if (Object.keys(errors).length > 0) {
              Alert.alert("Validation Error", "Please fill all required fields.");
            }
          })}
            style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  formContainer: {
    backgroundColor: "#F8F9FA",
    padding: 10, borderRadius: 20, elevation: 3,
    paddingHorizontal: 20,
    width: "90%"
  },
  label: { color: "#333", fontSize: 16, marginBottom: 8, fontWeight: "500" },
  input: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 16, color: "#333" },
  picker: { borderWidth: 2, borderColor: "#28A745", borderRadius: 8, marginBottom: 10 },
  imagePickerButton: { backgroundColor: "#007BFF", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  imagePickerText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
  image: { width: 100, height: 100, alignSelf: "center", marginBottom: 15, borderRadius: 8 },
  registerButton: { backgroundColor: "#28A745", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  registerButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 14, marginBottom: 8 },
  errorInput: { borderColor: "red" },
  loadingContainer : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  }
});

export default RegisterRider