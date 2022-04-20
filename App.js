import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Device from "./Screens/Device";
import Main from "./Screens/Main";
import Chart from "./Screens/Chart";
import Notifications from "./Screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import BeforeDevice from "./Screens/BeforeDevice";
import axios from "axios";
const Tab = createBottomTabNavigator();

export default function App() {
  // const [tab, setTab] = useState(0);
  // API and handle delete noti
  const apis = ["https://iot-do-an-api.herokuapp.com/noti"];
  const [notis, setNotis] = useState([]);
  useEffect(() => {
    const timer = setInterval(() => {
      // setTime((prevTime) => prevTime + 1000);
      axios.all(apis.map((api) => axios.get(api))).then((data) => {
        setNotis(data[0].data.reverse());
        // setTemp(data[1].data.last_value);
      });
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleDelete = (_id) => {
    const newNotis = notis.filter((noti) => noti._id !== _id);
    axios
      .delete(`https://iot-do-an-api.herokuapp.com/noti/${_id}`)
      .then((res) => {
        console.log(res);
      });
    setNotis([...newNotis]);
  };
  // ------------------------------------------------------------------
  // call api chart
  const [dataTemp, setDataTemp] = useState([]);
  const [hoursTemp, setHoursTemp] = useState([]);
  const [dataHumi, setDataHumi] = useState([]);
  const [hoursHumi, setHoursHumi] = useState([]);
  const apis2 = [
    "https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.temp/data",
    "https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.humi/data",
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      // setTime((prevTime) => prevTime + 1000);
      axios.all(apis2.map((api) => axios.get(api))).then((data) => {
        setDataTemp(() => {
          const tempData = data[0].data.map((data) => {
            return {
              value: data.value,
              hours: data.created_at[11] + data.created_at[12],
            };
          });
          const newData = [];
          const newHours = [];
          let tempHour = tempData[0].hours;
          tempData.forEach((data, index) => {
            if (data.hours !== tempHour) {
              newData.push(tempData[index - 1].value);
              let hour = parseInt(tempData[index - 1].hours);
              hour = hour + 7;
              if (hour > 24) hour -= 24;
              newHours.push(String(hour) + "h");
              tempHour = data.hours;
            }
          });
          newData.push(tempData[tempData.length - 1].value);
          newHours.push(tempData[tempData.length - 1].hours + "h");
          setHoursTemp(newHours.reverse());
          return newData.reverse();
        });
        setDataHumi(() => {
          const tempData = data[1].data.map((data) => {
            return {
              value: data.value,
              hours: data.created_at[11] + data.created_at[12],
            };
          });
          const newData = [];
          const newHours = [];
          let tempHour = tempData[1].hours;
          tempData.forEach((data, index) => {
            if (data.hours !== tempHour) {
              newData.push(tempData[index - 1].value);
              let hour = parseInt(tempData[index - 1].hours);
              hour = hour + 7;
              if (hour > 24) hour -= 24;
              newHours.push(String(hour) + "h");
              tempHour = data.hours;
            }
          });
          newData.push(tempData[tempData.length - 1].value);
          newHours.push(tempData[tempData.length - 1].hours + "h");
          setHoursHumi(newHours.reverse());
          return newData.reverse();
        });

        // setTemp(data[1].data.last_value);
      });
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  // -------------------------------------
  // handle temp
  const apis3 = [
    "https://iot-do-an-api.herokuapp.com/device/Temp",
    "https://iot-do-an-api.herokuapp.com/device/Humi",
  ];
  const [tempFrom, setTempFrom] = useState(0);
  const [tempTo, setTempTo] = useState(0);
  const [humiFrom, setHumiFrom] = useState(0);
  const [humiTo, setHumiTo] = useState(0);
  useEffect(() => {
    // const timer = setInterval(() => {
    // setTime((prevTime) => prevTime + 1000);
    axios.all(apis3.map((api) => axios.get(api))).then((data) => {
      console.log(data[1]);
      setTempFrom(data[0].data.hourFrom);
      setTempTo(data[0].data.hourTo);
      setHumiFrom(data[1].data.hourFrom);
      setHumiTo(data[1].data.hourTo);
    });
    // }, 5000);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" /> */}
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Devices"
          screenOptions={{
            // tabBarActiveBackgroundColor: 'red',
            tabBarStyle: { backgroundColor: "#343434" },
            tabBarHideOnKeyboard: true,
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
            // component={Chart}
            children={() => (
              <Chart
                dataTemp={dataTemp}
                dataHumi={dataHumi}
                hoursTemp={hoursTemp}
                hoursHumi={hoursHumi}
                tempFrom={tempFrom}
                tempTo={tempTo}
                humiFrom={humiFrom}
                humiTo={humiTo}
              />
            )}
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
            tess="xxx"
            // component={Notifications}
            children={() => (
              <Notifications handleDelete={handleDelete} notis={notis} />
            )}
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
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ActivityIndicator, Button
// } from "react-native";
// import { useState, useEffect } from 'react'
// export default function App() {
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [time, setTime] = useState("");
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setShow(false);
//     setDate(currentDate);
//     setTime(currentDate.getHours() + ":" + currentDate.getMinutes())
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <View style={{marginTop: 30,}}>
//       <View>
//         <Button onPress={showTimepicker} title="Show time picker!" />
//       </View>
//       {console.log(date)}
//       <Text>selected: {time}</Text>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode='time'
//           is24Hour={true}
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// }