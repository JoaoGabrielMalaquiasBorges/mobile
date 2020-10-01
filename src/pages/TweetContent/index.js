import React from 'react'
import { View, Text } from 'react-native'
import TweetText from './TweetText'
import TweetMedia from '../TweetMedia'

function tweetContent (route, navigation, text, entities, extended_entities, mediaType, style, linkPreview) {
    var content = []

    if ( text ) {
        content.push(
            <Text key='text' style={{marginBottom: 10, fontFamily: 'Helvetica-Neue-Light'}}>
                <TweetText text={text} entities={entities} />
            </Text>
        )
    }

    if (linkPreview) {
        content.push(
            <View key='linkPreview'>{linkPreview}</View>
        )
    }

    if ( extended_entities ) {
        content.push(
            <TweetMedia
                key='media'
                route={route}
                navigation={navigation}
                media={extended_entities.media}
                type={mediaType? mediaType : extended_entities.media[0].type}
                style={style}
            />
        )
    }

    return content
}

export default tweetContent
