import React from 'react'
import { Text, View } from 'react-native'
import tweetHeader from '../TweetHeader'
import ExpandedVersion from './ExpandedVersion'
import ShrunkedVersion from './ShrunkedVersion'
import Icon from '../CustomIcon'
import { quotedTweet } from './styles'

function QuotedTweet({ route, navigation, tweet, version }) {
    const header = tweetHeader(tweet)

    const treatedHeader = header.map(element => {
        if (element.key == 'profile_image') {
            element = (
                <View key={element.key} style={{width: 20, height: 20, marginRight: 2.5 }}>
                    {element}
                </View>
            )
        } else {
            element =  (
                <View key={element.key} style={{ flex: 1, flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={{ fontSize: 13 }}>
                        {element.props.children[0]}
                    </Text>
                    <View style={{ marginLeft: 2.5, flex: 1, flexDirection: 'row' }}>
                        <Text numberOfLines={1} ellipsizeMode='clip' style={{ fontSize: 13 }}>
                            <Icon name='verified_icon' color='#1DA1F2' />
                            <View style={{ height: 5, width: 5 }} />
                            {element.props.children[1]}
                        </Text>
                    </View>
                </View>
            )
        }

        return element
    })

    return (
        <View style={quotedTweet.container}>
            <View style={{ padding: 10, flex: 1, flexDirection: 'row' }}>
                {treatedHeader}
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