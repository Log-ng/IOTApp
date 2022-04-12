import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from 'expo-app-loading';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Link } from '@react-navigation/native';
// import styled from 'rn-css';
import axios from 'axios';
import {
    useFonts,
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  } from '@expo-google-fonts/lato';

export default function Main() {
    const [temp, setTemp] = useState(' ');
    const [humi, setHumi] = useState(' ');
    const apis = [
        "https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.humid",
        "https://io.adafruit.com/api/v2/an_ngdinh/feeds/demo.temp",
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            // setTime((prevTime) => prevTime + 1000);
            axios.all(apis.map((api) => axios.get(api))).then((data) => {
                setHumi(data[0].data.last_value);
                setTemp(data[1].data.last_value);
            })
        }, 2000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    let [fontsLoaded] = useFonts({
        Lato_100Thin,
        Lato_100Thin_Italic,
        Lato_300Light,
        Lato_300Light_Italic,
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic,
        Lato_900Black,
        Lato_900Black_Italic,
      });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={{flex: 1, flexDirection: 'column',}}>
                <View style={{flex: 1.2,}}>
                    <Title >My Data</Title>
                </View>   
                <Container>
                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <View  style={{ flex: 1, }}> 
                            <ContainerManual>
                                <LinearGradient
                                    colors={["#E335DC", "#F404E9"]}
                                    style={styles.buttonContainer}
                                    end={{ x: 0.1, y: 0.2 }}
                                >   
                                <Key>Temperature</Key>     
                                
                                <Value>
                                    <Link to={{ screen: 'Chart', params: { id: 'jane' } }}>
                                        {temp} 
                                        <MaterialCommunityIcons name="temperature-celsius" size={50} color="white" />
                                    </Link>               
                                </Value>                    
                                </LinearGradient>  
                            </ContainerManual>
                        </View>
                        <View style={{ flex: 1, }} > 
                            <ContainerManual>
                                <LinearGradient
                                    colors={["#9142FF", "#A264FA" , "#B992F0"]}
                                    style={styles.buttonContainer}
                                >   
                                <Key>Humidity</Key>
                                <Value>
                                    <Link to={{ screen: 'Chart', params: { id: 'jane' } }}>
                                        {humi} %
                                    </Link>
                                </Value>                    
                                </LinearGradient>  
                            </ContainerManual>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <View style={{ flex: 1, }} > 
                                <ContainerManual>
                                    <LinearGradient
                                        colors={["#00D092", "#00B17C" ]}
                                        style={styles.buttonContainer}
                                    >   
                                    <Key>Light</Key>
                                    <Value>
                                        <Link to={{ screen: 'Chart', params: { id: 'jane' } }}>
                                            On
                                        </Link>
                                    </Value>                    
                                    </LinearGradient>  
                                </ContainerManual>
                        </View>
                        <View style={{ flex: 1, }} > 
                            <ContainerManual>
                                <LinearGradient
                                    colors={["#4B4848", "#010101"]}
                                    style={styles.buttonContainer}
                                >   
                                <Key>Active</Key>  
                                <ActiveValue>Fan</ActiveValue>                  
                                <ActiveValue>Pump</ActiveValue>                  
                                <ActiveValue>Light</ActiveValue>                  
                                </LinearGradient>  
                            </ContainerManual>
                        </View>
                    </View>
                </Container>
                <ContainerDevices style={{flex: 2.5, flexDirection: 'column',}}>
                    <View style={{flex: 1, }}>
                        <TitleDevices>Devices</TitleDevices>
                    </View>
                    <View style={{flex: 4, flexDirection: 'column', paddingTop: 15,}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, }}>
                                <ContainerButton>
                                    <LinearGradient
                                        colors={["#9142FF", "#710CFF"]}
                                        style={styles.buttonCouter}
                                    >   
                                    <Link to={{ screen: 'Fan', params: { device: 'Fan' }}}>
                                        <ButtonDevices>Fan</ButtonDevices>                  
                                    </Link>
                                    </LinearGradient>  
                                </ContainerButton>
                            </View>
                            <View style={{flex: 1, }}>
                                <ContainerButton>
                                    <LinearGradient
                                        colors={["#00D092", "#72AC9A"]}
                                        style={styles.buttonCouter}
                                    >   
                                        <Link to={{ screen: 'Pump', params: { device: 'Pump' }}}>
                                            <ButtonDevices>Pump</ButtonDevices>                  
                                        </Link>                  
                                    </LinearGradient>  
                                </ContainerButton>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, }}>
                                <ContainerButton>
                                    <LinearGradient
                                        colors={["#E335DC", "#DBADD9"]}
                                        style={styles.buttonCouter}
                                    >   
                                    <Link to={{ screen: 'Light', params: { device: 'Light' }}}>
                                        <ButtonDevices>Light</ButtonDevices>                  
                                    </Link>                  
                                    </LinearGradient>  
                                </ContainerButton>
                            </View>
                            <View style={{flex: 1, }}>
                                <ContainerButton>
                                    <LinearGradient
                                        colors={["#D44444", "#F20000"]}
                                        style={styles.buttonCouter}
                                    >   
                                    <ButtonDevices>Back</ButtonDevices>                  
                                    </LinearGradient>  
                                </ContainerButton>
                            </View>
                        </View>
                        
                    </View>
                </ContainerDevices>
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
      borderRadius: 20,
      width: '100%', height: '98%', 
    },
    buttonCouter: { 
      padding: 17, 
      alignItems: "center", 
      borderRadius: 20,
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 14,
      color: "#fff",
      letterSpacing: 5,
    }
  });
const Title = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: 700;
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
    letter-spacing: 2px;
`
const Container = styled.View`
    flex: 5;
    /* padding: 10px; */
    flex-direction: column;
`
const ContainerManual = styled.View`
    border-radius: 20px;
    margin-left: 5px;
    margin-right: 5px;
    /* border: 1px solid white; */
    margin-bottom: 10px;
    /* border: 1px white; */
`
const Key = styled.Text`
    color: white;
    padding: 0px 0px 0px 10px;
    letter-spacing: 2px;    
    font-family: Lato_400Regular;
    margin-top: 5px;
`
const Value = styled.Text`
    margin-top: 15px;
    color: white;
    padding: 5px 0px 0px 10px;
    letter-spacing: 2px;
    font-size: 50px;
    font-family: Lato_700Bold;
`
const ActiveValue = styled.Text`
    color: #00D092;
    margin-top: 10px;
    margin-left: 10px;
`
const TitleDevices = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: 700;
    margin-left: 10px;
    /* margin-top: 30px; */
    /* margin-bottom: 4px; */
    letter-spacing: 2px;
`
const ContainerDevices = styled.View`
    /* background-color: red; */
`
const ContainerButton = styled.View`
    border-radius: 20px;
    margin-left: 5px;
    margin-right: 5px;
`
const ButtonDevices = styled.Text`
    color: white;
    letter-spacing: 1.5px;    
    font-family: Lato_700Bold;
    font-weight: 600;
`






