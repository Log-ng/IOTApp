import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import NotiSingle from "./NotiSingle";
import axios from "axios";

const Notifications = () => {
  const convertDate = (date) => {
    return (
      date.substring(8, 10) +
      "-" +
      date.substring(5, 7) +
      " " +
      date.substring(11, 16)
    );
  };
  const apis = ["https://iot-do-an-api.herokuapp.com/noti"];
  const [notis, setNotis] = useState([]);
  useEffect(() => {
    const timer = setInterval(() => {
      // setTime((prevTime) => prevTime + 1000);
      axios.all(apis.map((api) => axios.get(api))).then((data) => {
        console.log(data[0].data);
        setNotis(data[0].data);
        // setTemp(data[1].data.last_value);
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <View>
      <View>
        <Title>Notifications</Title>
      </View>
      <ScrollView>
        {notis.map((noti, index) => {
          console.log(typeof noti.date);
          return (
            <NotiSingle
              key={noti._id}
              id={noti._id}
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
