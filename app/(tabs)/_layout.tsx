import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#00c",
            tabBarInactiveTintColor: "#004",
            tabBarStyle: {
                backgroundColor: "rgba(119, 119, 119, 1)",
                borderTopWidth: 1,
                borderTopColor: "#003",
                height: 90,
                paddingBottom: 30,
                paddingTop: 10
            },
            tabBarLabelStyle: {
                fontSize: 18,
                fontWeight: 800
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "todos",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Ionicons name='flash-outline' size={size} color={color}></Ionicons>),
                }}
            >
            </Tabs.Screen>
            <Tabs.Screen
                name='settings'
                options={{
                    title: "settings",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Ionicons name='settings' size={size} color={color}></Ionicons>),
                }}
            >
            </Tabs.Screen>

        </Tabs>
    )
}

export default TabsLayout