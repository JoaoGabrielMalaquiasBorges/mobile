import React from 'react'
import { View } from 'react-native'
import TweetHeader from '../TweetHeader'
import Expanded from './ExpandedVersion'
import Shrunked from './ShrunkedVersion'
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
                    <Expanded route={route} navigation={navigation} tweet={tweet} />
                )
                : (
                    <Shrunked route={route} navigation={navigation} tweet={tweet} />
                )
            }
        </View>
    )
}

export default QuotedTweet;