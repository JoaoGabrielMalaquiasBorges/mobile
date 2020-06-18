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
  const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()

  var visibility = new Animated.ValueXY({ x: 1, y: 0 })
  var showingThumbnail = false
  var shouldShowVideo = false
  var currentVideoPosition = 0

  if (notFullscreenSizeVideo.playbackStatus.positionMillis == videoDuration) {
    Animated.timing(visibility, {
      toValue: { x: 0, y: 1 },
      duration: 1
    }).start(({ finished }) => { showingThumbnail = true })
  }

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

  function showVideo () {
    // alert('ho')
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
      } else {
        if (shouldShowVideo && playbackStatus.positionMillis < videoDuration) {
          shouldShowVideo = false
          showVideo()
          // alert(playbackStatus.positionMillis)
          // setTimeout(() => alert(initialVideoPosition), 1000)
        }
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
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
          <Timer navigation={navigation} route={route}/>
        </View>
      </View>
      <Icon
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
      />
    </>
  )
}

export default Profile
