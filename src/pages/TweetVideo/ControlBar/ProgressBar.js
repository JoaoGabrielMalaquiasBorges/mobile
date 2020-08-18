import { ScreenOrientation } from 'expo';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import tweetObject from '../../Model';
import { reRenderPlayback } from "./Controls/Playback";
import { progressBar } from './styles';
import { startTimerAt } from './Timer';
import { hideExternalLink } from '../../TweetVideo/ExternalLink'

var globalFilledBarRef
var globalProgressBarButtonRef
var progressBarWidth
var progressBarButtonOffset
var shouldProgress = true

function isPortrait() {
    // ScreenOrientation.getOrientationAsync().then(({ orientation }) => alert(orientation))
    if ( Dimensions.get('window').height > Dimensions.get('window').width ) {
        return true;
    } else {
        return false;
    }
}

function ProgressBar({ route, videoRef, width, videoBoxOffset }) {
    const tweet = tweetObject
    const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis
    const filledBarRef = React.createRef()
    const progressBarButtonRef = React.createRef()

    const frac = Math.floor(width.portraitWidth)-width.portraitWidth == 0
        ? 1
        : (Math.floor(width.portraitWidth)-width.portraitWidth)*(-1)

    const int = Math.floor(width.portraitWidth)

    var position
    var newProgressBarButtonOffset
    var _videoBoxOffset

    globalFilledBarRef = filledBarRef
    globalProgressBarButtonRef = progressBarButtonRef

    progressBarWidth = isPortrait()
        ? Dimensions.get('window').width*frac+int
        : Dimensions.get('window').width*Math.floor(frac)+width.landscapeWidth

    _videoBoxOffset = isPortrait()
        ? 0
        : (Dimensions.get('window').width*frac+videoBoxOffset)*Math.ceil(1-frac)

    progressBarButtonOffset = progressBar.button.width/progressBarWidth
    newProgressBarButtonOffset = 16/progressBarWidth

    useEffect(() => {
        ScreenOrientation.addOrientationChangeListener( e => {
                if ( isPortrait() ) {
                    progressBarWidth = Dimensions.get('window').width*frac+int
                    _videoBoxOffset = 0;
                    progressBarButtonOffset = progressBar.button.width/progressBarWidth;
                    newProgressBarButtonOffset = 16/progressBarWidth;
                } else {
                    progressBarWidth = Dimensions.get('window').width*Math.floor(frac)+width.landscapeWidth
                    _videoBoxOffset = (Dimensions.get('window').width*frac+videoBoxOffset)*Math.ceil(1-frac)
                    progressBarButtonOffset = progressBar.button.width/progressBarWidth;
                    newProgressBarButtonOffset = 16/progressBarWidth;
                }
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    });

    function getPosition(e) {
        shouldProgress = false;
        position =
            (e.nativeEvent.pageX-Dimensions.get('window').width*(1-frac)/2+int/2-_videoBoxOffset/2-8)
            /progressBarWidth;

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
                height: progressBar.button.height,
                width: progressBar.button.width
            }
        });

        hideExternalLink()

        if (position > 1-progressBarButtonOffset) {
            finishProgress();

            videoRef.current.pauseAsync().then(() => {
                videoRef.current.playFromPositionAsync(0.99*videoDuration).then(() => {
                    startTimerAt(0.99*videoDuration)                 
                });
            });
        } else {
            videoRef.current.pauseAsync().then(() => {
                videoRef.current.playFromPositionAsync(position*videoDuration).then(() => {
                    shouldProgress = true;
                    startTimerAt(position*videoDuration)
                    reRenderPlayback(route, 'pause')         
                });
            });
        }
    }

    return(
        <View style={progressBar.container}>
            <View style={progressBar.notFilledYet}>
                <View
                    ref={filledBarRef}
                    style={{
                        ...progressBar.filled,
                        width: 0
                    }}
                />
            </View>
            <View
                ref={progressBarButtonRef}
                hitSlop={{ left: 14, right: 14 }}
                style={{
                    ...progressBar.button,
                    left: 0,
                    end: 0
                }}
                onMoveShouldSetResponder={e => true}
                onResponderMove={getPosition}
                onResponderRelease={setPlaybackPosition}
            />
        </View>
    );
}

export function updateProgressBar(position) {
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

export default ProgressBar;