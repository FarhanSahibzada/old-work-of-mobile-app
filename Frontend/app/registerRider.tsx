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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { AppRoutes } from "./constant/constant";

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
  experience: string;
}

const RegisterRider: React.FC = () => {
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
      experience: "",
    },
  });

  const [vehicleImage, setVehicleImage] = useState<string | null>(null);

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
      profileImage:
        "https://cdn-icons-png.flaticon.com/512/6858/6858504.png",
      nicNo: formDataWithImage.cnic,
      vehicleCategory: formDataWithImage.vehicleType,
      vehicleNo: formDataWithImage.vehicleType,
      licenseNo: "ked-0987",
      // vehicleImage: formDataWithImage.vehicleImage,
      vehicleImage: "https://i.dawn.com/primary/2022/05/6293d74452150.jpg",
      role: "rider",
    };

    const res = await axios.post(AppRoutes.signupRider, obj);
    console.log(res);

    Alert.alert(
      "Registration Successful",
      JSON.stringify(formDataWithImage, null, 2)
    );
    reset();
    setVehicleImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {/* Name */}
        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your name"
            />
          )}
        />

        {/* Contact */}
        <Text style={styles.label}>Contact</Text>
        <Controller
          control={control}
          name="contact"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              placeholder="Enter your contact"
            />
          )}
        />

        {/* CNIC */}
        <Text style={styles.label}>CNIC</Text>
        <Controller
          control={control}
          name="cnic"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={onChange}
              value={value}
              placeholder="Enter your CNIC"
            />
          )}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
            />
          )}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={onChange}
              value={value}
              placeholder="Enter your password"
            />
          )}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your address"
            />
          )}
        />

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          )}
        />

        {/* Vehicle Type (Dropdown) */}
        <Text style={styles.label}>Vehicle Type</Text>
        <Controller
          control={control}
          name="vehicleType"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Select Vehicle Type" value="" />
              <Picker.Item label="Bike" value="Bike" />
              <Picker.Item label="Car" value="Car" />
              <Picker.Item label="Rickshaw" value="Rickshaw" />
            </Picker>
          )}
        />

        {/* Vehicle Number */}
        <Text style={styles.label}>Vehicle Number</Text>
        <Controller
          control={control}
          name="vehicleNumber"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Enter vehicle number"
            />
          )}
        />

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
          onPress={handleSubmit(onSubmit)}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#FFFFFF" },
  formContainer: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  label: { color: "#333", fontSize: 16, marginBottom: 8, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default RegisterRider;
