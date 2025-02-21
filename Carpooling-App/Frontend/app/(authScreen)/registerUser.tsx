import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { Stack, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { AppRoutes } from "../constant/constant";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Store/UserAuthSlice";

export interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  role?: string
}


const RegisterUser = () => {
  const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      address: "",
      gender: "",
    },
  });
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState<string | null>(null);


  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uploadUrl = await uploadImageToCloudinary(result.assets[0]);
      if (uploadUrl) {
        setProfileImage(uploadUrl);
      }
    }
  };
          const uploadImageToCloudinary = async (image: any) => {
          const cloud = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME;
          if (!image.uri) return null;
          const data = new FormData();
          data.append("file", {
            uri: image.uri,
            name: `profile_${Date.now()}.jpg`,
            type: "image/jpeg",
          } as any);
          data.append("upload_preset", "Ride_Sharing");
          data.append("folder", "Ride_Sharing/Users");
          data.append("cloud_name", cloud);
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
            {
              method: "POST",
              body: data,
            }
          )
            .then((response) => response.json())
            .then(async (data) => {
              const URL = data.url;
              setProfileImage(URL)
            });
        }


  const onSubmit = async (data: FormData) => {
    setLoading(true)
    let formData = { ...data, role: "user" };
    try {
      const response = await axios.post(AppRoutes.signupUser, formData)
      if (response) {
        dispatch(userLogin(response.data?.data))
        if (data?.role === 'driver') {
          router.push('/(Driver)/(Home)')
          return
        } else {
          router.push('/(user)/(Home)')
        }
      }
    } catch (error) {
      console.log("error when sending the data in backend ", error)
    } finally {
      setLoading(false)
    }
  };


  if (loading) {
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

          {/* User Form */}

          <Text style={styles.label}>Name</Text>
          <Controller control={control} name="name" rules={{ required: "Name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Enter your name" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          <Text style={styles.label}>Email</Text>
          <Controller control={control} name="email" rules={{ required: "Email is required" }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Enter your email" keyboardType="email-address" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          <Text style={styles.label}>Contact No</Text>
          <Controller control={control} name="phoneNumber" rules={{ required: "phone Number is required" }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Enter your contact" keyboardType="numeric" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          <Text style={styles.label}>Password</Text>
          <Controller control={control} name="password" rules={{ required: "Password is required" }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Enter your password" secureTextEntry />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
          <Text style={styles.label}>Address</Text>
          <Controller control={control} name="address" rules={{ required: "address is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Enter your password" />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />
          <Text style={styles.label}>Gender</Text>
          <Controller
            control={control} name="gender" rules={{ required: "gender is required" }}
            render={({ field: { onChange, value, } }) => (
              <View style={styles.picker}>
                <Picker selectedValue={value} onValueChange={onChange} style={{ height: 49, width: "100%" }}>
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            )}
          />
   <TouchableOpacity
            onPress={pickProfileImage}
            style={styles.imagePickerButton}
          >
            <Text style={styles.imagePickerText}>Profile Image</Text>
          </TouchableOpacity>
          {profileImage && (
            <Image source={{ uri: profileImage }} style={styles.image} />
          )}

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
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    backgroundColor: "#F5F5F5",
  },
  formContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop:8,
  },
  imagePickerText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  picker: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
    marginTop:10,
    borderRadius: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#DDD",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeRole: {
    backgroundColor: "#4CAF50",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  registerButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


export default RegisterUser;
