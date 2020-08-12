import { CommonActions } from '@react-navigation/native'
import { Video } from 'expo-av'
import * as Font from 'expo-font'
import React, { useEffect } from 'react'
import { Animated, StatusBar, View } from 'react-native'
import Icon from '../CustomIcon'
import tweetObject from '../Model'
import ControlBar, { fadeControlBar } from './ControlBar'
import TouchableArea from './TouchableArea'
import ExternalLink, { showExternalLink } from './ExternalLink'
import { reRenderPlayback } from './ControlBar/Controls/Playback'
import { finishProgress, testFunction } from './ControlBar/ProgressBar'
import { fullscreenSizeVideo } from './styles';

/* global alert */

function FullscreenSizeVideo ({ route, navigation }) {

  Font.loadAsync({
    FontName: require('../../../assets/fonts/icomoon.ttf')
  })

  const tweet = tweetObject
  const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()

  var visibility = new Animated.ValueXY({ x: 1, y: 0 })
  var showingThumbnail = false
  var shouldShowVideo = false
  var currentVideoPosition = 0

  useEffect(() => {
    fullscreenVideoRef.current.setStatusAsync({
      shouldPlay: notFullscreenSizeVideo.playbackStatus.shouldPlay,
      positionMillis: notFullscreenSizeVideo.playbackStatus.positionMillis,
      isMuted: notFullscreenSizeVideo.playbackStatus.isMuted
    }).then(playbackStatus => {
      if (showingThumbnail) {
        shouldShowVideo = true
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
            volumeButton: playbackStatus.isMuted ? 'volume-off' : 'volume-high'
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
      duration: 1
    }).start(({ finished }) => { showingThumbnail = true })
  }

  function showVideo () {
    Animated.timing(visibility, {
      toValue: { x: 1, y: 0 },
      duration: 1
    }).start(({ finished }) => { showingThumbnail = false })
  }

  function onPlaybackStatusUpdate (playbackStatus) {
    if (playbackStatus.isPlaying) {
        currentVideoPosition = playbackStatus.positionMillis/videoDuration
        testFunction(currentVideoPosition)
    } else {
      if (playbackStatus.didJustFinish) {
        finishProgress()
        reRenderPlayback(route, 'replay')
        fadeControlBar(0, 0, 1)
        showExternalLink()
      } else {
        if (shouldShowVideo && playbackStatus.positionMillis < videoDuration) {
          shouldShowVideo = false
          showVideo()
        }
      }
    }
  }

  return (
    <>
      <StatusBar hidden />
      <View style={fullscreenSizeVideo.container}>
        <Animated.View style={{ opacity: visibility.x }}>
          <Video
            ref={fullscreenVideoRef}
            resizeMode='contain'
            source={{
              uri:
                tweet.extended_entities.media[0].video_info.variants[0].url
                // 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                // 'https://www.w3schools.com/html/mov_bbb.mp4'
            }}
            style={fullscreenSizeVideo.videoFrame}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        </Animated.View>
        <Animated.Image
          resizeMode='contain'
          style={{ ...fullscreenSizeVideo.videoFrame, position: 'absolute', opacity: visibility.y}}
          source={{ uri: notFullscreenSizeVideo.thumbnail }}
        />
        <ControlBar route={route} navigation={navigation} videoRef={fullscreenVideoRef} />
        <TouchableArea/>
        <ExternalLink/>
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
