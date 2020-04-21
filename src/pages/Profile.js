import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { Video } from 'expo-av'
import Icon from './CustomIcon'
import * as Font from 'expo-font'
import tweetObject from './Model'

/* global alert */

function Profile ({ route, navigation }) {
  Font.loadAsync({
    FontName: require('../../assets/fonts/icomoon.ttf')
  })
  
  const tweet = tweetObject
  const notFullscreenSizeVideo = route.params
  const fullscreenVideoRef = React.createRef()

  // alert(notFullscreenSizeVideo.routeKey + '\n' + navigation.state.key)

  useEffect(() => {
    // alert( fullscreenVideoRef.current.props.source.uri );
    /* fullscreenVideoRef.current.setStatusAsync({ positionMillis: 26000 }).then(
            e => {
                alert( JSON.stringify(notFullscreenSizeVideo.playbackStatus) );
            }
        ); */
    return () => {
      fullscreenVideoRef.current.unloadAsync()
    }
  })

  /* for(var property in navigation.state) {
        alert(property + "=" + navigation.state[property]);
    } */

  return (
    <>
      <StatusBar hidden />
      {/* <NavigationEvents
                onWillBlur={
                    payload => fullscreenVideoRef.current.getStatusAsync().then(
                        playbackStatus => {
                            //notFullscreenSizeVideo.videoRef.current.setStatusAsync(playbackStatus);
                            notFullscreenSizeVideo.videoRef.current.playFromPositionAsync(5000);
                        }
                    )
                }
            /> */}
      <View>
        <Video
          ref={fullscreenVideoRef}
          resizeMode='contain'
          source={{ uri: tweet.extended_entities.media[0].video_info.variants[0].url /* 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' */ }}
          style={{ height: 250, width: 300 }}
          status={notFullscreenSizeVideo.playbackStatus}
        />
        <Icon
          name='play'
          size={20}
          color='black'
          style={{ height: 20, marginLeft: 100 }}
          onPress={() => {
            fullscreenVideoRef.current.playAsync().then(
              alert('hi')
            )
          }}
        />
      </View>
    </>
  )
}

export default Profile
