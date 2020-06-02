import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native'
import EventEmitter from 'events'
import tweetObject from '../Model'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

const tweet = tweetObject
const videoDuration = tweet.extended_entities.media[0].video_info.duration_millis

var seconds = 0
var minutes = 0
var shouldIncrement = true

export function start () {
    shouldIncrement = true
    seconds++
    setTimeout(() => {
        clock.emit('tick')
    }, 1000)
}

export function startAt (seconds) {
    /* setInterval(() => {
        seconds = seconds
        clock.emit('tick')
        if (shouldIncrement) {
            start()
        }
    }, 1000) */
}

export function stop () {
    shouldIncrement = false
}

function Timer ({ navigation }) {
    const [time, setTime] = useState('00:00')

    const clock = new EventEmitter()

    function handleTime () {
        if (seconds == 60) {
            seconds = 0
            minutes++
        }
        setTime((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
    }

    /* if ( minutes*60+seconds == Math.trunc(videoDuration/1000)) {
        stop()
    } */

    useEffect(() => {
        clock.addListener('tick', handleTime)
        if (navigation.isFocused() && shouldIncrement) {
            seconds++
            setTimeout(() => {
                clock.emit('tick')
            }, 1000)
        }
        return () => {
            clock.removeAllListeners()
        }
    });

    return (
        <View style={{
            position: 'absolute',
            bottom: 10,
            right: 50
        }}>
            <Text style={{ color: 'white' }}>{time}</Text>  
        </View>
    )
}

export default Timer;