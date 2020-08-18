import React, { useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native'
import { Video } from 'expo-av';
import ControlBar, { fadeControlBar } from "./ControlBar";
import InitialButton from './InitialButton'
import { reRenderPlayback } from './ControlBar/Controls/Playback';
import { updateProgressBar, finishProgress } from './ControlBar/ProgressBar'
import TouchableArea from './TouchableArea'
import ExternalLink, { showExternalLink } from './ExternalLink'
import { video } from './styles';

/* Video.setAudioModeAsync({
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
}) */


function TweetVideo(props) {
    const tweet = props.video;
    const videoDuration = tweet.video_info.duration_millis
    const videoRef = React.createRef();

    useEffect(() => {
        if (props.route.params != undefined) {
            videoRef.current.setStatusAsync(props.route.params.playbackStatus)
        }
    }, [props.route.params])

    function onPlaybackStatusUpdate(playbackStatus) {
        if (props.navigation.isFocused()) {
            if (playbackStatus.isPlaying) {
                updateProgressBar(playbackStatus.positionMillis/videoDuration)
                return
            }
            if (playbackStatus.didJustFinish) {
                finishProgress()
                reRenderPlayback(props.route, 'replay')
                fadeControlBar(0, 0, 1)
                showExternalLink()
            }
        }
    }
    
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={video.container}>
                <Video
                    resizeMode="cover"
                    ref={videoRef}
                    source={/* require('../../assets/theCoralSong.mp4') */{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' /* tweetVideo.video_info.variants[0].url */ }}
                    shouldPlay={false}
                    isMuted={true}
                    style={video.videoFrame}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                />
                <ControlBar route={props.route} navigation={props.navigation} videoRef={videoRef} />
                <InitialButton videoRef={videoRef} />
                <TouchableArea/>
                <ExternalLink/>
            </View>
        </View>
    );
}

export default TweetVideo;