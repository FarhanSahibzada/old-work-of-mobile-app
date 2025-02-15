import { Stack } from "expo-router";
import React from 'react'
import Drawer from "expo-router/drawer";

export default function _layout() {
  return (
    <Drawer>
        <Drawer.Screen name="index" options={{
        headerTransparent : true,
        headerTintColor : "#F8F5E9",
        headerTitle :"Home"
        }}/>
    </Drawer>
  )
}
