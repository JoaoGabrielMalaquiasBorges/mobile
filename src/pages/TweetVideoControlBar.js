import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';
import TweetVideoProgressBar from "./TweetVideoProgressBar";

function TweetVideoControlBar(props) {
    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });
    
    const controlBarRef = React.createRef();
    const [volumeControlButtonIcon, setVolumeControlButtonIcon] = useState('volume-off');
    const [playerControlButtonIcon, setPlayerControlButtonIcon] = useState('play');
    
    var controlBarVisibility = new Animated.Value(1);

    function updateVolume() {
        /* props.navigation.setParams({ name: 'Lucy' });
        alert(JSON.stringify(props.navigation.state)); */

        if (volumeControlButtonIcon == 'volume-off') {
            //props.videoRef.current.setIsMutedAsync(false);

            props.videoRef.current.getStatusAsync().then(
                playbackStatus => {
                    props.navigation.navigate(
                        'Profile', {
                            //video: props.video,
                            //videoRef: props.videoRef,
                            playbackStatus: playbackStatus
                        }
                    );
                    if (playbackStatus.isPlaying) {
                        props.videoRef.current.pauseAsync();
                    }
                }
            );
            
            setVolumeControlButtonIcon('volume-high');
        } else {
            props.videoRef.current.setIsMutedAsync(true);
            setVolumeControlButtonIcon('volume-off');
        }
    }
    function updatePlaybackStatus() {
        switch (playerControlButtonIcon) {
            case 'play':
                props.videoRef.current.playAsync();
                setPlayerControlButtonIcon('pause');
                break;
                
            case 'pause':
                props.videoRef.current.pauseAsync();
                setPlayerControlButtonIcon('play');
                break;

            case 'replay':
                props.videoRef.current.replayAsync();
                setPlayerControlButtonIcon('pause');
                break;
        }
    }

    return(
        <Animated.View
            ref={controlBarRef}
            style={{ ...videoStyles.controlBar, opacity: 1 }}
        >
            <TweetVideoProgressBar videoRef={props.videoRef} />
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