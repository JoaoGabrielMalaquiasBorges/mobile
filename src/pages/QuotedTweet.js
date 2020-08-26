import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from './CustomIcon';
import tweetObject from './Model';
import TweetHeader from './TweetHeader'
import TweetText from './TweetText';
import TweetImage from './TweetImage';
import TweetGif from './TweetGif'

function QuotedTweet({ route, navigation, tweet }) {
    var ImageSource = null;
    var ImageStyle = {width: 0, height: 0};

    if ( tweet.user.verified ) {
        ImageSource = require('../../assets/images/twitter_verified_icon.png');
        ImageStyle = {width: 13, height: 13};
    }

    function haveText () {
        if ( tweet.text ) {
            return (
                <Text style={{marginBottom: 10, fontFamily: 'Helvetica-Neue-Light'}}>
                    <TweetText tweet={tweet}/>
                </Text>
            );
        }
        else {
            return(null);
        }
    }
    
    function haveMedia() {
        if ( tweet.extended_entities ) {
            switch ( tweet.extended_entities.media[0].type ) {
                case "photo":
                    return (
                        <View>
                            <TweetImage images={tweet.extended_entities.media} width={Dimensions.get('window').width-64}/>
                        </View>
                    );
                    break;
                case "video":
                    return (
                        <View style={{
                            width: '100%',
                            maxWidth: 444.45,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <TweetVideo video={tweet.extended_entities.media[0]} navigation={navigation} route={route} width={Dimensions.get('window').width-42}/>
                        </View>
                    );
                    break;
                case "animated_gif":
                    return (
                        <View style={{
                            width: tweet.extended_entities.media[0].sizes.large.w,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <TweetGif gif={tweet.extended_entities.media[0]}/>
                        </View>
                    );
                    break;
                default: return null;
            }
        }
    }

    return(
        <View key='tweetBox' style={{
            width: '100%',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 10,
            borderColor: '#e1e8ed',
            overflow: 'hidden'
        }}>
            <View style={{ padding: 10 }}>
                <TweetHeader
                    tweet={tweet}
                    elementsWidth={4+40+34+5}
                    fonts={{fontOfDisplayName: 'Helvetica-Neue-Bold', fontOfUsername: 'Helvetica-Neue-Regular'}}
                />
                {haveText()}
            </View>
            <View key="tweetContent">
                {haveMedia()}
            </View>
        </View>
    );
}

export default QuotedTweet;