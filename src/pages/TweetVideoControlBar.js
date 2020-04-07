import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';


const controlBarRef = React.createRef();
const filledBarRef = React.createRef();
const progressBarButtonRef = React.createRef();
function isPortrait() {
    if ( Dimensions.get('window').height > Dimensions.get('window').width ) {
        return true;
    } else {
        return false;
    }
}
var progressBarWidth = isPortrait() ? Dimensions.get('window').width*0.95-42 : 424.45;
var progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth;
var shouldProgress = true;
var count = 1;
var flag = true;
export function testFunction(position) {
    if (shouldProgress) {
        if (position < 1-progressBarButtonOffset) {
            filledBarRef.current.setNativeProps({
                style: {
                    width: (position+progressBarButtonOffset/2)*100 + '%'
                }
            });
            progressBarButtonRef.current.setNativeProps({
                style: {
                    left: position*100 + '%'
                }
            });
            /* if (count == 1) {
                alert(1-progressBarButtonOffset + '\n' + position + '\n' + count)
            } */
            alert(1-progressBarButtonOffset + '\n' + position + '\n' + count)
            count = count + 1;
        }
    }
}
function TweetVideoControlBar(props) {
    const [volumeControlButtonIcon, setVolumeControlButtonIcon] = useState('volume-off');
    const [playerControlButtonIcon, setPlayerControlButtonIcon] = useState('play');

    useEffect(() => {
        ScreenOrientation.addOrientationChangeListener( e => {
                if ( isPortrait() ) {
                    progressBarWidth = Dimensions.get('window').width*0.95-42;
                    progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth;
                    newProgressBarButtonOffset = 16/progressBarWidth;
                    videoBoxOffset = 0;
                } else {
                    progressBarWidth = 424.45;
                    progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth;
                    newProgressBarButtonOffset = 16/progressBarWidth;
                    videoBoxOffset = (Dimensions.get('window').width*0.95-22)-444.45;
                }
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    });

    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });

    /* var video = props.video;
    var controlBarVisibility = new Animated.Value(1);
    var videoDuration = 10704;
    var position; */

    
    
    /* var newProgressBarButtonOffset = 16/progressBarWidth;
    var videoBoxOffset = isPortrait() ? 0 : (Dimensions.get('window').width*0.95-22)-444.45; */

    
    function updateVolume() {
        if (volumeControlButtonIcon == 'volume-off') {
            props.videoRef.current.setIsMutedAsync(false);
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
                videoRef.current.pauseAsync();
                setPlayerControlButtonIcon('play');
                break;

            case 'replay':
                videoRef.current.replayAsync();
                setPlayerControlButtonIcon('pause');
                break;
        }
    }

    /* function updateProgressBar(playbackStatus) {
        if (playbackStatus.isPlaying) {
            if (shouldProgress) {
                currentVideoPosition = playbackStatus.positionMillis/videoDuration;
                //alert(playbackStatus.positionMillis)
                if (currentVideoPosition <= 1-progressBarButtonOffset) {
                    filledBarRef.current.setNativeProps({
                        style: {
                            width: (currentVideoPosition+progressBarButtonOffset/2)*100 + '%'
                        }
                    });
                    progressBarButtonRef.current.setNativeProps({
                        style: {
                            left: currentVideoPosition*100 + '%'
                        }
                    });
                }
            }
        }
        if (playbackStatus.didJustFinish) {
            filledBarRef.current.setNativeProps({
                style: {
                    width: '100%'
                }
            });
            progressBarButtonRef.current.setNativeProps({
                style: {
                    left: null,
                    end: 0
                }
            });
        }
    } */

    /* function getPosition(e) {
        shouldProgress = false;
        position = (e.nativeEvent.pageX-Dimensions.get('window').width*0.025-11-videoBoxOffset/2-10-8)/progressBarWidth;
        if ( position >= 0 && position <= 1-newProgressBarButtonOffset ) {
            progressBarButtonRef.current.setNativeProps({
                style: {
                    height: 16,
                    width: 16,
                    left: position*100 + '%'
                }
            });
            filledBarRef.current.setNativeProps({
                style: {
                    width: (position+newProgressBarButtonOffset/2)*100 + '%'
                }
            });
        } else {
            if (position < 0) {
                position = 0;
            }
        }
    }
    
    function setPlaybackPosition() {
        progressBarButtonRef.current.setNativeProps({
            style: {
                height: 12,
                width: 12
            }
        });
        props.videoRef.current.pauseAsync().then(
            () => {
                props.videoRef.current.playFromPositionAsync(position*videoDuration).then(
                    () => {
                        shouldProgress = true;
                    }
                );
            }
        );      
    } */

    return(
        <Animated.View
            ref={controlBarRef}
            style={{ ...videoStyles.controlBar, opacity: 0.5 }}
        >
            <View style={videoStyles.progressBar}>
                <View style={videoStyles.fillBar}>
                    <View
                        ref={filledBarRef}
                        style={{
                            ...videoStyles.alreadyFilledBar,
                            width: 0
                        }}
                    />
                </View>
                <View
                    ref={progressBarButtonRef}
                    hitSlop={{ left: 14, right: 14 }}
                    style={{
                        ...videoStyles.progressControlButton,
                        left: 0,
                        end: 0
                    }}/* 
                    onMoveShouldSetResponder={e => true}
                    onResponderMove={getPosition} */
                />
            </View>
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