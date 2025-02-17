import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "../../hooks/useColorScheme";
import React, { useEffect } from "react";
import CustomDrawer from "../../components/CustomDrawer";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DrawerLayout() {

  const colorScheme = useColorScheme();
  const router = useRouter()
  const userData = useSelector((state: RootState) => state.userAuth.userLogin)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: "#E52020",
          headerShown: true,
          drawerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            width: 280,
          },
          headerStyle: { backgroundColor: "#1E88E5" },
          headerTintColor: "#F8F5E9",
          headerTitleStyle: { fontWeight: "bold" },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="(Home)"
          options={{
            headerTitle: "Car Pooling",
            drawerLabel: "Car Pooling",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
              >
                <Image
                  source={{ uri: userData?.profileimage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                  style={{ width: 30, height: 30, borderRadius: 20 }}
                />
              </TouchableOpacity>
            )
          }}
        />
        <Drawer.Screen
          name="History"
          options={{
            headerTitle: "History ",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
