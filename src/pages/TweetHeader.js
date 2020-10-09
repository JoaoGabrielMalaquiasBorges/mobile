import React from 'react'
import { View, Text, Image } from 'react-native'
import Icon from '../pages/CustomIcon'

function tweetHeader (tweet) {
    var header = []

    header.push(
        <Image
            key='profile_image'
            source={{uri:  tweet.user.profile_image_url_https}}
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
        />
    )

    /* if ( tweet.user.verified ) {
        
    } */

    header.push(
        <>
            <Text numberOfLines={1} style={{ fontFamily: 'FreeSansBold' }}>
                {tweet.user.name}
            </Text>
            <Text style={{ fontFamily: 'FreeSans', color: 'gray' }}>
                {tweet.user.screen_name}
            </Text>
            <Icon name='verified_icon' color='#1DA1F2' />
        </>
    )

    return header /* (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{width: 40, height: 40, marginRight: 5 }}>
                <Image
                    source={{uri:  tweet.user.profile_image_url_https}}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ fontFamily: 'FreeSansBold' }}>
                    {tweet.user.name + " "}
                    <Image
                        source={ImageSource}
                        style={ImageStyle}
                    />
                </Text>
                <Text style={{ fontSize: 12, fontFamily: 'FreeSans', color: 'gray' }}>
                    {'@' + tweet.user.screen_name}
                </Text>
            </View>
        </View>
    ) */
}

export default tweetHeader
