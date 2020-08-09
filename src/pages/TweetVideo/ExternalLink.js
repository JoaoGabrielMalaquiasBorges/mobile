import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Icon from '../CustomIcon'
import { externalLink } from './styles'


const externalLinkRef = React.createRef();

export function showExternalLink () {
    externalLinkRef.current.setNativeProps({ style: { position: 'absolute', display: 'flex' }})
}

function ExternalLink () {

    return (
        <View
            ref={externalLinkRef}
            style={externalLink.container}
        >
            <TouchableWithoutFeedback onPressIn={() => {
                alert('hi')
            }}>
                <Text style={{ color: 'white' }}>View on Twitter</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default ExternalLink