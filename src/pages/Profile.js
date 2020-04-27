import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { Video } from 'expo-av'
import Icon from './CustomIcon'
import * as Font from 'expo-font'
import tweetObject from './Model'
import { CommonActions } from '@react-navigation/native'
import TweetVideoControlBar from "./TweetVideoControlBar"
import TweetVideoProgressBar from "./TweetVideoProgressBar"
import { testFunction, finishProgress } from './TweetVideoProgressBar';

/* global alert */

function Profile ({ route, navigation }) {
  Font.loadAsync({
    FontName: require('../../assets/fonts/icomoon.ttf')
  })

  const tweet = tweetObject
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()
  const videoDuration = 10704;

  useEffect(() => {
    fullscreenVideoRef.current.setStatusAsync(notFullscreenSizeVideo.playbackStatus)
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
          alert('hi')
          finishProgress();
        }
    }
  }

  return (
    <>
      <StatusBar hidden />
      <View>
        <Video
          ref={fullscreenVideoRef}
          resizeMode='contain'
          source={{
            uri:
              tweet.extended_entities.media[0].video_info.variants[0].url
              /* 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' */
          }}
          style={{ height: 250, width: 300 }}
          onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
        />
        <Icon
          name='play'
          size={20}
          color='black'
          style={{ height: 20, marginLeft: 100 }}
          onPress={() => {
            fullscreenVideoRef.current.playAsync().then(alert('hi'))
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
    </>
  )
}

export default Profile
