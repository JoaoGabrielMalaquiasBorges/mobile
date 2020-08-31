import React from 'react'
import { View } from 'react-native'
import TweetHeader from '../TweetHeader'
import TweetContent from '../TweetContent'
import { quotedTweet } from './styles'

function QuotedTweet({ route, navigation, tweet }) {
    return(
        <View style={quotedTweet.container}>
            <View style={{ padding: 10 }}>
                <TweetHeader
                    tweet={tweet}
                    elementsWidth={4+40+34+5}
                />
            </View>
            <TweetContent
                route={route}
                navigation={navigation}
                tweet={tweet}
                style={quotedTweet.media}
            />
        </View>
    );
}

export default QuotedTweet;