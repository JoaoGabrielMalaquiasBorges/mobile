import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native'
import EventEmitter from 'events'
import tweetObject from '../Model'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { timer } from  './styles'

const tweet = tweetObject
const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis
const render = new EventEmitter()

var seconds = 0
var minutes = 0
var shouldIncrement = false

export function startTimer () {
    shouldIncrement = true
    render.emit('re-render')
}

export function startTimerAt (time) {
    shouldIncrement = false
    minutes = Math.trunc((time/1000)/60)
    seconds = Math.round(time/1000)%60
    shouldIncrement = true
    render.emit('re-render')
}

export function stopTimer () {
    shouldIncrement = false
}

function Timer ({ route, navigation }) {
    const [time, setTime] = useState((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))

    const clock = new EventEmitter()

    function handleTime () {
        if (seconds == 60) {
            seconds = 0
            minutes++
        }
        setTime((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
    }

    if (minutes*60+seconds == Math.trunc(videoDuration/1000)) {
        stopTimer()
    }

    useEffect(() => {
        clock.addListener('tick', handleTime)
        render.addListener('re-render', () => {
            alert(minutes)
            setTime((minutes > 9 ? minutes : ' 0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
        })
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
            render.removeAllListeners()
        }
    });

    return (
        <View style={timer.container}>
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