import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';

function TweetVideoFunction(props) {
    const [volumeControlButtonIcon, setVolumeControlButtonIcon] = useState('volume-off');
    const [playerControlButtonIcon, setPlayerControlButtonIcon] = useState('play');

    useEffect(() => {
        ScreenOrientation.addOrientationChangeListener( e => {
                if ( isPortrait() ) {
                    progressBarWidth = Dimensions.get('window').width*0.95-42;
                    progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth;
                    newProgressBarButtonOffset = 16/progressBarWidth;
                } else {
                    progressBarWidth = 424.45;
                    progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth;
                    newProgressBarButtonOffset = 16/progressBarWidth;
                }
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    });

    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });

    var video = props.video;
    var controlBarVisibility = new Animated.Value(1);
    var shouldProgress = true;
    var videoDuration = 10704;
    var position;
    var currentVideoPosition;

    function isPortrait() {
        if ( Dimensions.get('window').height > Dimensions.get('window').width ) {
            return true;
        } else {
            return false;
        }
    }
    
    var progressBarWidth = isPortrait() ? Dimensions.get('window').width*0.95-42 : 424.45;
    var progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth;
    var newProgressBarButtonOffset = 16/progressBarWidth;

    const videoRef = React.createRef();
    const controlBarRef = React.createRef();
    const filledBarRef = React.createRef();
    const progressBarButtonRef = React.createRef();

    function updateVolume() {
        if (volumeControlButtonIcon == 'volume-off') {
            videoRef.current.setIsMutedAsync(false);
            setVolumeControlButtonIcon('volume-high');
        }
        else {
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

    function updateProgressBar(playbackStatus) {
        if (playbackStatus.isPlaying) {
            if (shouldProgress) {
                currentVideoPosition = playbackStatus.positionMillis/videoDuration;
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
                } else {
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
            }
        }
    }

    function getPosition(e) {
        shouldProgress = false;
        var videoBoxOffset = isPortrait() ? 0 : (Dimensions.get('window').width*0.95-22)-444.45;
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
        if (position > 1-newProgressBarButtonOffset) {
            position = 1-progressBarButtonOffset;
        }
        progressBarButtonRef.current.setNativeProps({
            style: {
                height: 12,
                width: 12,
                /* left: position*100 + '%' */
            }
        });
        /* filledBarRef.current.setNativeProps({
            style: {
                width: (position+newProgressBarButtonOffset/2+newProgressBarButtonOffset-progressBarButtonOffset)*100 + '%'
            }
        }); */
        videoRef.current.pauseAsync().then(
            () => {
                videoRef.current.playFromPositionAsync(position*videoDuration).then(
                    () => {
                        shouldProgress = true;
                    }
                );
            }
        );
        if ( playerControlButtonIcon == 'play' || playerControlButtonIcon == 'replay' ) {
            setPlayerControlButtonIcon('pause');
        }      
    }

    return(
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={videoStyles.videoBox}>
                <Video
                    resizeMode="cover"
                    ref={videoRef}
                    source={/* require('../../assets/theCoralSong.mp4') */{ uri: video.video_info.variants[0].url }}
                    shouldPlay={false}
                    isMuted={true}
                    style={videoStyles.video}
                    onPlaybackStatusUpdate={updateProgressBar}
                />
                <TouchableWithoutFeedback>
                    <View style={videoStyles.touchableArea} />
                </TouchableWithoutFeedback>
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
                            }}
                            onMoveShouldSetResponder={e => true}
                            onResponderMove={getPosition}
                            onResponderRelease={setPlaybackPosition}
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
                            style={{height: 20}}
                            onPress={updateVolume}
                        />
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

export default TweetVideoFunction;