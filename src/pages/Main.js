import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image, Animated, Modal, StatusBar } from 'react-native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';
import TweetVideo from './TweetVideo';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Icon from './CustomIcon';
import tweetObject from './Model';
import TweetText from './TweetContent/TweetText';
import TweetImage from './TweetMedia/TweetImage';
import TweetGif from './TweetMedia/TweetGif';
import QuotedTweet from './QuotedTweet';
import tweetHeader from './TweetHeader';
import TweetFooter from './TweetFooter';
import { Linking } from 'expo'
import { loadFonts } from '../tweetFonts'
import { loader } from '../../assets/loader.js'
import TweetMedia from './TweetMedia'
import { tweetMedia } from '../style'
import tweetContent from './TweetContent'
import tweetLinkPreview from '../pages/TweetContent/TweetLinkPreview'

function Main({ route, navigation }) {
    var tweet = tweetObject;
    var quotedTweet = [];
    var replayInfo = [];
    var retweetInfo = [];

    const [linkPreview, setLinkPreview] = useState(undefined)
    var readyForDisplay = linkPreview !== undefined ? true : false

    if ( !readyForDisplay ) {
        loadFonts().then(() => {
            if (!tweet.quoted_status && !tweet.extended_entities && tweet.entities.urls.length > 0) {
                tweetLinkPreview(tweet.entities.urls, tweetMedia)
                .then(response => {
                    setLinkPreview(response)
                })
            } else {
                setLinkPreview(null)
            }
        })
        return (
            <WebView
                originWhitelist={['*']}
                source={{
                    html: loader()
                }}
            />
        )
    }

    if ( !tweet.retweeted_status ) {
        tweet = tweetObject.retweeted_status;
        retweetInfo.push(
            <View key='retweetInfo' style={{width: Dimensions.get('window').width-42, marginLeft: 24, marginBottom: 10}}>
                <Text style={{fontFamily: 'Helvetica-Neue-Light', fontSize: 11, color: 'gray'}}>
                    <Icon name="tw_and_fb_icons-02" size={9} color="gray"/>
                    <Text> Retweeted by </Text><Text style={{color: '#1DA1F2'}}>{tweet.user.name}</Text>
                </Text>
            </View>
        );
    }
    else {
        if ( tweet.quoted_status ) {
            quotedTweet.push(
                <View key='quotedTweetFrame' style={{marginBottom: 10}}>
                    <QuotedTweet
                        route={route}
                        navigation={navigation}
                        tweet={tweet.quoted_status}
                        version={tweet.extended_entities ? 'shrunked' : 'expanded'}
                    />
                </View>
            );
        }
        else if ( tweet.in_reply_to_screen_name ) {
            replayInfo.push(
                <View key='replayInfo' style={{width: Dimensions.get('window').width-42, marginBottom: 10}}>
                    <Text style={{fontFamily: 'Helvetica-Neue-Light', fontSize: 11, color: 'gray'}}>
                        <Text>Replying to </Text><Text style={{color: '#1DA1F2'}}>{'@' + tweet.in_reply_to_screen_name}</Text>
                    </Text>
                </View>
            );
        }
    }

    const header = tweetHeader(tweet)

    const treatedHeader = header.map(element => {
        if (element.key == 'profile_image') {
            element = (
                <View key={element.key} style={{width: 40, height: 40, marginRight: 5 }}>
                    {element}
                </View>
            )
        } else {
            element =  (
                <View key={element.key} style={{ flex: 1, justifyContent: 'center' }}>
                    {element}
                </View>
            )
        }

        return element
    })

    const content = tweetContent(
        route,
        navigation,
        tweet.text,
        tweet.entities,
        tweet.extended_entities,
        null,
        linkPreview
    )

    const treatedContent = content.map(element => {
        if (element.key == 'media') {
            element = (
                <View key={element.key} style={tweetMedia.media[`${element.props.media[0].type}`].container}>
                    {element}
                </View>
            )
        }
        return element
    })

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View key='tweetBox' style={{
                    width: '95%',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 10,
                    borderColor: '#e1e8ed',
                    padding: 10
                }}>
                    {retweetInfo}{/* 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}> */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {treatedHeader}
                            </View>
                            <Icon name='bird_icon' size={16} color='#1DA1F2' style={{ marginLeft: 5, marginTop: 1 }} />
                        </View>{/* 
                    </View> */}
                    {replayInfo}
                    {treatedContent}
                    {
                        tweet.quoted_status
                            ? quotedTweet
                            : null
                    }
                    <TweetFooter created_at={tweet.created_at} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff'
    }
});

export default React.memo(Main);

