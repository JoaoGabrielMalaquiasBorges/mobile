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

function Controls({ route, navigation, videoRef, controlsState }) {
    Font.loadAsync({
        'FontName': require("../../../assets/fonts/icomoon.ttf")
    });

    const controlBarRef = React.createRef();
    const [volumeControlButtonIcon, setVolumeControlButtonIcon] = useState(controlsState.volume);
    const [playerControlButtonIcon, setPlayerControlButtonIcon] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return route.params.playerControlButtonIcon
        } else {
            return controlsState.playback
        }
    });
    
    /* async function getThumbnail () {
        if (route.name == 'Main' && typeof route.params == 'undefined') {
            return await generateThumbnail()
        }
    }

    const videoThumbnail = getThumbnail() */

    var controlBarVisibility = new Animated.Value(1);
    var videoThumbnail

    /* if (route.name == 'Main' && typeof route.params == 'undefined') {
        videoThumbnail = generateThumbnail()
        alert(JSON.stringify(videoThumbnail))
    } */
    const prevParams = route.params != undefined ? route.params.rate : undefined
    var flag = false
    useMemo(() => { flag = true }, [prevParams])

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            flag == true ? alert('hi') : alert('ho')
        }
    }, [route.params])
    
    async function updateVolume() {

        if (volumeControlButtonIcon == 'volume-off') {
            // videoRef.current.setIsMutedAsync(false);

            if (route.name == 'Main') {
                videoThumbnail = await generateThumbnail()
            }

            videoRef.current.pauseAsync().then(playbackStatus => {
                if (playerControlButtonIcon == 'pause' /* && playbackStatus.positionMillis != 10704 */) {
                    // setPlayerControlButtonIcon('play');
                    // playbackStatus.shouldPlay = true;
                    playbackStatus.positionMillis = 10704
                }
                // stop()
                navigation.navigate('FullscreenSizeVideo', {
                    playbackStatus: playbackStatus,
                    routeKey: route.key,
                    thumbnail: videoThumbnail,
                    playerControlButtonIcon: playerControlButtonIcon
                });
            });

            setVolumeControlButtonIcon('volume-high');
        } else {
            videoRef.current.setIsMutedAsync(true);
            setVolumeControlButtonIcon('volume-off');
        }
    }

    function updatePlaybackStatus() {
        switch (playerControlButtonIcon) {
            case 'play':
                videoRef.current.playAsync();
                setPlayerControlButtonIcon('pause');
                startTimer()
                break;

            case 'pause':
                videoRef.current.pauseAsync();
                setPlayerControlButtonIcon('play');
                break;

            case 'replay':
                videoRef.current.replayAsync();
                setPlayerControlButtonIcon('pause');
                break;
        }
    }

    return (
        <Animated.View
            ref={controlBarRef}
            style={controls.container}
        >
            <Icon
                name={playerControlButtonIcon}
                size={18}
                color="white"
                style={{ height: 18 }}
                onPress={updatePlaybackStatus}
            />
            <Icon
                name={volumeControlButtonIcon}
                size={20}
                color="white"
                style={{ height: 20 }}
                onPress={updateVolume}
            />
        </Animated.View>
    );
}

export default Controls;