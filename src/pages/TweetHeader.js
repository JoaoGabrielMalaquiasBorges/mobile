import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';
import { Linking, ScreenOrientation  } from 'expo';

function TweetHeader(props) {

    const [count, setCount] = useState((Dimensions.get('window').width * 0.95)-(2+20+34+5+5+18));
    /* function getInitialOrientation() {
        return new Promise (resolve => {
            ScreenOrientation.getOrientationAsync().then(e => {return e.orientation});
        });
    } */
    useEffect(() => {
        ScreenOrientation.addOrientationChangeListener( e => {
            //alert(e.orientationInfo.orientation);
            //if ( e.orientationInfo.orientation != initialOrientation ) {
                if ( e.orientationInfo.orientation == 'LANDSCAPE_LEFT' ||  e.orientationInfo.orientation == 'LANDSCAPE_RIGHT' ) {
                    //alert(e.orientationInfo.orientation);
                    setCount((Dimensions.get('window').width * 0.95)-(2+20+34+5+5+20));
                }
                else {
                    //alert(e.orientationInfo.orientation);
                    setCount((Dimensions.get('window').width * 0.95)-(2+20+34+5+5+20));
                }
            //}
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    });

    var ImageSource = null;
    var ImageStyle = {width: 0, height: 0};
    if ( props.tweet.user.verified ) {
        ImageSource = require('../../assets/images/twitter_verified_icon.png');
        ImageStyle = {width: 13, height: 13};
    }

    return(
        <View key='username-line' style={{flexBasis: count}}>
            <Text numberOfLines={1} ellipsizeMode='clip' style={{fontFamily: props.fonts.fontOfDisplayName}}>
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
    );
}

export default TweetHeader;