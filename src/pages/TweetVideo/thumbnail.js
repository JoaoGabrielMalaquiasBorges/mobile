import * as VideoThumbnails from 'expo-video-thumbnails'

export async function generateThumbnail (video) {
  const { uri } =  await VideoThumbnails.getThumbnailAsync(
    video.video_info.variants[0].url,
    { time: video.video_info.duration_millis }
  )
  return uri
}
