import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { Stack } from "expo-router";

interface FormData {
  name: string;
  contact: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  nicNo: string
}


const RegisterUser = () => {
  const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      address: "",
      gender: "",
    },
  });

  const [image, setImage] = useState<string | null>(null);
  const [role, setRole] = useState('')
  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data)
    let formData = { ...data, image };
    Alert.alert("Registration Successful", JSON.stringify(data, null, 2));
    reset();
    setImage(null);

  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container} style={{ marginTop: 20 }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 12 , color : "#28A745"}}>Sign Up</Text>
        </View>

        <View style={styles.formContainer}>

          {/* User Form */}
            
              <Text style={styles.label}>Name</Text>
              <Controller control={control} name="name" rules={{ required: "Name is required" }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Enter your name" />
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                  </>
                )}
              />

              <Text style={styles.label}>Contact No</Text>
              <Controller control={control} name="contact" rules={{ required: "Contact is required" }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Enter your contact" keyboardType="numeric" />
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

              <Text style={styles.label}>Password</Text>
              <Controller control={control} name="password" rules={{ required: "Password is required" }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <TextInput style={styles.input} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Enter your password" secureTextEntry />
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                  </>
                )}
              />
          

          
          
          {/* Register Button */}
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.registerButton} disabled={!isValid}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    marginBottom: 10,
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
  imagePickerButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  imagePickerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default RegisterUser;