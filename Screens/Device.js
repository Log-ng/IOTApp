import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "toggle-switch-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from "expo-app-loading";
import { useFonts, Lato_700Bold } from "@expo-google-fonts/lato";
import Timer from "./Timer";

export default function Device({route}) {
  const [isEnabledManual, setIsEnabledMalnual] = useState(false);
  const [isEnabledAuto, setIsEnabledAuto] = useState(route.params.data.auto);
  const toggleSwitchManual = () =>
    setIsEnabledMalnual((previousState) => !previousState);
  const toggleSwitchAuto = () => {
    if (!isEnabledAuto && isEnabledManual)toggleSwitchManual();
    setIsEnabledAuto((previousState) => !previousState);
  }
  let [fontsLoaded] = useFonts({
    Lato_700Bold,
  });
  console.log("test", route.params)
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
            <View>
              <FromTo>
                From :<ValueFromTo> {route.params.data.hourFrom} PM</ValueFromTo>
              </FromTo>
              <FromTo>
                To :<ValueFromTo> {route.params.data.hourTo} PM</ValueFromTo>
              </FromTo>
            </View>
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
  padding: 20px 0px 0px 10px;
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
