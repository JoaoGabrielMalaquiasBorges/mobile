import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text, Animated } from 'react-native'
import { Video } from 'expo-av'
import Icon from './CustomIcon'
import * as Font from 'expo-font'
import tweetObject from './Model'
import { CommonActions } from '@react-navigation/native'
import TweetVideoControlBar from "./TweetVideoControlBar"
import TweetVideoProgressBar from "./TweetVideoProgressBar"
import { testFunction, finishProgress } from './TweetVideoProgressBar'
// import TweetVideoThumbnail from './TweetVideoThumbnail'

/* global alert */

function Profile ({ route, navigation }) {
  Font.loadAsync({
    FontName: require('../../assets/fonts/icomoon.ttf')
  })

  const tweet = tweetObject
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()
  const videoDuration = 10704;

  var currentVideoPosition = 0
  var thumbnailVisibility = new Animated.Value(1)

  useEffect(() => {
    fullscreenVideoRef.current.setStatusAsync({
      shouldPlay: notFullscreenSizeVideo.playbackStatus.shouldPlay,
      positionMillis: notFullscreenSizeVideo.playbackStatus.positionMillis,
      isMuted: notFullscreenSizeVideo.playbackStatus.isMuted
    })
    // alert(JSON.stringify(notFullscreenSizeVideo.playbackStatus))
    // alert('hi')
    alert(notFullscreenSizeVideo.thumbnail)
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

  function _onPlaybackStatusUpdate(playbackStatus) {
    if (playbackStatus.isPlaying) {
        currentVideoPosition = playbackStatus.positionMillis/videoDuration;
        testFunction(currentVideoPosition);
    } else {
        if (playbackStatus.didJustFinish) {
          // alert(JSON.stringify(playbackStatus))
          finishProgress();
        }
    }
  }

  return (
    <>
      <StatusBar hidden />
      <View>
        <Video
          ref={fullscreenVideoRef /* el => {
            fullscreenVideoRef = el
            fullscreenVideoRef.loadAsync({
              uri: 'https://www.w3schools.com/html/mov_bbb.mp4' // tweet.extended_entities.media[0].video_info.variants[0].url
            }, initialStatus={
              shouldPlay: notFullscreenSizeVideo.playbackStatus.shouldPlay,
              positionMillis: notFullscreenSizeVideo.playbackStatus.positionMillis,
              isMuted: notFullscreenSizeVideo.playbackStatus.isMuted
            })//.then(playbackStatus => alert(JSON.stringify(playbackStatus)), reason => alert(reason))
          } */}
          resizeMode='contain'
          source={{
            uri:
              tweet.extended_entities.media[0].video_info.variants[0].url
              // 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
              // 'https://www.w3schools.com/html/mov_bbb.mp4'
          }}
          style={{ height: 250, width: 300, opacity: 0 }}/* 
          onReadyForDisplay={playbackStatus => alert(JSON.stringify(playbackStatus))} */
          onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
        />
        <Animated.Image
          resizeMode='contain'
          style={{
            height: 250,
            width: 300,
            position: 'absolute',
            opacity: thumbnailVisibility
          }}
          source={{
            uri: notFullscreenSizeVideo.thumbnail
          }}
        />
        <TweetVideoProgressBar videoRef={fullscreenVideoRef} color={'red'}/>
        <TweetVideoControlBar
          videoRef={fullscreenVideoRef}
          navigatorProps={{
              navigation: navigation,
              route: route
          }}
          controls={{
              playback: 'play',
              volume: 'volume-off'
          }}
        />
      </View>
      <Icon
        name='play'
        size={20}
        color='black'
        style={{ marginTop: 10, height: 20, marginLeft: 100 }}
        onPress={() => {
          // fullscreenVideoRef.current.playAsync().then(alert('hi'))
          Animated.timing(thumbnailVisibility, {
            toValue: 0,
            duration: 1
          }).start()
        }}
      />
    </>
  )
}

export default Profile
