import React from "react";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "../../hooks/useColorScheme";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#E52020",
        headerShown: true, 
        drawerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          width: 250, // Drawer width
        },
      }}
    >
      <Drawer.Screen
        name="(Home)"
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="History"
        options={{
          title: "History",
        }}
      />
    </Drawer>
  );
}
