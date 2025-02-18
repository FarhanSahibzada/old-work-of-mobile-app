import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
import { AppRoutes } from "../constant/constant";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Store/UserAuthSlice";

interface FormData {
  name: string;
  phoneNumber: string;
  nicNo: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  vehicleCategory: string;
  vehicleNo: string;
  vehicleImage: string | null;
  profileImage: string | null;
  licenseNumber: string;
  role? : string
}

const RegisterRider = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      nicNo: "",
      email: "",
      password: "",
      address: "",
      gender: "",
      vehicleCategory: "",
      vehicleNo: "",
      vehicleImage: null,
      profileImage: null,
      licenseNumber: "",
      role:""
    },
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  const [loading , setLoading ] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
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
    setLoading(true);
    const formDataWithImage = { ...data, vehicleImage };
    console.log("Submitted Data:", formDataWithImage);

    const obj = {
      email: formDataWithImage.email,
      password: formDataWithImage.password,
      name: formDataWithImage.name,
      gender: formDataWithImage.gender,
      phoneNumber: formDataWithImage.phoneNumber,
      address: formDataWithImage.address,
      profileImage: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
      nicNo: formDataWithImage.nicNo,
      vehicleCategory: formDataWithImage.vehicleCategory,
      vehicleNo: formDataWithImage.vehicleNo,
      licenseNo: "ked-9876",
      vehicleImage: "https://i.dawn.com/primary/2022/05/6293d74452150.jpg",
      role: "driver",
    };
    console.log("obj", obj);
    
    try {
      const res = await axios.post(AppRoutes.signupRider, obj);
      console.log(res);
      if (res && res.data) {
        dispatch(userLogin(res.data.data))
        if(data?.role === 'driver'){
          router.push('/(Driver)/(Home)')
          return
        }else{
          router.push('/(user)/(Home)')
        }
      }
    } catch (error) {
      console.log("error when submiting the data", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ marginTop: 20 }}
      >
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              marginBottom: 12,
              color: "#28A745",
            }}
          >
            Sign Up
          </Text>
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
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your name"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Contact */}
          <Text style={styles.label}>Contact</Text>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: "Contact is required",
              pattern: { value: /^[0-9]+$/, message: "Invalid contact number" },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your contact"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* CNIC */}
          <Text style={styles.label}>CNIC</Text>
          <Controller
            control={control}
            name="nicNo"
            rules={{
              required: "CNIC is required",
              minLength: { value: 13, message: "CNIC must be 13 digits" },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your CNIC"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your password"
                />
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
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your address"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Vehicle Number */}
          <Text style={styles.label}>Vehicle Number</Text>
          <Controller
            control={control}
            name="vehicleNo"
            rules={{ required: "Vehicle number is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter vehicle number"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
 <View style={styles.rowContainer}>
  {/* Gender */}
  <View style={styles.pickerWrapper}>
    <Text style={styles.label2}>Gender</Text>
    <Controller
      control={control}
      name="gender"
      render={({ field: { onChange, value } }) => (
        <View style={styles.picker2}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.pickerStyle}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      )}
    />
  </View>

  {/* Vehicle Type */}
  <View style={styles.pickerWrapper}>
    <Text style={styles.label2}>Vehicle Type</Text>
    <Controller
      control={control}
      name="vehicleCategory"
      render={({ field: { onChange, value } }) => (
        <View style={styles.picker2}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.pickerStyle}
          >
            <Picker.Item label="Select Vehicle Type" value="" />
            <Picker.Item label="Bike" value="Bike" />
            <Picker.Item label="Car" value="Car" />
            <Picker.Item label="Rickshaw" value="Rickshaw" />
          </Picker>
        </View>
      )}
    />
  </View>
</View>


          {/* Vehicle Image */}
          <TouchableOpacity
            onPress={pickProfileImage}
            style={styles.imagePickerButton}
          >
            <Text style={styles.imagePickerText}>Profile Image</Text>
          </TouchableOpacity>
          {vehicleImage && (
            <Image source={{ uri: vehicleImage }} style={styles.image} />
          )}
          {/* Vehicle Image */}
          <TouchableOpacity
            onPress={pickVehicleImage}
            style={styles.imagePickerButton}
          >
            <Text style={styles.imagePickerText}>Pick Vehicle Image</Text>
          </TouchableOpacity>
          {vehicleImage && (
            <Image source={{ uri: vehicleImage }} style={styles.image} />
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit, (errors) => {
              console.log("erros", errors);
              if (Object.keys(errors).length > 0) {
                Alert.alert(
                  "Validation Error",
                  "Please fill all required fields."
                );
              }
            })}
            style={styles.registerButton}
          >
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  formContainer: {
    backgroundColor: "#F8F9FA",
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    paddingHorizontal: 20,
    width: "100%",
  },
  label: { color: "#333", fontSize: 13, marginBottom: 8 ,  fontWeight: "bold",},
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    fontSize: 14,
    color: "#333",
  },
  picker: {
    borderWidth: 2,
    borderColor: "#28A745",
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
  imagePickerText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: "#28A745",
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  registerButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginBottom: 8 },
  errorInput: { borderColor: "red" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  pickerWrapper: {
    flex: 1, 
    marginHorizontal: 5, 
  },
  picker2: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 45, 
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    },
  label2: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default RegisterRider;
