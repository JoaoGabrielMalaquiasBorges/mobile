import React from 'react'
import { Text } from 'react-native'
import TweetText from './TweetText'
import TweetMedia from '../TweetMedia'

function tweetContent (route, navigation, tweet, mediaType, style, linkPreview) {
    var content = []

    if ( tweet.text ) {
        content.push(
            <Text key='text' style={{marginBottom: 10, fontFamily: 'Helvetica-Neue-Light'}}>
                <TweetText tweet={tweet}/>
            </Text>
        )
    }

    if (tweet.entities.urls.length != 0) {
        content.push(linkPreview)
    }

    if ( tweet.extended_entities ) {
        content.push(
            <TweetMedia
                key='media'
                route={route}
                navigation={navigation}
                media={tweet.extended_entities.media}
                type={mediaType? mediaType : tweet.extended_entities.media[0].type}
                style={style}
            />
        )
    }

    return content
}

export default tweetContent
