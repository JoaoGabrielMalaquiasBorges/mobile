import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native'
import { fadeControlBar } from "./ControlBar";
import { touchableArea } from './styles';

function TouchableArea () {
    return (
        <TouchableWithoutFeedback onPressIn={() => {
            fadeControlBar(0, 0, 0)
        }}>
            <View style={touchableArea} />
        </TouchableWithoutFeedback>
    )
}

export default TouchableArea