import React from 'react'
import { View, Text } from 'react-native'
import tweetContent from '../TweetContent'
import { expandedVersion } from './styles'

function ExpandedVersion ({ route, navigation, text, entities, extended_entities }) {
    const content = tweetContent(route, navigation, text, entities, extended_entities)

    const treatedContent = content.map(element => {
        if (element.key == 'text') {
            element = 
                <View key={element.key} style={{ padding: 10 }} >
                    <Text numberOfLines={5} >
                        {element}
                    </Text>
                </View>
        } else {
            element = 
            <View key={element.key} style={expandedVersion.media[`${element.props.media[0].type}`].container}>
                {element}
            </View>
        }
        return element
    })

    return treatedContent
}

export default ExpandedVersion