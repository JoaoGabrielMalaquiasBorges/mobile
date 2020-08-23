import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EventEmitter from 'events';
import { timer } from './styles';

const render = new EventEmitter()

var seconds = 0
var minutes = 0
var shouldIncrement = false
var videoDuration

export function startTimer () {
    shouldIncrement = true
    render.emit('re-render')
}

export function startTimerAt (time) {
    shouldIncrement = false
    minutes = Math.trunc((time/1000)/60)
    seconds = Math.round(time/1000)%60
    if (minutes*60+seconds < Math.trunc(videoDuration/1000)) {
        shouldIncrement = true
        render.emit('re-render')
    }
}

export function stopTimer () {
    shouldIncrement = false
}

function Timer ({ route, navigation, video }) {
    const [time, setTime] = useState((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
    const clock = new EventEmitter()

    function handleTime () {
        if (seconds == 60) {
            seconds = 0
            minutes++
        }
        setTime((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
    }

    function mainListener () {
        if (route.name == 'Main') {
            setTime((minutes > 9 ? minutes : ' 0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
        }
    }

    function fullscreenSizeVideoListener () {
        if (route.name == 'FullscreenSizeVideo') {
            setTime((minutes > 9 ? minutes : ' 0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
        }
    }

    videoDuration = video.video_info.duration_millis

    if (minutes*60+seconds == Math.trunc(videoDuration/1000)) {
        stopTimer()
    }

    useEffect(() => {
        clock.addListener('tick', handleTime)

        if (route.name == 'Main') {
            render.addListener('re-render', mainListener)
        } else {
            render.addListener('re-render', fullscreenSizeVideoListener)
        }

        const unsubscribe = navigation.addListener('focus', () => {
            if (route.name == 'Main' && minutes*60+seconds == Math.trunc(videoDuration/1000)) {
                setTime((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
            }
        })

        if (navigation.isFocused() && shouldIncrement) {
            seconds++
            setTimeout(() => {
                clock.emit('tick')
            }, 1000)
        }

        return () => {
            unsubscribe()
            clock.removeAllListeners()
            if (route.name == 'Main') {
                render.removeListener('re-render', mainListener)
            } else {
                render.removeListener('re-render', fullscreenSizeVideoListener)
            }
        }
    })

    return (
        <View style={ route.name == 'FullscreenSizeVideo' ? timer.fullscreenSize.container : timer.notFullscreenSize.container }>
            <Text style={timer.text}>{time}</Text>
            <Text style={timer.text}> / </Text>
            <Text style={timer.text}>{
                (
                    Math.trunc(Math.trunc(videoDuration/1000)/60) > 9
                        ? Math.trunc(Math.trunc(videoDuration/1000)/60)
                        : '0' + Math.trunc(Math.trunc(videoDuration/1000)/60)
                )
                + ':' +
                (
                    Math.trunc(videoDuration/1000)%60 > 9
                        ? Math.trunc(videoDuration/1000)%60
                        : '0' + Math.trunc(videoDuration/1000)%60
                )
            }</Text>
        </View>
    )

}

export default Timer;