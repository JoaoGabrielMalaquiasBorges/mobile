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
import tweetObject from '../Model'

function Volume ({ route, navigation, videoRef }) {
    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return route.params.volumeButton
        } else {
            return 'volume-off'
        }
    })

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            setButtonName(route.params.volumeButton)
        }
    }, [route.params])

    function muteUnmute (value) {
        videoRef.current.getStatusAsync().then(playbackStatus => {
            if (playbackStatus.isPlaying) {
                videoRef.current.pauseAsync()
                videoRef.current.setStatusAsync({ isMuted: value == 'mute' ? true : false, shouldPlay: true })
            } else {
                videoRef.current.setStatusAsync({ isMuted: value == 'mute' ? true : false })
            }
        })
    }
    
    function updateVolume() {
        if (buttonName == 'volume-off') {
            muteUnmute('unmute')
            setButtonName('volume-high');
        } else {
            muteUnmute('mute')
            setButtonName('volume-off');
        }
    }

    return (
        <Icon
            name={buttonName}
            size={20}
            color="white"
            onPress={updateVolume}
        />
    )
}

export default Volume