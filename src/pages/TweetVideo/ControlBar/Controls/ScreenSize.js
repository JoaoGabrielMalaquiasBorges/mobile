import React, { useEffect, useState } from 'react';
import Icon from '../../../CustomIcon'
import { generateThumbnail } from '../../thumbnail';

function ScreenSize ({ route, navigation, video, videoRef, fadeControlBar }) {
    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return 'skip'
        } else {
            return 'fillScreen'
        }
    })

    const videoDuration = video.video_info.duration_millis

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) { // When going back
            setButtonName('fillScreen')
        }
    }, [route.params])

    async function resizeVideo () {
        if (buttonName == 'fillScreen') {
            setButtonName('skip')
            const videoThumbnail = await generateThumbnail(video)
    
            videoRef.current.getStatusAsync().then(playbackStatus => {
                videoRef.current.pauseAsync().then(() => {
                    navigation.navigate('FullscreenSizeVideo', {
                        video: video,
                        playbackStatus: playbackStatus,
                        routeKey: route.key,
                        thumbnail: videoThumbnail,
                        playbackButton: playbackStatus.isPlaying
                            ? 'pause'
                            : playbackStatus.positionMillis == videoDuration
                                ? 'replay'
                                : 'play',
                        volumeButton: playbackStatus.isMuted ? 'volume-off' : 'volume-high'
                    })
                    fadeControlBar(0, 0, 0)
                })
            })
        } else {
            navigation.goBack()
        }
        
    }

    return (
        <Icon
            name={buttonName}
            size={20}
            color="white"
            onPress={resizeVideo}
        />
    )
    
}

export default ScreenSize