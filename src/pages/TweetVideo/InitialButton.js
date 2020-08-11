import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Icon from '../CustomIcon'
import { fadeControlBar } from './ControlBar'
import { startTimer } from './ControlBar/Timer'
import { reRenderPlayback } from './ControlBar/Controls/Playback'
import { initialButton } from './styles'

function InitialButton ({ videoRef }) {
    const containerOfInitialButton = React.createRef()

    return (
        <View
            ref={containerOfInitialButton}
            style={initialButton.container}
        >
            <TouchableWithoutFeedback onPressIn={() => {
                containerOfInitialButton.current.setNativeProps({ style: { opacity: 0, position: 'relative', display: 'none' }})
                fadeControlBar(0, 0, 0)
                reRenderPlayback({ name: 'Main' }, 'pause')
                startTimer()
                videoRef.current.playAsync().then(() => {
                    fadeControlBar(500, 1500, 0)
                })
            }}>
                <View style={initialButton.button}>
                    <Icon
                        name='play'
                        size={22}
                        color='white'
                        style={{ paddingLeft: 4 }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default InitialButton