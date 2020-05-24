import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native'
import { container, progressBar } from './TweetVideo/styles'

var seconds = 0
var minutes = 0
var shouldIncrement = true
const myEmitter = new EventEmitter()

export function start () {
    seconds++
    setInterval(() => {
        myEmitter.emit('eventOne')
        if (shouldIncrement) {
            start()
        }
    }, 1000)
}

export function startAt (seconds) {
    seconds = seconds
    setInterval(() => {
        myEmitter.emit('eventOne')
        if (shouldIncrement) {
            start()
        }
    }, 1000)
}

export function stop () {
    shouldIncrement = false
}

function transform () {
    if (seconds % 60 == 1) {
        seconds = 0
        minutes++
    }
    setTime((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds))
}

function Timer () {
    var [time, setTime] = useState(0)

    useEffect(() => {
        
    })    
    
}