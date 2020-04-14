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

function TweetVideoFunction(props) {
    const video = props.video;
    const videoDuration = 10704;
    const videoRef = React.createRef();

    var currentVideoPosition = 0;


    function _onPlaybackStatusUpdate(playbackStatus) {
        //alert(JSON.stringify(props.navigation.state))
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
                <TweetVideoControlBar videoRef={videoRef} navigation={props.navigation}/>
            </View>
        </View>
    );
}

export default TweetVideoFunction;