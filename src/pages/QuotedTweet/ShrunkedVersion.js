import React from 'react'
import { View, Text } from 'react-native'
import TweetHeader from '../TweetHeader'
import tweetContent from '../TweetContent'
import { shrunkedVersion } from './styles'

function Shrunked ({ route, navigation, tweet }) {
    const content = tweetContent(route, navigation, tweet, 'photo', shrunkedVersion.media)
    const treatedContent = content.map(element => {
        if (element.key == 'text') {
            element = 
                <View key={element.key} style={{ flex: 1 }} >
                    <Text numberOfLines={3} >
                        {element}
                    </Text>
                </View>
        } else {
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

export default Shrunked