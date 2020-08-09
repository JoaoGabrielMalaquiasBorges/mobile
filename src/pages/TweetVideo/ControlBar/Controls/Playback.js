import EventEmitter from 'events';
import React, { useEffect, useState } from 'react';
import Icon from '../../../CustomIcon';
import { startTimer, startTimerAt, stopTimer } from '../Timer';

const render = new EventEmitter()
var toName

export function reRenderPlayback (route, name) {
    toName = name
    if (route.name == 'Main') {
        render.emit('fromMain')
    } else {
        render.emit('fromFullscreenSizeVideo')
    }
}

function Playback ({ route, navigation, videoRef }) {
    const [buttonName, setButtonName] = useState(() => {
        if (route.name == 'FullscreenSizeVideo') {
            return route.params.playbackButton
        } else {
            return 'play'
        }
    })

    function mainListener () {
        setButtonName(toName)
    }

    function fullscreenSizeVideoListener () {
        setButtonName(toName)
    }

    useEffect(() => {
        if (route.name == 'Main') {
            render.addListener('fromMain', mainListener)
        } else {
            render.addListener('fromFullscreenSizeVideo', fullscreenSizeVideoListener)
        }

        if (route.name == 'Main' && route.params != undefined) { // When going back from fullscreen mode
            setButtonName(route.params.playbackButton)
        }

        return () => {
            if (route.name == 'Main') {
                render.removeListener('fromMain', mainListener)
            } else {
                render.removeListener('fromFullscreenSizeVideo', fullscreenSizeVideoListener)
            }
        }
    }, [route.params])

    function updateVideoPlayback () {
        switch (buttonName) {
            case 'play':
                videoRef.current.playAsync()
                startTimer()
                setButtonName('pause')
                break;

            case 'pause':
                videoRef.current.pauseAsync()
                stopTimer()
                setButtonName('play')
                break;

            case 'replay':
                videoRef.current.pauseAsync().then(() => videoRef.current.replayAsync())
                startTimerAt(0)
                setButtonName('pause')
                break
        }
    }

    return (
        <Icon
            name={buttonName}
            size={18}
            color="white"
            style={{ height: 18 }}
            onPress={updateVideoPlayback}
        />
    )
}

export default Playback