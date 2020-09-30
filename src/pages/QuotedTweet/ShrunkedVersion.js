import React from 'react'
import { View, Text } from 'react-native'
import tweetContent from '../TweetContent'
import { shrunkedVersion } from './styles'

function ShrunkedVersion ({ route, navigation, text, entities, extended_entities }) {
    const content = tweetContent(route, navigation, text, entities, extended_entities, 'photo', shrunkedVersion.media)
    const treatedContent = content.map(element => {
        if (element.key == 'text') {
            element = 
                <View key={element.key} style={{ flex: 1 }} >
                    <Text numberOfLines={3} >
                        {element}
                    </Text>
                </View>
        } else {
            // alert(element.props.media[0].type)
            element = 
                <View key={element.key} style={{ marginRight: 5 }}>
                    {element}
                </View>
        }
        return element
    })


    return (
        <View style={{ padding: 10, flexDirection: 'row' }}>
            {treatedContent.reverse()}
        </View>
    )
}

export default ShrunkedVersion