import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import * as Font from 'expo-font';
import Icon from '../CustomIcon'
import { externalLink } from './styles'


const externalLinkRef = React.createRef();

export function showExternalLink () {
    externalLinkRef.current.setNativeProps({ style: { position: 'absolute', display: 'flex' }})
}

export function hideExternalLink () {
    externalLinkRef.current.setNativeProps({ style: { position: 'relative', display: 'none' }})
}

function ExternalLink () {
    Font.loadAsync({
        'FontName': require("../../../assets/fonts/icomoon.ttf")
    })

    return (
        <View
            ref={externalLinkRef}
            style={externalLink.container}
        >
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
    )
}

export default ExternalLink