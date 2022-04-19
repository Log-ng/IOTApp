import { StyleSheet, Text, View, TextInput, Alert, Button  } from "react-native";
import { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "toggle-switch-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from "expo-app-loading";
import { useFonts, Lato_700Bold } from "@expo-google-fonts/lato";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Timer from "./Timer";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';

const IO_key = "aio_fFre76W77mjdTKM2ZYiG4ly1GsOnLONG";

export default function Device({route}) {

  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setIsFixFrom(!isFixFrom)
    let hour = Number(currentDate.getHours()) >= 10 ? currentDate.getHours() : "0" + currentDate.getHours();
    let timeChose = hour + (Number(currentDate.getMinutes() >= 10) ? ":" : ":0") + currentDate.getMinutes();
    setHourFrom(timeChose);
  };
  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setIsFixTo(!isFixTo)
    let hour = Number(currentDate.getHours()) >= 10 ? currentDate.getHours() : "0" + currentDate.getHours();
    let timeChose = hour + (Number(currentDate.getMinutes() >= 10) ? ":" : ":0") + currentDate.getMinutes();
    setHourTo(timeChose);
  };

  const showTimepicker = (type) => {
    type == "To" ? setIsFixTo(!isFixTo) : setIsFixFrom(!isFixFrom);
    setShow(true)
  };

  const [isEnabledManual, setIsEnabledMalnual] = useState(false);
  const [isEnabledAuto, setIsEnabledAuto] = useState(route.params.data.auto);
  const [hourFrom, setHourFrom] = useState(route.params.data.hourFrom);
  const [hourTo, setHourTo] = useState(route.params.data.hourTo);
  const [isFixFrom, setIsFixFrom] = useState(false);
  const [isFixTo, setIsFixTo] = useState(false);
  // const [fromFixing, setFromFixing] = useState(0);
  // const [toFixing, setToFixing] = useState(0);

  const toggleSwitchManual = () => {
    let valueSend = {
      datum : {
        value: isEnabledManual ? "OFF" : "ON",
      }
    }
    let headerSend = {
      headers: {
        'X-AIO-Key': IO_key.slice(0, -4),
        'Content-Type': 'application/json',
      }
    }
    const sendToDevice = async () => {  
      await axios.post(`https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.${route.params.data.name.toLowerCase()}/data`, valueSend, headerSend)
        .then((response) => {
          // setproduct(response.data)
        console.log(response.data);
      });
    }  
    sendToDevice();
    setIsEnabledMalnual((previousState) => !previousState);

  }
  const toggleSwitchAuto = () => {
    if (!isEnabledAuto && isEnabledManual)toggleSwitchManual();
    setIsEnabledAuto((previousState) => !previousState);
    
    SetInit(hourFrom, hourTo, !isEnabledAuto);
  }
  const SetInit = (from, to , auto) => {

    const sendData = async () => {  
      await axios.put(`https://iot-do-an-api.herokuapp.com/device/${route.params.data.name}`, {auto: auto, hourFrom: from, hourTo: to})
        .then((response) => {
          // setproduct(response.data)
        console.log(response.data);
      });
    }  
    sendData();
    let valueSend = {
      datum : {
        value: route.params.data.name == "Pump" ? 10 : 20,
      }
    }
    let headerSend = {
      headers: {
        'X-AIO-Key': IO_key.slice(0, -4),
        'Content-Type': 'application/json',
      }
    }
    const sendToDevice = async () => {  
      await axios.post(`https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.update/data`, valueSend, headerSend)
        .then((response) => {
          // setproduct(response.data)
        console.log(response.data);
      });
    }  
    sendToDevice(); 
    setShow(false)
    // setFromFixing(0);
    // setToFixing(0);
    setIsFixFrom(false);
    setIsFixTo(false);
    // setHourFrom(from);
    // setHourTo(to);
  }
  const SendConfirm = (from, to) => {
      Alert.alert('OK !!', 'Completed ', [{ 
        text: 'Ok', 
        onPress: () => SetInit(from, to),
        styles: {borderRadius: 10}
      }]);
  }
  let [fontsLoaded] = useFonts({
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <View>
        {/* <DatePicker date={date} onDateChange={setDate} /> */}
          <Title>{route.params.data.name}</Title>
          {/* <Title>FanLong</Title> */}
        </View>
        <ContainerManual>
          <LinearGradient
            colors={["#4B4848", "#010101"]}
            style={styles.buttonContainer}
          >
            <ToggleSwitch
              disabled={isEnabledAuto}
              isOn={isEnabledManual}
              onColor="#00D092"
              offColor="#BBBBBB"
              label="Manual Control"
              labelStyle={{
                color: "white",
                fontWeight: "900",
                fontSize: 22,
                width: "75%",
              }}
              size="medium"
              onToggle={toggleSwitchManual}
            />
          </LinearGradient>
        </ContainerManual>
        <ContainerManual>
          <LinearGradient
            colors={["#4B4848", "#010101"]}
            style={styles.buttonContainer}
          >
            <ToggleSwitch
              isOn={isEnabledAuto}
              onColor="#00D092"
              offColor="#BBBBBB"
              label="Auto Control"
              labelStyle={{
                color: "white",
                fontWeight: "900",
                fontSize: 22,
                width: "75%",
              }}
              size="medium"
              onToggle={toggleSwitchAuto}
            />
            <TurnDevice>Auto turn on device on time</TurnDevice>

            <View style={{flexDirection: 'row'}}>
              <FromTo>
              From :
                <ValueFromTo> {hourFrom}</ValueFromTo>
              </FromTo>
              {/* {isFix && <InputFix 
                numberOfLines={1}
                placeholderTextColor="#8c8c8c" 
                onChangeText={setFromFixing}
                keyboardType="numeric"
                />} */}
              <FromTo style={{ flex: 1, textAlign: 'right', }} onPress={() => showTimepicker("From")}>
                <MaterialCommunityIcons name="pencil-box-multiple" size={26} color={!isFixFrom ? "#00D092" : "#8c8c8c"}/>
              </FromTo>
            </View>
            {isFixFrom && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                onChange={onChangeFrom}
              />
            )}
            <View style={{flexDirection: 'row'}}>
              <FromTo>
                To :
                <ValueFromTo> {hourTo}</ValueFromTo>
              </FromTo>
              {/* {isFix && <InputFix 
                numberOfLines={1}
                placeholderTextColor="#8c8c8c" 
                onChangeText={setToFixing}
                keyboardType="numeric"
                />} */}
              <FromTo style={{ flex: 1, textAlign: 'right', }} onPress={() => showTimepicker("To")}>
                <MaterialCommunityIcons name="pencil-box-multiple" size={26} color={!isFixTo ? "#00D092" : "#8c8c8c"} />
              </FromTo>
            </View>
            {isFixTo && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='time'
                is24Hour={true}
                onChange={onChangeTo}
              />
            )}
            {<ContainerConfirm>
                    {/* {(isFixFrom || isFixTo) && <Confirm  */}
                    {show && <Confirm 
                      title='Save'
                      onPress={() => SendConfirm(hourFrom, hourTo, isEnabledAuto)}
                      // style={{padding: 10,}}
                    />}
            </ContainerConfirm>}
          </LinearGradient>
        </ContainerManual>
        <ContainerCounter>
          <LinearGradient
            colors={["#9142FF", "#A264FA", "#B992F0"]}
            style={styles.buttonCouter}
          >
            <Couter style={{ fontFamily: "Lato_700Bold" }}>
              {isEnabledManual ? (
                <Timer on={isEnabledManual} />
              ) : (
                "00 : 00 : 00"
              )}
            </Couter>
          </LinearGradient>
        </ContainerCounter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 15,
    alignItems: "flex-start",
    borderRadius: 15,
  },
  buttonCouter: {
    padding: 15,
    alignItems: "flex-start",
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
    letterSpacing: 5,
  },
  buttonCofirm: { 
    // padding: 10, 
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "flex-start", 
    borderRadius: 10,
    // paddingLeft: 30,
},
});
const Title = styled.Text`
  color: white;
  font-size: 35px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;
const ContainerManual = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 15px;
`;
const TurnDevice = styled.Text`
  color: white;
  padding: 20px 0px 0px 10px;
  letter-spacing: 2px;
`;
const FromTo = styled.Text`
  color: #8c8c8c;
  padding: 20px 10px 0px 10px;
  letter-spacing: 2px;
`;
const ValueFromTo = styled.Text`
  color: #8c8c8c;
  padding: 5px 0px 0px 10px;
  letter-spacing: 2px;
`;
const ContainerCounter = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 20px;
  border-radius: 15px;
  margin-top: 20px;
`;
const Couter = styled.Text`
  color: white;
  align-items: flex-start;
  font-size: 51px;
  font-weight: 600;
  text-align: center;
  padding: 35px 20px 35px 30px;
`;
const Confirm = styled.Button`
  color: white;
  padding: 10px;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;

`;
const ContainerConfirm = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 15px;
`
const InputFix = styled.TextInput`
  background-color: #4B4848;
  border-radius: 10px;
  width: 60px;
  padding-left:12px;
  margin-top: 12px;
  color: white;
  /* height: 80%; */
  /* height: 30px; */
  /* padding-top: 20px; */
  margin-right: 10px;
`
