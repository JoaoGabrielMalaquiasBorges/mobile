import React from 'react'
import { View } from 'react-native'
import TweetHeader from '../TweetHeader'
import ExpandedVersion from './ExpandedVersion'
import ShrunkedVersion from './ShrunkedVersion'
import { quotedTweet } from './styles'

function QuotedTweet({ route, navigation, tweet, version }) {
    return (
        <View style={quotedTweet.container}>
            <View style={{ padding: 10 }}>
                <TweetHeader
                    tweet={tweet}
                    elementsWidth={4+40+34+5}
                />
            </View>
            {
                version == 'expanded'
                ? (
                    <ExpandedVersion
                        route={route}
                        navigation={navigation}
                        text={tweet.text}
                        entities={tweet.entities}
                        extended_entities={tweet.extended_entities}
                    />
                )
                : (
                    <ShrunkedVersion
                        route={route}
                        navigation={navigation}
                        text={tweet.text}
                        entities={tweet.entities}
                        extended_entities={tweet.extended_entities}
                    />
                )
            }
        </View>
    )
}

export default QuotedTweet;