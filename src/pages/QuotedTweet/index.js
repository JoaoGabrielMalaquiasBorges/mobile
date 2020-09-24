import React from 'react'
import { View, Text } from 'react-native'
import TweetHeader from '../TweetHeader'
import tweetContent from '../TweetContent'
import { quotedTweet } from './styles'

function QuotedTweet({ route, navigation, tweet }) {
    const content = tweetContent(route, navigation, tweet, 'photo', quotedTweet.media)
    const content2 = content.map(element => {
        if (element.key == 'text') {
            element = 
                <View style={{ flex: 1 }} >
                    <Text numberOfLines={3} >
                        {element}
                    </Text>
                </View>
        }
        return element
    })

    return (
        <View style={quotedTweet.container}>
            <View style={{ padding: 10 }}>
                <TweetHeader
                    tweet={tweet}
                    elementsWidth={4+40+34+5}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                {content2.pop()}
                <View style={{ width: 5 }} />
                {content2.pop()}
            </View>
        </View>
    );
}

export default QuotedTweet;