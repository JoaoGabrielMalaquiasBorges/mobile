import React from 'react'
import { View } from 'react-native'
import TweetHeader from '../TweetHeader'
import TweetContent from '../TweetContent'
import { quotedTweet } from './styles'

function QuotedTweet({ route, navigation, tweet }) {
    const content = 
        <TweetContent
            route={route}
            navigation={navigation}
            tweet={tweet}
            mediaType='photo'
            style={quotedTweet.media}
        />
        alert(content.key)

    return (
        <View style={quotedTweet.container}>
            <View style={{ padding: 10 }}>
                <TweetHeader
                    tweet={tweet}
                    elementsWidth={4+40+34+5}
                />
            </View>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end'}}>
                <TweetContent
                    route={route}
                    navigation={navigation}
                    tweet={tweet}
                    mediaType='photo'
                    style={quotedTweet.media}
                />
            </View>
        </View>
    );
}

export default QuotedTweet;