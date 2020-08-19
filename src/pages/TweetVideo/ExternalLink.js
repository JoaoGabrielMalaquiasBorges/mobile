import React, { useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import * as Font from 'expo-font';
import Icon from '../CustomIcon'
import EventEmitter from 'events'
import { externalLink } from './styles'


const emitter = new EventEmitter()

export function showExternalLink () {
    emitter.emit('show')
}

export function hideExternalLink () {
    emitter.emit('hide')
}

function ExternalLink ( { route }) {
    Font.loadAsync({
        'FontName': require("../../../assets/fonts/icomoon.ttf")
    })

    const externalLinkRef = React.createRef()

    function showExternalLink () {
        externalLinkRef.current.setNativeProps({ style: { position: 'absolute', display: 'flex' }})
    }
    
    function hideExternalLink () {
        externalLinkRef.current.setNativeProps({ style: { position: 'relative', display: 'none' }})
    }

    useEffect(() => {
        emitter.addListener('show', showExternalLink)
        emitter.addListener('hide', hideExternalLink)

        return () => {
            emitter.removeListener('show', showExternalLink)
            emitter.removeListener('hide', hideExternalLink)
        }
    })

    return (
        <View
            ref={externalLinkRef}
            style={externalLink.container}
        >
            <View style={
                route.name == 'FullscreenSizeVideo'
                    ? externalLink.fullscreenSize.subcontainer
                    : externalLink.notFullscreenSize.subcontainer
            }>
                <TouchableWithoutFeedback onPressIn={() => {
                    hideExternalLink()
                }}>
                    <View style={externalLink.button}>
                        <Text style={{ color: 'white' }}>View on Twitter</Text>
                        <Icon
                            name='external_link'
                            size={20}
                            color='white'
                            style={{ marginTop: 2 }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default ExternalLink