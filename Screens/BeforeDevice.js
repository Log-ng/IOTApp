import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Device from "./Device";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Select from "./Select";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();

export default function AfterApp() {
  const [pump, setPump] = useState({});
  const [light, setLight] = useState({});

  const apis = [
    "https://iot-do-an-api.herokuapp.com/device/Pump?fbclid=IwAR00J3Pk9nR136o9uG0Yh2GlDzWfDKoNcyXkG8k5chdjru2cVje7u-atyRY",
    "https://iot-do-an-api.herokuapp.com/device/Light?fbclid=IwAR00J3Pk9nR136o9uG0Yh2GlDzWfDKoNcyXkG8k5chdjru2cVje7u-atyRY",
  ];
  useEffect(() => {
    axios.get(apis[0]).then((response) => {
      setPump(response.data);
            // console.log("Foods..........", response.data);
        });
    axios.get(apis[1]).then((response) => {
      setLight(response.data);
            // console.log("Foods..........", response.data);
        });
  }, []);
  // console.log("testPump", pump)
  // console.log("testLight", light)
  return (
    <View style={styles.container}>
      {/* <NavigationContainer> */}
        <Tab.Navigator
          // initialRouteName="Select"
          screenOptions={{
            // tabBarActiveBackgroundColor: 'red',
            tabBarStyle: { backgroundColor: "#343434", display: 'none', },
          }}
          sceneContainerStyle={{ backgroundColor: "#343434" }}
        >
          <Tab.Screen
            screenOptions={{ tabBarStyle: { backgroundColor: "red" } }}
            name="Select"
            component={Select}
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
            screenOptions={{ tabBarStyle: { backgroundColor: "red" } }}
            name="Fan"
            component={Device}
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
            initialParams={{ data: pump}}
          />
          <Tab.Screen
            screenOptions={{
              tabBarStyle: { backgroundColor: "#343434" },
            }}
            name="Pump"
            component={Device}
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
            initialParams={{ data: pump}}
          />
          <Tab.Screen
            screenOptions={{
              tabBarStyle: { backgroundColor: "#343434" },
            }}
            name="Light"
            component={Device}
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
            initialParams={{ data: light}}
          />
        </Tab.Navigator>
      {/* </NavigationContainer> */}
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
