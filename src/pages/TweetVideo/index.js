import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
    const controlBarRef = React.createRef();

    var currentVideoPosition = 0
    var controlBarVisibility = 1

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
                <TouchableWithoutFeedback onPressIn={() => {
                    controlBarVisibility = controlBarVisibility == 1 ? 0 : 1
                    controlBarRef.current.setNativeProps({style: { zIndex: 2, opacity: controlBarVisibility }})
                }}>
                    <View style={{ ...video.touchableArea, zIndex: 1 }} />
                </TouchableWithoutFeedback>
                <View ref={controlBarRef} style={{ zIndex: 2, opacity: controlBarVisibility }}>
                    <ControlBar route={props.route} navigation={props.navigation} videoRef={videoRef}/>
                </View>
            </View>
        </View>
    );
}

export default TweetVideo;