import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image, } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Linking, ScreenOrientation } from 'expo';

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
        <View style={{flexDirection: 'row' }}>
            <Image
                source={{uri:  props.tweet.user.profile_image_url_https}}
                style={{width: 34, height: 34, borderRadius: 20, marginRight: 5}}
            />
            <View>
                <Text numberOfLines={1} ellipsizeMode='clip' style={{ width: lineWidth, fontFamily: props.fonts.fontOfDisplayName}}>
                    {props.tweet.user.name + " "}
                    <Image
                        source={ImageSource}
                        style={ImageStyle}
                    />
                </Text>
                <Text style={{fontFamily: props.fonts.fontOfUsername}}>
                    {'@' + props.tweet.user.screen_name}
                </Text>
            </View>
        </View>
    )
}

export default TweetHeader;
