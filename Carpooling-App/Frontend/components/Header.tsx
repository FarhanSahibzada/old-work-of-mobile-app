import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Car Pooling</Text>
      
      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <AntDesign name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: "#1E88E5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
});

export default Header;
