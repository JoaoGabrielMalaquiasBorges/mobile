import React, { useState, useEffect } from 'react'
import { View, Dimensions, StatusBar, Text, Animated, Image } from 'react-native'
import { Video } from 'expo-av'
import Icon from './CustomIcon'
import * as Font from 'expo-font'
import tweetObject from './Model'
import { CommonActions } from '@react-navigation/native'
import TweetVideoControlBar from "./TweetVideoControlBar"
import TweetVideoProgressBar from "./TweetVideoProgressBar"
import { testFunction, finishProgress } from './TweetVideoProgressBar'
import { container } from './TweetVideo/styles'
import Timer, { start, stop } from './TweetVideo/Timer'

/* global alert */

function Profile ({ route, navigation }) {
  Font.loadAsync({
    FontName: require('../../assets/fonts/icomoon.ttf')
  })

  const tweet = tweetObject
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()
  const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis;

  var currentVideoPosition = 0
  var visibility = new Animated.ValueXY({ x: 1, y: 0 })
  var showingThumbnail = false

  if (notFullscreenSizeVideo.playbackStatus.positionMillis == videoDuration) {
    Animated.timing(visibility, {
      toValue: { x: 0, y: 1 },
      duration: 1
    }).start(({ finished }) => { showingThumbnail = true })
  }

  /* if (currentVideoPosition != 0) {
    alert('hi')
  } */

  useEffect(() => {
    fullscreenVideoRef.current.setStatusAsync({
      shouldPlay: notFullscreenSizeVideo.playbackStatus.shouldPlay,
      positionMillis: notFullscreenSizeVideo.playbackStatus.positionMillis,
      isMuted: notFullscreenSizeVideo.playbackStatus.isMuted
    })

    if (notFullscreenSizeVideo.playbackStatus.positionMillis == videoDuration) {
      finishProgress()
    }
    // alert(JSON.stringify(notFullscreenSizeVideo.playbackStatus))
    // alert('hi')
    // alert(notFullscreenSizeVideo.thumbnail)
    const unsubscribe = navigation.addListener('transitionStart', () => {
      fullscreenVideoRef.current.getStatusAsync().then(playbackStatus => {
        navigation.dispatch({
          ...CommonActions.setParams(playbackStatus),
          source: notFullscreenSizeVideo.routeKey
        })
      })
    })
    return () => {
      unsubscribe()
      fullscreenVideoRef.current.unloadAsync()
    }
  })

  function showVideo (playbackStatus) {
    if (playbackStatus.positionMillis > 0 && playbackStatus.positionMillis < videoDuration) {
      if (showingThumbnail) {
        Animated.timing(visibility, {
          toValue: { x: 1, y: 0 },
          duration: 1
        }).start(({ finished }) => { showingThumbnail = false })
      }
    }
  }

  function _onPlaybackStatusUpdate(playbackStatus) {
    if (playbackStatus.isPlaying) {
        currentVideoPosition = playbackStatus.positionMillis/videoDuration
        testFunction(currentVideoPosition)
    } else {
        if (playbackStatus.didJustFinish) {
          finishProgress()
        } else {
          showVideo(playbackStatus)
        }
    }
  }

  return (
    <>
      <StatusBar hidden />
      <View>
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
            style={{ height: 250, width: 300 }}/* 
            onReadyForDisplay={playbackStatus => alert(JSON.stringify(playbackStatus))} */
            onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
          />
        </Animated.View>
        <Animated.Image
          // ref={thumbnailRef}
          resizeMode='contain'
          style={{
            height: 250,
            width: 300,
            position: 'absolute',
            opacity: visibility.y
          }}
          source={{
            uri: notFullscreenSizeVideo.thumbnail
          }}
        />
        <View style={container}>
          <TweetVideoProgressBar
            videoRef={fullscreenVideoRef}
            width={{
              portraitWidth: -20, // Dimensions.get('window').width-20
              landscapeWidth: -20 // Dimensions.get('window').width-20
            }}
            videoBoxOffset={0}
          />
          <TweetVideoControlBar
            videoRef={fullscreenVideoRef}
            navigatorProps={{
                navigation: navigation,
                route: route
            }}
            controlsState={{
                playback: 'play',
                volume: 'volume-off'
            }}
          />
          <Timer navigation={navigation}/>
        </View>
      </View>
      <Icon
        name='play'
        size={20}
        color='black'
        style={{ marginTop: 10, height: 20, marginLeft: 100 }}
        onPress={() => {
          // fullscreenVideoRef.current.playAsync().then(alert('hi'))
        }}
      />
    </>
  )
}

export default Profile
