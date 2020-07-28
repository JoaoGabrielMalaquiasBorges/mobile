import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Icon from '../CustomIcon'
import { initialButton } from './styles'
import { startTimer } from './ControlBar/Timer'
import { reRenderPlayback } from './ControlBar/Controls/Playback'

function InitialButton ({ videoRef, handleControlBar }) {
    const containerOfInitialButton = React.createRef()

    return (
        <View
            ref={containerOfInitialButton}
            style={initialButton.container}
        >
            <TouchableWithoutFeedback onPressIn={() => {
                containerOfInitialButton.current.setNativeProps({ style: { opacity: 0, position: 'relative', display: 'none' }})
                handleControlBar(0, 0)
                reRenderPlayback({ name: 'Main' }, 'pause')
                startTimer()
                videoRef.current.playAsync().then(() => {
                    handleControlBar(4000, 1000)
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