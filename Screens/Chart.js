import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "./KeyboardAvoidingView";
import axios from "axios";
const screenWidth = Dimensions.get("window").width;
const IO_key = "aio_fFre76W77mjdTKM2ZYiG4ly1GsOnLONG";
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const Chart = ({
  dataTemp,
  dataHumi,
  hoursTemp,
  hoursHumi,
  tempFrom,
  tempTo,
  humiFrom,
  humiTo,
}) => {
  const sendData = () => {
    const sendToDevice = async () => {
      await axios
        .post(
          `https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.update/data`,
          valueSend,
          headerSend
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendToDevice();
  };
  const AlterSuccess = (text) =>
    Alert.alert("Success", `Update field ${text} completed !!!`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const [inputTempFrom, setInputTempFrom] = useState(tempFrom);
  const [inputTempTo, setInputTempTo] = useState(tempTo);
  const [inputHumiFrom, setInputHumiFrom] = useState(humiFrom);
  const [inputHumiTo, setInputHumiTo] = useState(humiTo);

  const handleSubmitTempFrom = () => {
    AlterSuccess("Lower limit");
    axios
      .put(`https://iot-do-an-api.herokuapp.com/device/Temp`, {
        hourFrom: inputTempFrom,
      })
      .then((res) => {
        console.log(res);
      });
    let valueSend = {
      datum: {
        value: 30,
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
          `https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.update/data`,
          valueSend,
          headerSend
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendToDevice();
  };
  const handleSubmitTempTo = () => {
    AlterSuccess("Upper limit");
    axios
      .put(`https://iot-do-an-api.herokuapp.com/device/Temp`, {
        hourTo: inputTempTo,
      })
      .then((res) => {
        console.log(res);
      });
    let valueSend = {
      datum: {
        value: 30,
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
          `https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.update/data`,
          valueSend,
          headerSend
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendToDevice();
  };
  const handleSubmitHumiFrom = () => {
    AlterSuccess("Lower limit");
    axios
      .put(`https://iot-do-an-api.herokuapp.com/device/Humi`, {
        hourFrom: inputHumiFrom,
      })
      .then((res) => {
        console.log(res);
      });
    let valueSend = {
      datum: {
        value: 40,
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
          `https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.update/data`,
          valueSend,
          headerSend
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendToDevice();
  };
  const handleSubmitHumiTo = () => {
    AlterSuccess("Upper limit");
    axios
      .put(`https://iot-do-an-api.herokuapp.com/device/Humi`, {
        hourTo: inputHumiTo,
      })
      .then((res) => {
        console.log(res);
      });
    let valueSend = {
      datum: {
        value: 40,
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
          `https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.update/data`,
          valueSend,
          headerSend
        )
        .then((response) => {
          // setproduct(response.data)
          console.log(response.data);
        });
    };
    sendToDevice();
  };

  return (
    // <KeyboardAvoidingView>
    <ScrollView>
      <>
        <View>
          <Title>Chart Temp</Title>
        </View>

        <Container>
          <LinearGradient
            colors={["#4B4848", "#010101"]}
            style={styles.buttonContainer}
          >
            <TextWhite>Limit</TextWhite>
            <Text style={styles.whiteSm}>
              Get notification when temperature too low or too high
            </Text>
            <View style={styles.flex}>
              <Text style={styles.whiteL}>Lower limit</Text>
              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  onChangeText={setInputTempFrom}
                  value={String(inputTempFrom)}
                  // placeholder="useless placeholder"
                  keyboardType="numeric"
                  onSubmitEditing={() => handleSubmitTempFrom()}
                  maxLength={2}
                />
                <Text style={styles.whiteLP}>%</Text>
              </SafeAreaView>
            </View>
            <View style={styles.flex}>
              <Text style={styles.whiteL}>Upper limit</Text>

              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  onChangeText={setInputTempTo}
                  value={String(inputTempTo)}
                  // placeholder="useless placeholder"
                  keyboardType="numeric"
                  onSubmitEditing={() => handleSubmitTempTo()}
                  maxLength={2}
                />
                <Text style={styles.whiteLP}>%</Text>
              </SafeAreaView>
            </View>
          </LinearGradient>
        </Container>
        <LineChart
          data={{
            labels: hoursTemp,
            datasets: [
              {
                data: dataTemp,
                color: (opacity = 1) => `rgba(244, 4, 233, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
          }}
          // width={label.length * 10 + 350}
          width={screenWidth}
          height={320}
          verticalLabelRotation={0}
          withInnerLines={false}
          chartConfig={{
            backgroundGradientFrom: 0,
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
          bezier // type of line chart
        />

        <View>
          <Title>Chart Humidity</Title>
        </View>

        <Container>
          <LinearGradient
            colors={["#4B4848", "#010101"]}
            style={styles.buttonContainer}
          >
            <TextWhite>Limit</TextWhite>
            <Text style={styles.whiteSm}>
              Get notification when humidity too low or too high
            </Text>
            <View style={styles.flex}>
              <Text style={styles.whiteL}>Lower limit</Text>
              <SafeAreaView>
                <TextInput
                  style={styles.inputHumi}
                  onChangeText={setInputHumiFrom}
                  value={String(inputHumiFrom)}
                  // placeholder="useless placeholder"
                  keyboardType="numeric"
                  onSubmitEditing={() => handleSubmitHumiFrom()}
                  maxLength={2}
                />
                <Text style={styles.Humi}>%</Text>
              </SafeAreaView>
            </View>
            <View style={styles.flex}>
              <Text style={styles.whiteL}>Upper limit</Text>

              <SafeAreaView>
                <TextInput
                  style={styles.inputHumi}
                  onChangeText={setInputHumiTo}
                  value={String(inputHumiTo)}
                  // placeholder="useless placeholder"
                  keyboardType="numeric"
                  onSubmitEditing={() => handleSubmitHumiTo()}
                  maxLength={2}
                />
                <Text style={styles.Humi}>%</Text>
              </SafeAreaView>
            </View>
          </LinearGradient>
        </Container>
        <LineChart
          data={{
            labels: hoursHumi,
            datasets: [
              {
                data: dataHumi,
                color: (opacity = 1) => `rgba(145, 66, 255, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
          }}
          // width={label.length * 10 + 350}
          width={screenWidth}
          height={320}
          verticalLabelRotation={0}
          withInnerLines={false}
          chartConfig={{
            backgroundGradientFrom: 0,
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
          bezier // type of line chart
        />
      </>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Chart;
const Title = styled.Text`
  color: white;
  font-size: 35px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const TextPurple = styled.Text`
  color: purple;
`;
const Container = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 15px;
`;
const TextWhite = styled.Text`
  color: white;
`;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    // elevation: 0,
    // padding: 15,
    width: 30,
    color: "purple",
    fontSize: 24,
    // backgroundColor: "red",
    opacity: 10,
  },
  inputHumi: {
    height: 40,
    margin: 12,
    // elevation: 0,
    // padding: 15,
    width: 30,
    color: "#9142FF",
    fontSize: 24,
    // backgroundColor: "red",
    opacity: 10,
  },
  header: {
    marginTop: 40,
    marginLeft: 40,
  },
  heading: {
    fontSize: 40,
  },
  buttonContainer: {
    // flex: 1,
    // justifyContent: "space-between",
    // flexDirection: "row",
    // alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  whiteSm: {
    color: "white",
    fontSize: 10,
  },
  whiteL: {
    color: "white",
    fontSize: 18,
  },
  whiteLX: {
    color: "#9142FF",
    fontSize: 18,
  },
  whiteLP: {
    color: "purple",
    fontSize: 24,
    position: "absolute",
    top: 14,
    right: -10,
  },
  Humi: {
    color: "#9142FF",
    fontSize: 24,
    position: "absolute",
    top: 14,
    right: -10,
  },
  flex: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
  },
});
