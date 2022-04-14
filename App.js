import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Device from "./Screens/Device";
import Main from "./Screens/Main";
import Chart from "./Screens/Chart";
import Notifications from "./Screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
// import { useState } from 'react';
import BeforeDevice from "./Screens/BeforeDevice";
const Tab = createBottomTabNavigator();

export default function App() {
  // const [tab, setTab] = useState(0);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Devices"
          screenOptions={{
            // tabBarActiveBackgroundColor: 'red',
            tabBarStyle: { backgroundColor: "#343434" },
          }}
          sceneContainerStyle={{ backgroundColor: "#343434" }}
        >
          <Tab.Screen
            screenOptions={{ tabBarStyle: { backgroundColor: "red" } }}
            name="Main"
            component={Main}
            options={{
              title: () => null,
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="md-apps-outline"
                  size={24}
                  color="white"
                  style={focused ? styles.nav : null}
                />
              ),
            }}
          />
          <Tab.Screen
            screenOptions={{
              tabBarStyle: { backgroundColor: "#343434" },
            }}
            name="Devices"
            component={BeforeDevice}
            options={{
              title: () => null,
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="device-hub"
                  size={24}
                  color="white"
                  style={focused ? styles.nav : null}
                />
              ),
            }}
          />
          <Tab.Screen
            screenOptions={{
              tabBarStyle: { backgroundColor: "#343434" },
            }}
            name="Chart"
            component={Chart}
            options={{
              title: () => null,
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="bar-chart-outline"
                  size={24}
                  color="white"
                  style={focused ? styles.nav : null}
                />
              ),
            }}
          />
          <Tab.Screen
            screenOptions={{
              tabBarStyle: { backgroundColor: "#343434" },
            }}
            name="Notifications"
            component={Notifications}
            options={{
              title: () => null,
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="ios-notifications-outline"
                  size={24}
                  color="white"
                  style={focused ? styles.nav : null}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343434",
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    color: "white",
  },
  nav: {
    borderRadius: 16,
    backgroundColor: "#E335DC",
    padding: 9,
    borderColor: "#CCCCCC",
    borderWidth: 1,
  },
});
