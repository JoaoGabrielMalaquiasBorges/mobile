import React, { useEffect, useState } from 'react';
import Icon from '../../../CustomIcon';
import tweetObject from '../../../Model';
import { generateThumbnail } from '../../thumbnail';

function ScreenSize ({ route, navigation, videoRef }) {

    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return 'skip'
        } else {
            return 'fillScreen'
        }
    })

    const tweet = tweetObject
    const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            setButtonName('fillScreen')
        }
    }, [route.params])

    async function fillScreen () {
        setButtonName('skip')
        var videoThumbnail = await generateThumbnail()

        videoRef.current.getStatusAsync().then(playbackStatus => {
            // if (playerControlButtonIcon == 'pause' /* && playbackStatus.positionMillis != 10704 */) {
                // setPlayerControlButtonIcon('play');
                // playbackStatus.shouldPlay = true;
                playbackStatus.positionMillis = 10704
            // }
            // stop()
            videoRef.current.pauseAsync()
            navigation.navigate('FullscreenSizeVideo', {
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
        })
    }

    return (
        <Icon
            name={buttonName}
            size={20}
            color="white"
            onPress={fillScreen}
        />
    )
    
}

export default ScreenSize