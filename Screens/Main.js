import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import styled from 'styled-components';
// import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from 'expo-app-loading';
import { useFonts,Lato_700Bold } from '@expo-google-fonts/lato';


export default function Main() {
    let [fontsLoaded] = useFonts({
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={{flex: 1, flexDirection: 'column',}}>
                <View style={{flex: 2,}}>
                    <Title >My Data</Title>
                </View>   
                <Container>
                    <View style={{flex: 1, flexDirection: 'row',}}>
                        <View  style={{ flex: 1, }}> 
                            <ContainerManual elevation={11} style={{shadowColor: "#000000",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.43,
shadowRadius: 9.51,}}>
                                {/* <LinearGradient
                                    colors={["#E335DC", "#F404E9"]}
                                    style={styles.buttonContainer}
                                    end={{ x: 0.1, y: 0.2 }}
                                >    */}
                                <Key>Long</Key>                    
                                {/* </LinearGradient>   */}
                            </ContainerManual>
                        </View>
                        <View style={{ flex: 1, }} > 
                            <ContainerManual>
                                <LinearGradient
                                    colors={["#9142FF", "#710CFF"]}
                                    style={styles.buttonContainer}
                                >   
                                <Text>Long</Text>                    
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
                                <Text>Long</Text>                    
                                </LinearGradient>  
                            </ContainerManual>
                        </View>
                        <View style={{ flex: 1, }} > 
                            <ContainerManual>
                                <LinearGradient
                                    colors={["#4B4848", "#010101"]}
                                    style={styles.buttonContainer}
                                >   
                                <Text>Long</Text>                    
                                </LinearGradient>  
                            </ContainerManual>
                        </View>
                    </View>
                </Container>
                <View style={{flex: 4,}}>
                    <Text>Long</Text>
                </View>
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
      width: '100%', height: '100%', 
    },
    buttonCouter: { 
      padding: 15, 
      alignItems: "flex-start", 
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
    margin-top: 40px;
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
`
const Value = styled.Text`
    color: white;
    padding: 5px 0px 0px 10px;
    letter-spacing: 2px;
`



