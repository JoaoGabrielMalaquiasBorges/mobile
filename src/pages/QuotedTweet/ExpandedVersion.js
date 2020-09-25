import React from 'react'
import { View, Text } from 'react-native'
import tweetContent from '../TweetContent'
import { expandedVersion } from './styles'

function Expanded ({ route, navigation, tweet }) {
    const content = tweetContent(route, navigation, tweet, null, expandedVersion.media)
    const treatedContent = content.map(element => {
        if (element.key == 'text') {
            element = 
                <View key={element.key} style={{ padding: 10 }} >
                    <Text numberOfLines={5} >
                        {element}
                    </Text>
                </View>
        }
        return element
    })
    return treatedContent
}

export default Expanded