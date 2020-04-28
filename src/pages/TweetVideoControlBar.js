import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';
// import TweetVideoProgressBar from "./TweetVideoProgressBar";
import { useFocusEffect } from '@react-navigation/native'

function TweetVideoControlBar({ videoRef, navigatorProps, controls}) {
    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });

    const controlBarRef = React.createRef();
    const [volumeControlButtonIcon, setVolumeControlButtonIcon] = useState(controls.volume);
    const [playerControlButtonIcon, setPlayerControlButtonIcon] = useState(controls.playback);

    var controlBarVisibility = new Animated.Value(1);

    /* useFocusEffect(
        React.useCallback(() => {
            if (navigatorProps.route.name == 'Main' && typeof navigatorProps.route.params != 'undefined') {
               // alert( JSON.stringify('hi') )
            }
        }, [navigatorProps.route])
    ); */

    function updateVolume() {

        if (volumeControlButtonIcon == 'volume-off') {
            // videoRef.current.setIsMutedAsync(false);

            videoRef.current.pauseAsync().then(playbackStatus => {
                if (playerControlButtonIcon == 'pause' && playbackStatus.positionMillis != 10704) {
                    setPlayerControlButtonIcon('play');
                    playbackStatus.shouldPlay = true;
                }
                navigatorProps.navigation.navigate('Profile', {
                    playbackStatus: playbackStatus,
                    routeKey: navigatorProps.route.key
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
            style={{ ...videoStyles.controlBar, opacity: 1, height: 32 }}
        >
            {/* <TweetVideoProgressBar videoRef={videoRef} /> */}
            <View style={videoStyles.controlBarFooter}>
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
            </View>
        </Animated.View>
    );
}

export default TweetVideoControlBar;