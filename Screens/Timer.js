import styled from 'styled-components';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from "react";
import AppLoading from 'expo-app-loading';
import { useFonts,Lato_700Bold } from '@expo-google-fonts/lato';

export default function Timer({ on }) {
    const [time, setTime] = useState(0);
    if (on) {
        useEffect(() => {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }, []);
    }
    const makeTimeReadable = (t) => {
        const timeInSec = t / 1000;
        const hours = Math.floor(timeInSec / 3600);
        const mins = Math.floor((timeInSec - hours * 3600) / 60);

        const secs = timeInSec - hours * 3600 - mins * 60;
        return `${checkTwoDigits(hours)} : ${checkTwoDigits(mins)} : ${checkTwoDigits(
            secs
        )}`;
    };
    const checkTwoDigits = (t) => {
        if (t < 10) {
            return "0" + t;
        }
        return t;
    };
    let [fontsLoaded] = useFonts({
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <>                        
                {on ? <Couter style={{fontFamily: 'Lato_700Bold',}}>{makeTimeReadable(time)}</Couter> : <Couter>00 : 00 : 00</Couter>}
            </>
        )
    }
}

const Couter = styled.Text`
    color: white;
    align-items: flex-start;
    font-size: 51px;
    font-weight: 600;
    text-align: center;
    padding: 35px 20px 35px 30px;
`