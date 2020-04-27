import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';

var globalFilledBarRef
var globalProgressBarButtonRef

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

function TweetVideoControlBar(props) {
    const filledBarRef = React.createRef();
    const progressBarButtonRef = React.createRef();

    var videoDuration = 10704;
    var position = null;
    var newProgressBarButtonOffset = 16/progressBarWidth;
    var videoBoxOffset = isPortrait() ? 0 : (Dimensions.get('window').width*0.95-22)-444.45;

    globalFilledBarRef = filledBarRef
    globalProgressBarButtonRef = progressBarButtonRef

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

    function getPosition(e) {
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
                height: videoStyles.progressControlButton.height,
                width: videoStyles.progressControlButton.width
            }
        });

        if (position > 1-progressBarButtonOffset) {
            finishProgress();

            props.videoRef.current.pauseAsync().then(() => {
                props.videoRef.current.playFromPositionAsync(0.99*videoDuration);
            });
        } else {
            props.videoRef.current.pauseAsync().then(() => {
                props.videoRef.current.playFromPositionAsync(position*videoDuration).then(() => {
                    shouldProgress = true;
                });
            });
        }
    }

    return(
        <View style={videoStyles.controlBar}>
            <View style={videoStyles.progressBar}>
                <View style={videoStyles.fillBar}>
                    <View
                        ref={filledBarRef}
                        style={{
                            ...videoStyles.alreadyFilledBar,
                            width: 0,
                            backgroundColor: props.color
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
        </View>
    );
}

export function testFunction(position) {
    const filledBarRef = globalFilledBarRef
    const progressBarButtonRef = globalProgressBarButtonRef

    if (shouldProgress) {
        if (position > 1-progressBarButtonOffset) {
            position = 1-progressBarButtonOffset;
        }

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
    }
}

export function finishProgress() {
    const filledBarRef = globalFilledBarRef
    const progressBarButtonRef = globalProgressBarButtonRef

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

export default TweetVideoControlBar;