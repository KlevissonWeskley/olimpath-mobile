import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Library } from '../screens/library'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { OlympiadsStack } from './olympiads.stack'
import { ChatStack } from './chat.stack'
import { COLORS } from '../constants/colors'
import { HomeStack } from './home.stack'

const Tab = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: `${COLORS.purple200}`,
        tabBarInactiveTintColor: `${COLORS.white}`,
        tabBarStyle: {
          backgroundColor: COLORS.gray900,
          paddingBottom: 12,
          paddingTop: 6,
          height: 70,
        },        
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Olimpíadas: 'medal',
            Materiais: 'book-open-page-variant',
            Chat: 'chat',
          } as const

          const iconName = icons[route.name as keyof typeof icons] ?? 'help'

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          )
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Olimpíadas" component={OlympiadsStack} />
      <Tab.Screen name="Materiais" component={Library} />
      <Tab.Screen name="Chat" component={ChatStack} />
    </Tab.Navigator>
  )
}
