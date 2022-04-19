import { StyleSheet, Text, View, TextInput, Alert, Button } from "react-native";
import { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "toggle-switch-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from "expo-app-loading";
import { useFonts, Lato_700Bold } from "@expo-google-fonts/lato";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Timer from "./Timer";
import axios from "axios";

const IO_key = "aio_fFre76W77mjdTKM2ZYiG4ly1GsOnLONG";

export default function Device({ route }) {
  const [isEnabledManual, setIsEnabledMalnual] = useState(false);
  const [isEnabledAuto, setIsEnabledAuto] = useState(route.params.data.auto);
  const [hourFrom, setHourFrom] = useState(route.params.data.hourFrom);
  const [hourTo, setHourTo] = useState(route.params.data.hourTo);
  const [isFix, setIsFix] = useState(false);
  const [fromFixing, setFromFixing] = useState(0);
  const [toFixing, setToFixing] = useState(0);

  const toggleSwitchManual = () => {
    let valueSend = {
      datum: {
        value: isEnabledManual ? "OFF" : "ON",
      },
    };
    let headerSend = {
      headers: {
        "X-AIO-Key": IO_key.slice(0, -4),
        "Content-Type": "application/json",
      },
    };
    const sendToDevice = async () => {
      await axios
        .post(
          `https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.${route.params.data.name.toLowerCase()}/data`,
          valueSend,
          headerSend
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendToDevice();
    setIsEnabledMalnual((previousState) => !previousState);
  };
  const toggleSwitchAuto = () => {
    if (!isEnabledAuto && isEnabledManual) toggleSwitchManual();
    setIsEnabledAuto((previousState) => !previousState);
    SetInit(hourFrom, hourTo, !isEnabledAuto);
  };
  const SetInit = (from, to, auto) => {
    const sendData = async () => {
      await axios
        .put(
          `https://iot-do-an-api.herokuapp.com/device/${route.params.data.name}`,
          { auto: auto, hourFrom: from, hourTo: to }
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendData();

    setFromFixing(0);
    setToFixing(0);
    setIsFix(false);
    setHourFrom(from);
    setHourTo(to);
  };
  const SendConfirm = (from, to) => {
    from = Number(from);
    to = Number(to);
    // setIsFix(false)
    if (from > 24 || from < 1 || to > 24 || to < 1) {
      Alert.alert("Error !!", "The value must be in 1 - 24", [
        {
          text: "Back",
          // onPress: () => console.log('OK Pressed'),
          // style: 'cancel'
        },
      ]);
      return;
    }
    if (from >= to) {
      Alert.alert("Error !!", '"To Hour" must be greater than "From Hour"', [
        {
          text: "Back",
          // onPress: () => console.log('OK Pressed'),
          // style: 'cancel'
        },
      ]);
      return;
    } else {
      from <= to
        ? Alert.alert("OK !!", "Completed ", [
            {
              text: "Ok",
              onPress: () => SetInit(from, to),
              styles: { borderRadius: 10 },
            },
          ])
        : null;
    }
  };
  let [fontsLoaded] = useFonts({
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <View>
          <Title>{route.params.data.name}</Title>
          {/* <Title>FanLong</Title> */}
        </View>
        <ContainerManual>
          {/* <Shadow 
                    viewStyle={{marginLeft: 12,}} 
                    distance={1} startColor={'#343434'} 
                    finalColor={'#404040'} 
                    offset={[19, 0]}
                > */}
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
          {/* </Shadow> */}
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

            <View style={{ flexDirection: "row" }}>
              <FromTo>
                From :{!isFix && <ValueFromTo> {hourFrom}</ValueFromTo>}
              </FromTo>
              {isFix && (
                <InputFix
                  numberOfLines={1}
                  placeholderTextColor="#8c8c8c"
                  onChangeText={setFromFixing}
                  keyboardType="numeric"
                />
              )}
              <Text
                style={{ color: "#8c8c8c", paddingTop: 20, letterSpacing: 2 }}
              >
                {hourFrom <= 12 ? "AM" : "PM"}
              </Text>
              <FromTo
                style={{ flex: 1, textAlign: "right" }}
                onPress={() => setIsFix(!isFix)}
              >
                <MaterialCommunityIcons
                  name="pencil-box-multiple"
                  size={26}
                  color={!isFix ? "#00D092" : "#8c8c8c"}
                />
              </FromTo>
            </View>

            <View style={{ flexDirection: "row" }}>
              <FromTo>
                To :{!isFix && <ValueFromTo> {hourTo}</ValueFromTo>}
              </FromTo>
              {isFix && (
                <InputFix
                  numberOfLines={1}
                  placeholderTextColor="#8c8c8c"
                  onChangeText={setToFixing}
                  keyboardType="numeric"
                />
              )}
              <Text
                style={{ color: "#8c8c8c", paddingTop: 20, letterSpacing: 2 }}
              >
                {hourTo <= 12 ? "AM" : "PM"}
              </Text>
              <FromTo
                style={{ flex: 1, textAlign: "right" }}
                onPress={() => setIsFix(!isFix)}
              >
                <MaterialCommunityIcons
                  name="pencil-box-multiple"
                  size={26}
                  color={!isFix ? "#00D092" : "#8c8c8c"}
                />
              </FromTo>
            </View>

            {
              <ContainerConfirm>
                {/* <LinearGradient
                    colors={["#6886E0", "#1B53FB"]}
                    style={styles.buttonCofirm}
                    
                > */}
                {isFix && (
                  <Confirm
                    title="Save"
                    onPress={() =>
                      SendConfirm(fromFixing, toFixing, isEnabledAuto)
                    }
                    // style={{padding: 10,}}
                  />
                )}
                {/* </LinearGradient> */}
              </ContainerConfirm>
            }
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
`;
const InputFix = styled.TextInput`
  background-color: #4b4848;
  border-radius: 10px;
  width: 40px;
  padding-left: 12px;
  margin-top: 12px;
  color: white;
  /* height: 80%; */
  /* height: 30px; */
  /* padding-top: 20px; */
  margin-right: 10px;
`;
