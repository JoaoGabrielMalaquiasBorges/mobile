import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native'
import { container, progressBar } from './TweetVideo/styles'

function Timer () {
    var [time, setTime] = useState(0)

    function start () {
        setInterval(() => {
            if (time == 59) {
               setTime(0) 
            } else {
                setTime(time+1)
            }
        }, 1000)
    }
    
}