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
import { startTimer, stopTimer } from './Timer'
import runOnce from '../../../utils/once'

function Playback ({ route, navigation, videoRef }) {

    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return route.params.playbackButton
        } else {
            return 'play'
        }
    })

    /* const prevParams = route.params != undefined ? route.params.rate : undefined
    var flag = false
    useMemo(() => { flag = true }, [prevParams])

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            flag == true ? alert('hi') : alert('ho')
        }
    }, [route.params]) */

    function updateVideoPlayback () {
        switch (buttonName) {
            case 'play':
                videoRef.current.playAsync()
                startTimer()
                setButtonName('pause')
                break;

            case 'pause':
                videoRef.current.pauseAsync()
                setButtonName('play')
                break;

            case 'replay':
                videoRef.current.replayAsync()
                setButtonName('pause')
                break
        }
    }

    return (
        <Icon
            name={buttonName}
            size={18}
            color="white"
            style={{ height: 18 }}
            onPress={updateVideoPlayback}
        />
    )
    
}

export default Playback