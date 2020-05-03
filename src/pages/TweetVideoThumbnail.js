import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text, Image } from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails'
import tweetObject from './Model'

/* function TweetVideoThumbnail () {
  const tweet = tweetObject
  const [globalUri, setGlobalUri] = useState('')

  async function generateThumbnail () {
    const { uri } = await VideoThumbnails.getThumbnailAsync(
      tweet.extended_entities.media[0].video_info.variants[0].url,
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
                width: 300,
                position: 'absolute'
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

export default TweetVideoThumbnail */

export async function generateThumbnail () {
  const tweet = tweetObject
  const { uri } = await VideoThumbnails.getThumbnailAsync(
    tweet.extended_entities.media[0].video_info.variants[0].url,
    { time: 10704 }
  )
  // alert(JSON.stringify(uri))
  return uri
}