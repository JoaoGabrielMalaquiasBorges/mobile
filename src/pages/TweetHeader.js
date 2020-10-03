import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { ScreenOrientation } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function TweetHeader(props) {
    const [lineWidth, setLineWidth] = useState(Dimensions.get('window').width*0.95-props.elementsWidth)

    useEffect(() => {
        const subscription = ScreenOrientation.addOrientationChangeListener(e => {
            setLineWidth(Dimensions.get('window').width*0.95-props.elementsWidth)
        })
        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription)
        }
    })

    var ImageSource = null;
    var ImageStyle = {width: 0, height: 0};
    if ( props.tweet.user.verified ) {
        ImageSource = require('../../assets/images/twitter_verified_icon.png');
        ImageStyle = {width: 13, height: 13};
    }

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image
                source={{uri:  props.tweet.user.profile_image_url_https}}
                style={{width: 36, height: 36, borderRadius: 20, marginRight: 5}}
            />
            <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontFamily: 'FreeSansBold' }}>
                    {props.tweet.user.name + " "}
                    {/* <Image
                        source={ImageSource}
                        style={ImageStyle}
                    /> */}
                </Text>
                <Text style={{ fontSize: 12, fontFamily: 'FreeSans', color: 'gray' }}>
                    {'@' + props.tweet.user.screen_name}
                </Text>
            </View>
            <MaterialCommunityIcons
                name="twitter"
                size={18}
                color="#1DA1F2"
                onPress={()=>{Linking.openURL('twitter://post?message=hello&in_reply_to_status_id=20');}} 
            />
        </View>
    )
}

export default TweetHeader;
