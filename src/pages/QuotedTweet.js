import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from './CustomIcon';
import tweetObject from './Model';
import TweetText from './TweetText';
import TweetImage from './TweetImage';
import TweetGif from './TweetGif';

function QuotedTweet() {

    var tweet = tweetObject.quoted_status;

    const [fontOfDisplayName, setFontOfDisplayName] = useState('');
    const [fontOfUsername, setFontOfUsername] = useState('');
    const [fontOfTweetTextContent, setFontOfTweetTextContent] = useState('');

    async function loadFont() {
        await Font.loadAsync({
            'FontName': require("../../assets/fonts/icomoon.ttf"),
            'Helvetica-Neue-Regular': require('../../assets/fonts/HelveticaNeueRegular.ttf'),
            'Helvetica-Neue-Bold': require('../../assets/fonts/HelveticaNeueBold.ttf'),
            'Helvetica-Neue-Light': require('../../assets/fonts/HelveticaNeueLight.ttf')
        });
        setFontOfDisplayName('Helvetica-Neue-Bold');
        setFontOfUsername('Helvetica-Neue-Regular');
        setFontOfTweetTextContent('Helvetica-Neue-Light');
    }

    loadFont();

    var ImageSource = null;
    var ImageStyle = {width: 0, height: 0};
    if ( tweet.user.verified ) {
        ImageSource = require('../../assets/images/twitter_verified_icon.png');
        ImageStyle = {width: 13, height: 13};
    }

    function haveText () {
        if ( tweet.text ) {
            return (
                <Text style={{marginBottom: 10, fontFamily: fontOfTweetTextContent}}>
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
                        <View>
                            <TweetVideo  video={tweet.extended_entities.media[0]} width={Dimensions.get('window').width-64}/>
                        </View>
                    );
                    break;
                case "animated_gif":
                    return (
                        <View>
                            <TweetGif gif={tweet.extended_entities.media[0]}/>
                        </View>
                    );
                    break;
                default: return null;
            }
        }
    }

    return(
        <View key='tweetBox' style={{width: Dimensions.get('window').width-42, borderWidth: 1, borderStyle: 'solid', borderRadius: 5, borderColor: '#e1e8ed', padding: 10}}>
            <View key='tweetHeader' style={{flexDirection: 'row', marginBottom: 15}}>
                <Image
                    source={{uri:  tweet.user.profile_image_url_https}}
                    style={{width: 34, height: 34, borderRadius: 20, marginRight: 5}}
                />
                <View style={{width: Dimensions.get('window').width-103}}>
                    <View>
                        <Text numberOfLines={1} ellipsizeMode='clip' style={{fontFamily: fontOfDisplayName}}>
                            {tweet.user.name + " "}
                            <Image
                                source={ImageSource}
                                style={ImageStyle}
                            />
                        </Text>
                    </View>
                    <Text style={{fontFamily: fontOfUsername}}>
                        {'@' + tweet.user.screen_name}
                    </Text>
                </View>
            </View>
            <View key="tweetContent">
                {haveText()}
                {haveMedia()}
            </View>
        </View>
    );
}

export default QuotedTweet;