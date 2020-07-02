import React, { useState, useEffect, useMemo } from 'react';
import { View, Dimensions, Animated, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation } from 'expo';
import Icon from '../CustomIcon';
import videoStyles from '../../style/index';
// import TweetVideoProgressBar from "./TweetVideoProgressBar";
import { useFocusEffect } from '@react-navigation/native'
import { generateThumbnail } from './thumbnail'
import { controls } from './styles'
import Timer, { startTimer } from './Timer'
import runOnce from '../../../utils/once'
import Playback from './Playback'
import ScreenSize from './ScreenSize'

function Controls({ route, navigation, videoRef, controlsState }) {
    Font.loadAsync({
        'FontName': require("../../../assets/fonts/icomoon.ttf")
    });

    const controlBarRef = React.createRef();
    const [volumeControlButtonIcon, setVolumeControlButtonIcon] = useState(controlsState.volume)

    var controlBarVisibility = new Animated.Value(1);
    var videoThumbnail


    /* const prevParams = route.params != undefined ? route.params.rate : undefined
    var flag = false
    useMemo(() => { flag = true }, [prevParams])

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            flag == true ? alert('hi') : alert('ho')
        }
    }, [route.params]) */
    
    async function updateVolume() {

        if (volumeControlButtonIcon == 'volume-off') {
            // videoRef.current.setIsMutedAsync(false);


            setVolumeControlButtonIcon('volume-high');
        } else {
            videoRef.current.setIsMutedAsync(true);
            setVolumeControlButtonIcon('volume-off');
        }
    }

    return (
        <Animated.View
            ref={controlBarRef}
            style={controls.container}
        >
            <Playback
                route={route}
                navigation={navigation}
                videoRef={videoRef}
            />
            <View style={controls.subcontainer}>
                <Icon
                    name={volumeControlButtonIcon}
                    size={20}
                    color="white"
                    onPress={updateVolume}
                />
                <ScreenSize navigation={navigation} route={route} videoRef={videoRef}/>
            </View>
        </Animated.View>
    )
}

export default Controls;