import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
const NotiSingle = ({ handleDelete, _id, text, time }) => {
  // const handleDelete = () => {
  //   // console.log("Xx");
  //   axios
  //     .delete(`https://iot-do-an-api.herokuapp.com/noti/${_id}`)
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
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
            <TextPurple onPress={() => handleDelete(_id)}>Delete</TextPurple>
          </View>
        </View>
      </LinearGradient>
    </ContainerManual>
  );
};

const ContainerManual = styled.View`
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 8px;
  margin-top: 8px;
  border-radius: 20px;
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
