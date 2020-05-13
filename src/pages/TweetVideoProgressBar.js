import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';
import tweetObject from './Model'

// ScreenOrientation.getOrientationAsync().then(({ orientation }) => alert(orientation))

var globalFilledBarRef
var globalProgressBarButtonRef

function isPortrait() {
    if ( Dimensions.get('window').height > Dimensions.get('window').width ) {
        return true;
    } else {
        return false;
    }
}

// Dimensions.get('window').width*(Math.floor(width.portraitWidth)-width.portraitWidth)*(-1)+Math.floor(width.portraitWidth)
var progressBarWidth// = isPortrait() ? Dimensions.get('window').width*0.95-42 : 424.45;
var progressBarButtonOffset// = videoStyles.progressControlButton.width/progressBarWidth;
var shouldProgress = true

function TweetVideoProgressBar({ videoRef, width/* , videoBoxOffset */ }) {
    const tweet = tweetObject
    const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis
    const filledBarRef = React.createRef()
    const progressBarButtonRef = React.createRef()

    const frac = Math.floor(width.portraitWidth)-width.portraitWidth == 0
        ? 1
        : (Math.floor(width.portraitWidth)-width.portraitWidth)*(-1)

    const int = Math.floor(width.portraitWidth)

    var position
    var newProgressBarButtonOffset// = 16/progressBarWidth;
    var _videoBoxOffset

    globalFilledBarRef = filledBarRef
    globalProgressBarButtonRef = progressBarButtonRef

    progressBarWidth = isPortrait()
        ? Dimensions.get('window').width*frac+int
        : Dimensions.get('window').width*Math.floor(frac)+width.landscapeWidth

    _videoBoxOffset = isPortrait()
        ? 0
        : (Dimensions.get('window').width*frac+videoBoxOffset)*Math.ceil(1-frac)

    progressBarButtonOffset = videoStyles.progressControlButton.width/progressBarWidth
    newProgressBarButtonOffset = 16/progressBarWidth

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

            videoRef.current.pauseAsync().then(() => {
                videoRef.current.playFromPositionAsync(0.99*videoDuration);
            });
        } else {
            videoRef.current.pauseAsync().then(() => {
                videoRef.current.playFromPositionAsync(position*videoDuration).then(() => {
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

export default TweetVideoProgressBar;