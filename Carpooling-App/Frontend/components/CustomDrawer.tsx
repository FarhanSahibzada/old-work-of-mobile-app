import { View, Text, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView,  DrawerItemList } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import { RootState } from '../Store/Store'

export default function CustomDrawer(props: any) {
    const user = useSelector((state: RootState) => state.userAuth.userLogin)
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: "center", padding: 20 }}>
                <Image
                    source={{ uri: user?.profileimage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} // Default Image
                    style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
                />
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{user?.name || "Guest"}</Text>
                <Text style={{ fontSize: 14, color: "gray" }}>{user?.email || "guest@example.com"}</Text>
            </View>
            <DrawerItemList  {...props} />
        </DrawerContentScrollView>
    )
}