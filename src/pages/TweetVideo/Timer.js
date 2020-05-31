import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native'
import EventEmitter from 'events'
import tweetObject from '../Model'
import { useFocusEffect } from '@react-navigation/native'

const tweet = tweetObject
const clock = new EventEmitter()

/* var seconds = 0
var minutes = 0 */
var shouldIncrement = true

export function start () {
    /* setTimeout(() => {
        seconds++
        clock.emit('tick')
    }, 1000) */
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

function Timer ({ seconds }) {
    var [time, setTime] = useState('00:00')
    
    /* var seconds = seconds == undefined ? 0 : seconds
    var minutes = minutes == undefined ? 0 : minutes

    function startT () {
        setTimeout(() => {
            seconds++
            clock.emit('tick')
        }, 1000)
    }

    function handleTime () {
        if (seconds == 60) {
            seconds = 0
            minutes++
        }
        setTime((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
    } */

    useFocusEffect(() => {
        /* clock.addListener('tick', handleTime)
        startT()
        return () => {
            clock.removeAllListeners()
        } */
        alert(seconds)
    });
    
   // useEffect()

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