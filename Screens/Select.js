import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

export default function Select() {
    return (
        <View>
            <ContainerManual>
                <LinearGradient
                    colors={["#4B4848", "#010101"]}
                    style={styles.buttonContainer}
                >
                    <TurnDevice>Select a device !!!</TurnDevice>
                </LinearGradient>
            </ContainerManual>
            <ContainerButton>
                <LinearGradient
                    colors={["#9142FF", "#710CFF"]}
                    style={styles.buttonCouter}
                >   
                    <Link to={{ screen: 'Fan', params: { device: 'Fan' }}}>
                        <ButtonDevices>
                            <FontAwesome5 name="fan" size={24} color="white" />                 Fan
                        </ButtonDevices>                  
                    </Link>                  
                </LinearGradient>  
            </ContainerButton>
            <ContainerButton>
                <LinearGradient
                    colors={["#00D092", "#72AC9A"]}
                    style={styles.buttonCouter}
                >   
                    <Link to={{ screen: 'Pump', params: { device: 'Pump' }}}>
                        <ButtonDevices>
                            <MaterialCommunityIcons name="water-pump" size={24} color="white" />                 Pump
                        </ButtonDevices>                  
                    </Link>                  
                </LinearGradient>  
            </ContainerButton>
            <ContainerButton>
                <LinearGradient
                    colors={["#E335DC", "#DBADD9"]}
                    style={styles.buttonCouter}
                >   
                    <Link to={{ screen: 'Light', params: { device: 'Light' }}}>
                        <ButtonDevices>
                        <IconDevice name="lightbulb-on-outline" size={25} color="white" />                 Light
                        </ButtonDevices> 
                    </Link>                  
                </LinearGradient>  
            </ContainerButton>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonContainer: {
      padding: 15,
      alignItems: "center",
      borderRadius: 15,
    },
    buttonCouter: { 
        padding: 17, 
        alignItems: "flex-start", 
        borderRadius: 20,
        paddingLeft: 30,
    },
});
const ContainerManual = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid white; */
  margin-bottom: 20px;
  margin-top: 50px;
  border-radius: 15px;
`;
const TurnDevice = styled.Text`
  color: white;
  padding: 15px;
  /* padding-left: 60px; */
  font-size: 30px;
`;
const ContainerButton = styled.View`
    border-radius: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
`
const ButtonDevices = styled.Text`
    color: white;
    letter-spacing: 1.5px;    
    font-weight: 900;
    font-size: 16px; 
`
const IconDevice = styled(MaterialCommunityIcons)`
    /* padding: 20px; */
    /* background-color: red; */
`