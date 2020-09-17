import React from 'react'
import { Text } from 'react-native'
import TweetText from './TweetText'
import TweetMedia from '../TweetMedia'

function TweetContent ({ route, navigation, tweet, style, linkPreview }) {
    var content = []

    if ( tweet.text ) {
        content.push(
            <Text key='text' style={{marginBottom: 10, fontFamily: 'Helvetica-Neue-Light'}}>
                <TweetText tweet={tweet}/>
            </Text>
        )
    }

    if (tweet.entities.urls) {
        content.push(linkPreview)
    }

    if ( tweet.extended_entities ) {
        content.push(
            <TweetMedia
                key='media'
                route={route}
                navigation={navigation}
                media={tweet.extended_entities.media}
                style={style}
            />
        )
    }

    return content
}

export default TweetContent
