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
import QuotedTweet from './QuotedTweet';
import { Linking } from 'expo';

function Main() {

    var tweet = tweetObject;
    var quotedTweet = [];
    var replayInfo = [];
    var retweetInfo = [];

    const [readyForDisplay, setReadyForDisplay] = useState(false);

    const [fontOfDisplayName, setFontOfDisplayName] = useState('');
    const [fontOfUsername, setFontOfUsername] = useState('');
    const [fontOfTweetText, setfontOfTweetText] = useState('');

    async function loadFont() {
        await Font.loadAsync({
            'FontName': require("../../assets/fonts/icomoon.ttf"),
            'Helvetica-Neue-Regular': require('../../assets/fonts/HelveticaNeueRegular.ttf'),
            'Helvetica-Neue-Bold': require('../../assets/fonts/HelveticaNeueBold.ttf'),
            'Helvetica-Neue-Light': require('../../assets/fonts/HelveticaNeueLight.ttf')
        });
        setFontOfDisplayName('Helvetica-Neue-Bold');
        setFontOfUsername('Helvetica-Neue-Regular');
        setfontOfTweetText('Helvetica-Neue-Light');
        setReadyForDisplay(true);
    }

    loadFont();

    if ( !tweet.retweeted_status ) {
        tweet = tweetObject.retweeted_status;
        retweetInfo.push(
            <View key='retweetInfo' style={{width: Dimensions.get('window').width-42, marginBottom: 15}}>
                <Text style={{fontFamily: fontOfTweetText, fontSize: 11}}>
                    <Icon name="tw_and_fb_icons-02" size={10} color="gray"/>
                    <Text> Retweeted by </Text><Text style={{color: '#1DA1F2'}}>{tweet.user.name}</Text>
                </Text>
            </View>
        );
    }
    else {
        if ( !tweet.quoted_status ) {
            quotedTweet.push(
                <View key='quotedTweetFrame' style={{marginBottom: 10}}>
                    <QuotedTweet tweet={tweet.quoted_status}/>
                </View>
            );
        }
        else if ( tweet.in_reply_to_screen_name ) {
            replayInfo.push(
                <View key='replayInfo' style={{width: Dimensions.get('window').width-42, marginBottom: 15}}>
                    <Text style={{fontFamily: fontOfTweetText, fontSize: 11}}>
                        <Text>Replying to </Text><Text style={{color: '#1DA1F2'}}>{'@' + tweet.in_reply_to_screen_name}</Text>
                    </Text>
                </View>
            );
        }
    }

    var ImageSource = null;
    var ImageStyle = {width: 0, height: 0};
    if ( tweet.user.verified ) {
        ImageSource = require('../../assets/images/twitter_verified_icon.png');
        ImageStyle = {width: 13, height: 13};
    }

    function haveText () {
        if ( tweet.text ) {
            return (
                <Text style={{fontFamily: fontOfTweetText, marginBottom: 10}}>
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
                        <View style={{marginBottom: 10}}>
                            <TweetImage images={tweet.extended_entities.media} width={Dimensions.get('window').width-42}/>
                        </View>
                    );
                    break;
                case "video":
                    return (
                        <View style={{marginBottom: 10}}>
                            <TweetVideo video={tweet.extended_entities.media[0]} width={Dimensions.get('window').width-42}/>
                        </View>
                    );
                    break;
                case "animated_gif":
                    return (
                        <View style={{marginBottom: 10}}>
                            <TweetGif gif={tweet.extended_entities.media[0]}/>
                        </View>
                    );
                    break;
                default: return null;
            }
        }
        else return null;
    }

    if ( readyForDisplay ) {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <View key='tweetBox' style={{width: Dimensions.get('window').width-20, borderWidth: 1, borderStyle: 'solid', borderRadius: 5, borderColor: '#e1e8ed', padding: 10}}>
                        <View key='tweetHeader' style={{flexDirection: 'row', marginBottom: 15}}>
                            <Image
                                source={{uri:  tweet.user.profile_image_url_https}}
                                style={{width: 34, height: 34, borderRadius: 20, marginRight: 5}}
                            />
                            <View style={{width: Dimensions.get('window').width-106}}>
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
                            <MaterialCommunityIcons
                                name="twitter"
                                size={20}
                                color="#1DA1F2"
                                style={{marginLeft: 5}}
                                onPress={()=>{Linking.openURL('twitter://user?screen_name=sexlewski');}} 
                            />
                        </View>
                        {retweetInfo}
                        {replayInfo}
                        <View key="tweetContent">
                            {haveText()}
                            {haveMedia()}
                        </View>
                        {quotedTweet}
                        <View key="tweetFooter" style={{flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="tw_and_fb_icons-01" size={15} color="gray" style={{marginRight: 8}} />
                                <Icon name="tw_and_fb_icons-02" size={15} color="gray" style={{marginRight: 8}}/>
                                <Icon name="tw_and_fb_icons-03" size={15} color="gray" />
                            </View>
                            <View>
                                <Text style={{fontFamily: fontOfDisplayName}}>
                                    {
                                        tweet.created_at.substring(8, 11) +
                                        tweet.created_at.substring(4, 8) +
                                        tweet.created_at.substr(26)
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
    else {
        return (
            <Text>
                Waiting...
            </Text>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        marginTop: 10,
        backgroundColor: '#fff'
    },
});

export default Main;

