import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import NotiSingle from "./NotiSingle";
import axios from "axios";

const Notifications = ({ notis, handleDelete }) => {
  const convertDate = (date) => {
    return (
      date.substring(8, 10) +
      "-" +
      date.substring(5, 7) +
      " " +
      date.substring(11, 16)
    );
  };

  return (
    <View>
      <View>
        <Title>Notifications</Title>
      </View>
      <ScrollView>
        {notis.map((noti, index) => {
          return (
            <NotiSingle
              handleDelete={handleDelete}
              key={noti._id}
              _id={noti._id}
              text={noti.content}
              time={convertDate(noti.date)}
            />
          );
        })}
        {/* <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Temperature is too low now !"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} />
        <NotiSingle text={"Fan is not working"} time={"12h30 23/3"} /> */}
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
