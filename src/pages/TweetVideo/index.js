import React, { useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native'
import { Video } from 'expo-av';
import ControlBar, { fadeControlBar } from "./ControlBar";
import InitialButton from './InitialButton'
import { reRenderPlayback } from './ControlBar/Controls/Playback';
import { updateProgressBar, finishProgress } from './ControlBar/ProgressBar'
import TouchableArea from './TouchableArea'
import ExternalLink, { showExternalLink } from './ExternalLink'
import { tweetVideo } from './styles';

/* Video.setAudioModeAsync({
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
}) */

export function showVideo (visibility) {
    Animated.timing(visibility, {
      toValue: { x: 1, y: 0 },
      duration: 1
    }).start()
}

export function handleUpdate (route, navigation, playbackStatus, videoDuration, showingThumbnail, visibility) {
    if (navigation.isFocused()) {
        if (playbackStatus.isPlaying) {
            updateProgressBar(playbackStatus.positionMillis/videoDuration)
            return
        }
        if (playbackStatus.didJustFinish) {
            finishProgress()
            reRenderPlayback(route, 'replay')
            fadeControlBar(0, 0, 1)
            showExternalLink()
            return
        }
        if (showingThumbnail && playbackStatus.positionMillis < videoDuration) {
            showingThumbnail = false
            showVideo(visibility)
        }
    }
}

function TweetVideo({ route, navigation, video }) {
    const videoDuration = video.video_info.duration_millis
    const videoRef = React.createRef()

    var visibility
    var videoThumbnail
    var showingThumbnail
    if (route.params != undefined && route.params.playbackStatus.positionMillis == videoDuration) {
        visibility = new Animated.ValueXY({ x: 0, y: 1 })
        videoThumbnail = route.params.thumbnail
        showingThumbnail = true
    } else {
        visibility = new Animated.ValueXY({ x: 1, y: 0 })
        videoThumbnail = null
        showingThumbnail = false
    }

    useEffect(() => {
        if (route.params != undefined) {
            videoRef.current.setStatusAsync(route.params.playbackStatus).then(playbackStatus => {
                fadeControlBar(0, 0, 1)
                if (playbackStatus.shouldPlay) {
                  fadeControlBar(500, 1500, 0)
                }
            })
        }
    }, [route.params])
    
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={tweetVideo.container}>
                <Animated.View style={{ opacity: visibility.x }}>
                    <Video
                        resizeMode="cover"
                        ref={videoRef}
                        source={
                            // require('../../assets/theCoralSong.mp4')
                            { uri: video.video_info.variants[0].url }
                        }
                        shouldPlay={false}
                        isMuted={true}
                        style={tweetVideo.frame}
                        onPlaybackStatusUpdate={playbackStatus => {
                            handleUpdate(route, navigation, playbackStatus, videoDuration, showingThumbnail, visibility)
                        }}
                    />
                </Animated.View>
                <Animated.Image
                    style={{ height: '100%', width: '100%', position: 'absolute', opacity: visibility.y }}
                    source={{ uri: videoThumbnail }}
                />
                <ControlBar route={route} navigation={navigation} videoRef={videoRef} />
                <InitialButton videoRef={videoRef} />
                <TouchableArea/>
                <ExternalLink route={route} />
            </View>
        </View>
    );
}

export default TweetVideo;