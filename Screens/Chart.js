import { StyleSheet, Text, View } from "react-native";
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
      {/* <View style={styles.header}>
        <Text style={styles.heading}>Temp Chart</Text>
      </View> */}
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
    </>
  );
};

export default Chart;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginLeft: 40,
  },
  heading: {
    fontSize: 40,
  },
});
