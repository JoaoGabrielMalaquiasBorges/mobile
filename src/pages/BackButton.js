import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { HeaderBackButton } from '@react-navigation/stack'
import Icon from './CustomIcon'

function BackButton () {
    return (
        <View style={{ zIndex: 1 }}>
            <TouchableWithoutFeedback onPress={e => alert('hiS')}>
                <View
                    style={{
                        margin: 10,
                        padding: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: 100
                    }}
                >
                    <Icon name="left_arrow" size={20} color='white' />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default BackButton
