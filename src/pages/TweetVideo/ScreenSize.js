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

function ScreenSize ({ route, navigation, videoRef }) {

    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return 'skip'
        } else {
            return 'fillScreen'
        }
    })

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            setButtonName('fillScreen')
        }
    })

    async function fillScreen () {
        setButtonName('skip')
        var videoThumbnail = await generateThumbnail()

        videoRef.current.getStatusAsync().then(playbackStatus => {
            // if (playerControlButtonIcon == 'pause' /* && playbackStatus.positionMillis != 10704 */) {
                // setPlayerControlButtonIcon('play');
                // playbackStatus.shouldPlay = true;
                playbackStatus.positionMillis = 10704
            // }
            // stop()
            videoRef.current.pauseAsync()
            navigation.navigate('FullscreenSizeVideo', {
                playbackStatus: playbackStatus,
                routeKey: route.key,
                thumbnail: videoThumbnail,
                playbackButton: playbackStatus.isPlaying ? 'pause' : 'play'
            })
        })
    }

    return (
        <Icon
            name={buttonName}
            size={20}
            color="white"
            style={{ height: 20 }}
            onPress={fillScreen}
        />
    )
    
}

export default ScreenSize