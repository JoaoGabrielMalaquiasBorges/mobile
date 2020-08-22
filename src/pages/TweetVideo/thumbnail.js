import * as VideoThumbnails from 'expo-video-thumbnails'
import tweetObject from '../Model'

const tweet = tweetObject

export async function generateThumbnail () {
  const { uri } =  await VideoThumbnails.getThumbnailAsync(
    tweet.extended_entities.media[0].video_info.variants[0].url,
    { time: tweet.extended_entities.media[0].video_info.duration_millis }
  )
  return uri
}
