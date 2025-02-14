import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack } from "expo-router";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

const LogIn = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(AppRoutes.login, data);
      if (response && response.data) {
        console.log("successfully login ")
      }
    } catch (error) {
      console.log("error sending the code ", error)
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@/assets/images/riderlogo.png")} style={styles.logo} />


        <Text style={styles.title}>Welcome to Car Pool App</Text>


        <Text style={styles.description}>
          Join our community to share rides, save costs, and make your journey more enjoyable!
        </Text>

        <View style={styles.form}>
          {/* Email Input */}
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </>
            )}
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LogIn;
