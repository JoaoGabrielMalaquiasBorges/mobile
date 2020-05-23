import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native'
import { container, progressBar } from './TweetVideo/styles'

var millis = -1
var shouldIncrement = true
const myEmitter = new EventEmitter()

export function start () {
    millis++
    if (shouldIncrement) {
        start()
    }
}

export function startAt (millis) {
    millis = millis
    if (shouldIncrement) {
        start()
}

export function stop () {
    shouldIncrement = false
}

function transform () {
    
}

function Timer () {
    var [time, setTime] = useState(0)

    useEffect(() => {
        
    })    
    
}