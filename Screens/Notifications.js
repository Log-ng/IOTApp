import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import NotiSingle from "./NotiSingle";

const Notifications = () => {
  return (
    <View>
      <View>
        <Title>Notifications</Title>
      </View>
      <ScrollView>
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Temperature is too low now !"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
      </ScrollView>
    </View>
  );
};
export default Notifications;
const Title = styled.Text`
  color: white;
  font-size: 35px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;
