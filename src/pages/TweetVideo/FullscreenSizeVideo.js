import React, { useEffect } from 'react'
import { Animated, StatusBar, View } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { Video } from 'expo-av'
import * as Font from 'expo-font'
import Icon from '../CustomIcon'
import tweetObject from '../Model'
import { handleUpdate } from '../TweetVideo'
import ControlBar, { fadeControlBar } from './ControlBar'
import TouchableArea from './TouchableArea'
import ExternalLink, { showExternalLink } from './ExternalLink'
import { reRenderPlayback } from './ControlBar/Controls/Playback'
import { updateProgressBar, finishProgress } from './ControlBar/ProgressBar'
import { fullscreenSizeVideo } from './styles';

/* global alert */

function FullscreenSizeVideo ({ route, navigation }) {
  const videoDuration = route.params.video.video_info.duration_millis
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()

  var visibility = new Animated.ValueXY({ x: 1, y: 0 })
  var showingThumbnail = false

  useEffect(() => {
    fullscreenVideoRef.current.setStatusAsync({
      shouldPlay: notFullscreenSizeVideo.playbackStatus.shouldPlay
    }).then(playbackStatus => {
      fadeControlBar(0, 0, 0)
      if (playbackStatus.shouldPlay) {
        fadeControlBar(500, 1500, 0)
      }
    })

    if (notFullscreenSizeVideo.playbackStatus.positionMillis == videoDuration) {
      finishProgress()
      showExternalLink()
    }

    const unsubscribe = navigation.addListener('transitionStart', () => {
      fullscreenVideoRef.current.getStatusAsync().then(playbackStatus => {
        navigation.dispatch({
          ...CommonActions.setParams({
            playbackStatus: playbackStatus,
            playbackButton: playbackStatus.isPlaying
              ? 'pause'
              : playbackStatus.positionMillis == videoDuration
                  ? 'replay'
                  : 'play',
            volumeButton: playbackStatus.isMuted ? 'volume-off' : 'volume-high',
            thumbnail: notFullscreenSizeVideo.thumbnail,
          }),
          source: notFullscreenSizeVideo.routeKey
        })
      })
    })
  
    return () => {
      unsubscribe()
      fullscreenVideoRef.current.unloadAsync()
    }
  })

  if (notFullscreenSizeVideo.playbackStatus.positionMillis == videoDuration) {
    Animated.timing(visibility, {
      toValue: { x: 0, y: 1 },
      duration: 0
    }).start(() => { showingThumbnail = true })
  }

  return (
    <>
      <StatusBar hidden />
      <View style={fullscreenSizeVideo.container}>
        <Animated.View style={{ opacity: visibility.x }}>
          <Video
            ref={fullscreenVideoRef}
            resizeMode='contain'
            source={
              // require('../../assets/theCoralSong.mp4')
              { uri: route.params.video.video_info.variants[0].url }
            }
            status={{
              shouldPlay: false,
              positionMillis: notFullscreenSizeVideo.playbackStatus.positionMillis,
              isMuted: notFullscreenSizeVideo.playbackStatus.isMuted
            }}
            style={fullscreenSizeVideo.videoFrame}
            onPlaybackStatusUpdate={playbackStatus => {
              handleUpdate(
                route,
                navigation,
                playbackStatus,
                videoDuration,
                showingThumbnail,
                visibility
              )
            }}
          />
        </Animated.View>
        <Animated.Image
          resizeMode='contain'
          style={{ ...fullscreenSizeVideo.videoFrame, position: 'absolute', opacity: visibility.y}}
          source={{ uri: notFullscreenSizeVideo.thumbnail }}
        />
        <ControlBar route={route} navigation={navigation} video={route.params.video} videoRef={fullscreenVideoRef} />
        <TouchableArea/>
        <ExternalLink route={route} />
      </View>
      {/* <Icon
        name='play'
        size={20}
        color='black'
        style={{ marginTop: 10, height: 20, marginLeft: 100 }}
        onPress={() => {
          // fullscreenVideoRef.current.playAsync().then(alert('hi'))
          Animated.timing(visibility, {
            toValue: { x: 1, y: 0 },
            duration: 1
          }).start()
        }}
      /> */}
    </>
  )
}

export default FullscreenSizeVideo
