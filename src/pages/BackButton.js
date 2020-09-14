import React from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from './CustomIcon'

function BackButton ({ navigation }) {
    return (
        <View
            style={{
                position: 'absolute'
            }}
        >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
