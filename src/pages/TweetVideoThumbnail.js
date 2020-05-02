import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text, Image } from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails'

function TweetVideoThumbnail () {
  const [globalUri, setGlobalUri] = useState('')

  async function generateThumbnail () {
    const { uri } = await VideoThumbnails.getThumbnailAsync(
      // 'https://video.twimg.com/ext_tw_video/869317980307415040/pu/vid/180x320/FMei8yCw7yc_Z7e-.mp4',
      'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      { time: 10704 }
    )
    // alert(JSON.stringify(uri))
    if (globalUri == '') {
        setGlobalUri(uri)        
    }
  }

  const thumbnail = generateThumbnail()

  if (globalUri != '') {
      return (
        <Image
            resizeMode='contain'
            style={{
                height: 250,
                width: 300
            }}
            source={{
                uri: globalUri
            }}
        />
      )
  } else {
    return null
  }
}

export default TweetVideoThumbnail