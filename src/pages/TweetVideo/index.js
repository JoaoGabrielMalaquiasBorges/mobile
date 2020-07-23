import React, { useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import ControlBar from "./ControlBar";
import { reRenderPlayback } from './ControlBar/Controls/Playback';
import { finishProgress, testFunction } from './ControlBar/ProgressBar';
import { video } from './styles';

/* Video.setAudioModeAsync({
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
}) */


function TweetVideo(props) {
    const tweetVideo = props.video;
    const videoDuration = 10704;
    const videoRef = React.createRef();
    const controlBarWrapper = React.createRef();

    var currentVideoPosition = 0
    var flag = 1
    var displayValue = new Animated.Value(flag)

    useEffect(() => {
        if (props.route.params != undefined) {
            videoRef.current.setStatusAsync(props.route.params.playbackStatus)
        }
    }, [props.route.params])

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
                <Animated.View ref={controlBarWrapper} style={{ ...video.topLayer, opacity: displayValue, zIndex: displayValue }}>
                    <ControlBar route={props.route} navigation={props.navigation} videoRef={videoRef}/>
                </Animated.View>
                <TouchableWithoutFeedback onPressIn={() => {
                    Animated.timing(displayValue, {
                        toValue: (flag-1)*(-1),
                        duration: 0
                    }).start(({ finished }) => { flag = (flag-1)*(-1) })
                }}>
                    <View style={video.touchableArea} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

export default TweetVideo;