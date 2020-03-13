import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';
import { Linking, ScreenOrientation  } from 'expo';

function TweetHeader(props) {
    var ImageSource = null;
    var ImageStyle = {width: 0, height: 0};
    if ( props.tweet.user.verified ) {
        ImageSource = require('../../assets/images/twitter_verified_icon.png');
        ImageStyle = {width: 13, height: 13};
    }
    const [count, setCount] = useState('80%');
    useEffect(() => {
        ScreenOrientation.addOrientationChangeListener(e => {
            if ( count == '80%' ) {
                setCount('85%');
            }
            else {
                setCount('80%');
            }
            //setCount(count+1);
            //alert(count);
            //updateUsernameLineWidth('90%');
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    });
    return(
        <View key='blockElements' style={{flexBasis: count}}>
            <Text numberOfLines={1} ellipsizeMode='clip'>
                {props.tweet.user.name + " "}
                <Image
                    source={ImageSource}
                    style={ImageStyle}
                />
            </Text>
            <Text>
                {'@' + props.tweet.user.screen_name}
            </Text>
        </View>
    )
}

export default TweetHeader;