import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import React from "react";
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

const screenWidth = Dimensions.get("window").width;

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
const Chart = () => {
  return (
    <>
      <View>
        <Title>Chart Temp</Title>
      </View>
      <LineChart
        data={{
          labels: [
            "Jun 21",
            "May 21",
            "Apr 21",
            "Mar 21",
            "Feb 21",
            "Jan 21",
            "Jun 21",
            "May 21",
            "Apr 21",
            "Mar 21",
            "Feb 21",
            "Jan 21",
            "Jun 21",
            "May 21",
            "Apr 21",
            "Mar 21",
            "Feb 21",
            "Jan 21",
          ], //Array of labels [Jun 21,May 21,Apr 21,Mar 21,Feb 21,Jan 21]
          datasets: [
            {
              data: [
                4.3, 4.8, 5, 5, 4.9, 4.8, 4.3, 4.8, 5, 5, 4.9, 4.8, 4.3, 4.8, 5,
                5, 4.9, 4.8,
              ], //Array of values
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2, // optional
            },
          ],
        }}
        // width={label.length * 10 + 350}
        width={screenWidth}
        height={320}
        verticalLabelRotation={70}
        withInnerLines={false}
        chartConfig={{
          backgroundGradientFrom: 0,
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2, // optional, default 3
        }}
        bezier // type of line chart
      />
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
            <Text style={styles.whiteLP}>30%</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.whiteL}>Upper limit</Text>
            <Text style={styles.whiteLP}>70%</Text>
          </View>
        </LinearGradient>
      </Container>
    </>
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
  whiteLP: {
    color: "purple",
    fontSize: 18,
  },
  flex: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
