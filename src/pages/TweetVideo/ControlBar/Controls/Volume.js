import React, { useEffect, useState } from 'react';
import Icon from '../../../CustomIcon';

function Volume ({ route, navigation, videoRef }) {
    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return route.params.volumeButton
        } else {
            return 'volume-off'
        }
    })

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            setButtonName(route.params.volumeButton)
        }
    }, [route.params])

    function muteUnmute (value) {
        videoRef.current.getStatusAsync().then(playbackStatus => {
            if (playbackStatus.isPlaying) {
                videoRef.current.pauseAsync()
                videoRef.current.setStatusAsync({ isMuted: value == 'mute' ? true : false, shouldPlay: true })
            } else {
                videoRef.current.setStatusAsync({ isMuted: value == 'mute' ? true : false })
            }
        })
    }
    
    function updateVolume() {
        if (buttonName == 'volume-off') {
            muteUnmute('unmute')
            setButtonName('volume-high');
        } else {
            muteUnmute('mute')
            setButtonName('volume-off');
        }
    }

    return (
        <Icon
            name={buttonName}
            size={20}
            color="white"
            onPress={updateVolume}
        />
    )
}

export default Volume