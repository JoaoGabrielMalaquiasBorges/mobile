import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from '../CustomIcon';
import { video } from './styles'
import Controls from "./Controls";
import { testFunction, finishProgress } from './ProgressBar';
import { useFocusEffect } from '@react-navigation/native'
import runOnce from "../../../utils/once.js"
import { reRenderPlayback } from './Playback'
import ControlBar from "./ControlBar";

function TweetVideo(props) {
    const tweetVideo = props.video;
    const videoDuration = 10704;
    const videoRef = React.createRef();

    var prevParams
    var currentVideoPosition = 0

    useFocusEffect(
        React.useCallback(() => {
            if (props.route.params != prevParams) {
                prevParams = props.route.params
                // alert(JSON.stringify(prevParams))
                videoRef.current.setStatusAsync(props.route.params.playbackStatus)
            }
        }, [props.route.params])
    );

    function onPlaybackStatusUpdate(playbackStatus) {
        if (playbackStatus.isPlaying) {
            currentVideoPosition = playbackStatus.positionMillis/videoDuration;
            testFunction(currentVideoPosition);
        } else {
            if (playbackStatus.didJustFinish) {
                finishProgress()
                reRenderPlayback(props.route, 'replay')
            }
        }
    }
    
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={video.container}>
                <Video
                    resizeMode="cover"
                    ref={videoRef}
                    source={/* require('../../assets/theCoralSong.mp4') */{ uri: tweetVideo.video_info.variants[0].url }}
                    shouldPlay={false}
                    isMuted={true}
                    style={video.videoFrame}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                />
                <TouchableWithoutFeedback>
                    <View style={video.touchableArea} />
                </TouchableWithoutFeedback>
                <ControlBar route={props.route} navigation={props.navigation} videoRef={videoRef}/>
            </View>
        </View>
    );
}

export default TweetVideo;