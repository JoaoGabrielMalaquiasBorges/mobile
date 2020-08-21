import * as VideoThumbnails from 'expo-video-thumbnails'
import tweetObject from '../Model'

const tweet = tweetObject
var uri

export async function generateThumbnail () {
  if (uri === undefined) {
    ({ uri } = await VideoThumbnails.getThumbnailAsync(
      tweet.extended_entities.media[0].video_info.variants[0].url,
      { time: tweet.extended_entities.media[0].video_info.duration_millis }
    ))
  }
  // alert(JSON.stringify(uri))
  return uri
}
