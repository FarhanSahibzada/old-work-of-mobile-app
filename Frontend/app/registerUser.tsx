import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterUser = () => {
  const [image, setImage] = useState<string | null>(null);

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

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contact: Yup.string()
      .matches(/^\d{11}$/, "Contact number must be 11 digits")
      .required("Contact number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ name: "", contact: "", email: "", password: "", address: "", gender: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Log form data and image to the console
          console.log("Form Data:", { ...values, image });
          Alert.alert("Registration Successful", JSON.stringify(values, null, 2));

          // Reset the form after submission
          resetForm();
          setImage(null); // Clear the image
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            {/* Name Field */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            {/* Contact Field */}
            <Text style={styles.label}>Contact No</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("contact")}
              onBlur={handleBlur("contact")}
              value={values.contact}
              placeholder="Enter your contact number"
              placeholderTextColor="#999"
            />
            {touched.contact && errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

            {/* Email Field */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter your email"
              placeholderTextColor="#999"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Field */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Enter your password"
              placeholderTextColor="#999"
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Address Field */}
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              placeholder="Enter your address"
              placeholderTextColor="#999"
            />
            {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

            {/* Gender Field */}
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("gender")}
              onBlur={handleBlur("gender")}
              value={values.gender}
              placeholder="Male / Female"
              placeholderTextColor="#999"
            />
            {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

            {/* Image Picker */}
            <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}

            {/* Register Button */}
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFFFFF", // White background
  },
  formContainer: {
    backgroundColor: "#F8F9FA", // Light gray background for the form
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    color: "#333", // Dark gray for labels
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FFFFFF", // White background
    fontSize: 16,
    color: "#333", // Dark gray text
  },
  errorText: {
    color: "#FF3B30", // Red for errors
    fontSize: 14,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: "#007BFF", // Blue color for the image picker button
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: "#28A745", // Green color for the register button
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF", // White text
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterUser;