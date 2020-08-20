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
import { generateThumbnail } from './thumbnail'

/* Video.setAudioModeAsync({
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
}) */


function TweetVideo(props) {
    const tweet = props.video;
    const videoDuration = tweet.video_info.duration_millis
    const videoRef = React.createRef();
    const videoContainer = React.createRef()

    var visibility
    var videoThumbnail
    var showingThumbnail
    if (props.route.params != undefined && props.route.params.playbackStatus.positionMillis == videoDuration) {
        visibility = new Animated.ValueXY({ x: 0, y: 1 })
        videoThumbnail = props.route.params.thumbnail
        showingThumbnail = true
    } else {
        visibility = new Animated.ValueXY({ x: 1, y: 0 })
        videoThumbnail = null
        showingThumbnail = false
    }

    useEffect(() => {
        if (props.route.params != undefined) {
            videoRef.current.setStatusAsync(props.route.params.playbackStatus)
        }
    }, [props.route.params])

    function showVideo () {
        Animated.timing(visibility, {
          toValue: { x: 1, y: 0 },
          duration: 1
        }).start()
    }

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
                return
            }
            if (showingThumbnail && playbackStatus.positionMillis < videoDuration) {
                showingThumbnail = false
                showVideo()
            }
        }
    }
    
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View ref={videoContainer} style={video.container}>
                <Animated.View style={{ opacity: visibility.x }}>
                    <Video
                        resizeMode="cover"
                        ref={videoRef}
                        source={
                            // require('../../assets/theCoralSong.mp4')
                            { uri:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }
                            // { uri: tweetVideo.video_info.variants[0].url }
                        }
                        shouldPlay={false}
                        isMuted={true}
                        style={video.videoFrame}
                        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    />
                </Animated.View>
                <Animated.Image
                    style={{ height: '100%', width: '100%', position: 'absolute', opacity: visibility.y }}
                    source={{ uri: videoThumbnail }}
                />
                <ControlBar route={props.route} navigation={props.navigation} videoRef={videoRef} />
                <InitialButton videoRef={videoRef} />
                <TouchableArea/>
                <ExternalLink route={props.route} />
            </View>
        </View>
    );
}

export default TweetVideo;