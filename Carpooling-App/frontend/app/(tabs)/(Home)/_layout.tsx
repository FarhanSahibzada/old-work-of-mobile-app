import { Stack } from "expo-router";
import { View, Text } from 'react-native'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
        headerTransparent : true,
        headerTintColor : "#F8F5E9",
        headerTitle :"Home"
        }}/>
    </Stack>
  )
}
