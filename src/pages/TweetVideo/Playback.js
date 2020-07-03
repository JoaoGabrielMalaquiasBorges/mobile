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
import { startTimer, stopTimer, startTimerAt } from './Timer'
import runOnce from '../../../utils/once'
import EventEmitter from 'events'

const render = new EventEmitter()

export function enableReplay (route) {
    if (route.name == 'Main') {
        render.emit('re-renderMain')
    } else {
        render.emit('re-renderFullscreenSizeVideo')
    }
}

function Playback ({ route, navigation, videoRef }) {
    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return route.params.playbackButton
        } else {
            return 'play'
        }
    })

    function mainListener () {
        setButtonName('replay')
    }

    function fullscreenSizeVideoListener () {
        setButtonName('replay')
    }

    useEffect(() => {
        if (route.name == 'Main') {
            render.addListener('re-renderMain', mainListener)
        } else {
            render.addListener('re-renderFullscreenSizeVideo', fullscreenSizeVideoListener)
        }

        if (route.name == 'Main' && route.params != undefined) {
            setButtonName(route.params.playbackButton)
        }

        return () => {
            if (route.name == 'Main') {
                render.removeListener('re-renderMain', mainListener)
            } else {
                render.removeListener('re-renderFullscreenSizeVideo', fullscreenSizeVideoListener)
            }
        }
    }, [route.params])

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
                videoRef.current.pauseAsync().then(() => videoRef.current.replayAsync())
                startTimerAt(0)
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