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
import runOnce from "../../utils/once.js"

function TweetVideoFunction(props) {
    const video = props.video;
    const videoDuration = 10704;
    const videoRef = React.createRef();

    var prevParams
    var currentVideoPosition = 0

    useFocusEffect(
        React.useCallback(() => {
            if (props.route.params != prevParams) {
                prevParams = props.route.params
                // alert(JSON.stringify(prevParams))
                videoRef.current.setStatusAsync(props.route.params).then((playbackStatus) => {
                    if (playbackStatus.positionMillis == videoDuration) {
                        finishProgress()
                    }
                })
            }
        }, [props.route.params])
    );

    function _onPlaybackStatusUpdate(playbackStatus) {
        if (playbackStatus.isPlaying) {
            currentVideoPosition = playbackStatus.positionMillis/videoDuration;
            // runOnce(() => setTimeout(() => alert(currentVideoPosition), 1000))
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
                <TweetVideoProgressBar
                    videoRef={videoRef}
                    width={{
                        portraitWidth: 0.95-42, // Dimensions.get('window').width*0.95-42
                        landscapeWidth: 424.45
                    }}
                    videoBoxOffset={(-22)-444.45} // (Dimensions.get('window').width*0.95-22)-444.45
                />
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