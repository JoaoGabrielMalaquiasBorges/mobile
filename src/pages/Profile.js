import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { Video } from 'expo-av'
import Icon from './CustomIcon'
import * as Font from 'expo-font'
import tweetObject from './Model'
import { CommonActions } from '@react-navigation/native'

/* global alert */

function Profile ({ route, navigation }) {
  Font.loadAsync({
    FontName: require('../../assets/fonts/icomoon.ttf')
  })

  const tweet = tweetObject
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()

  useEffect(() => {
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
          status={notFullscreenSizeVideo.playbackStatus}
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
      </View>
    </>
  )
}

export default Profile
