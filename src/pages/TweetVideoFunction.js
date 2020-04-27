import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from './CustomIcon';
import videoStyles from '../style/index';
import TweetVideoControlBar from "./TweetVideoControlBar";
import { testFunction, finishProgress } from './TweetVideoProgressBar';
import { useFocusEffect } from '@react-navigation/native'
import TweetVideoProgressBar from "./TweetVideoProgressBar"

function TweetVideoFunction(props) {
    const video = props.video;
    const videoDuration = 10704;
    const videoRef = React.createRef();

    var currentVideoPosition = 0;

    useFocusEffect(
        React.useCallback(() => {
            if (typeof props.route.params != 'undefined') {
                videoRef.current.setStatusAsync(props.route.params)
            }
        }, [props.route.params])
    );

    function _onPlaybackStatusUpdate(playbackStatus) {
        if (playbackStatus.isPlaying) {
            currentVideoPosition = playbackStatus.positionMillis/videoDuration;
            testFunction(currentVideoPosition);
        } else {
            if (playbackStatus.didJustFinish) {
                finishProgress();
            }
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
                    onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
                />
                <TouchableWithoutFeedback>
                    <View style={videoStyles.touchableArea} />
                </TouchableWithoutFeedback>
                <TweetVideoProgressBar videoRef={videoRef} color={'green'}/>
                <TweetVideoControlBar
                    videoRef={videoRef}
                    navigatorProps={{
                        navigation: props.navigation,
                        route: props.route
                    }}
                    controls={{
                        playback: 'play',
                        volume: 'volume-off'
                    }}
                />
            </View>
        </View>
    );
}

export default TweetVideoFunction;