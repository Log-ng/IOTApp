import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const NotiSingle = ({ text, time }) => {
  return (
    <ContainerManual>
      <LinearGradient
        colors={["#4B4848", "#010101"]}
        style={styles.buttonContainer}
      >
        <View>
          <TextWhite>{text}</TextWhite>
        </View>
        <View style={styles.container}>
          <View>
            <TextWhite>{time}</TextWhite>
          </View>
          <View>
            <TextPurple>Delete</TextPurple>
          </View>
        </View>
      </LinearGradient>
    </ContainerManual>
  );
};

const ContainerManual = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 15px;
`;
const Title = styled.Text`
  color: white;
  font-size: 35px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;
const TextWhite = styled.Text`
  color: white;
`;
const TextPurple = styled.Text`
  color: purple;
`;

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default NotiSingle;
