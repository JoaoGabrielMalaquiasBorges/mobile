import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View, Image, Animated } from 'react-native';
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
import TweetHeader from './TweetHeader';
import { Linking } from 'expo'
import { loadFonts } from '../tweetFonts'
import { loader } from '../../assets/loader.js'
import TweetMedia from './TweetMedia'
import { tweetMedia } from '../style'
import TweetContent from './TweetContent'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

function Main({ route, navigation }) {
    var tweet = tweetObject;
    var quotedTweet = [];
    var replayInfo = [];
    var retweetInfo = [];

    const [readyForDisplay, setReadyForDisplay] = useState(false);

    if ( !readyForDisplay ) {
        // loadFonts().then(() => setReadyForDisplay(true))
        var baseScale = new Animated.Value(1)
        var pinchScale = new Animated.Value(1)
        var scale = Animated.multiply(baseScale, pinchScale)
        var lastScale = 1
        var adjustedFocal = new Animated.Value(0)
        const windowWidth = Dimensions.get('window').width
        var imageWidth =  windowWidth
        var flag = false
        var focalX
        var proportion
        var diff = 0

        return (
            /* <WebView
                originWhitelist={['*']}
                source={{
                    html: loader()
                }}
            /> */
            <PinchGestureHandler onGestureEvent={event => {
                if (flag && event.nativeEvent.focalX > windowWidth * 2/3) {
                    diff = imageWidth - event.nativeEvent.focalX
                }
                pinchScale.setValue(event.nativeEvent.scale)

                if (event.nativeEvent.focalX > windowWidth * 2/3) {
                    adjustedFocal.setValue((windowWidth * (event.nativeEvent.scale*lastScale-1) * -1)/2-diff)
                }
                
                if (event.nativeEvent.focalX < windowWidth/3) {
                    adjustedFocal.setValue(windowWidth * (event.nativeEvent.scale*lastScale-1) / 2)
                }
                
                // alert((imageWidth * (event.nativeEvent.scale*lastScale-1) * proportion )/2)
                /* Animated.event(
                    [{ nativeEvent: { scale: pinchScale, focalX: adjustedFocal } }]
                ) */
            }}
            onHandlerStateChange={event => {
                /* if (event.nativeEvent.state === State.BEGAN) {
                    focalX = event.nativeEvent.focalX
                } */
                /* if (event.nativeEvent.state === State.ACTIVE) {
                    const focalX = event.nativeEvent.focalX
                    const proportion = focalX/windowWidth
                    // alert(JSON.stringify(event.nativeEvent))
                    if (focalX > windowWidth/2) {
                        adjustedFocal.setValue()
                    }
                } */
                if (event.nativeEvent.oldState === State.ACTIVE) {
                    diff = imageWidth * (event.nativeEvent.scale-1)
                    imageWidth = imageWidth + imageWidth * (event.nativeEvent.scale-1)
                    flag = true
                    lastScale *= event.nativeEvent.scale;
                    baseScale.setValue(lastScale);
                    pinchScale.setValue(1)
                    // alert(lastScale)
                }
            }}>
                <Animated.View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.Image
                        source={{
                        uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg'
                        }}
                        style={[
                            {
                                width: '100%',
                                height: 300
                            },
                            {
                                transform: [{ translateX: adjustedFocal }, { scale: scale }]
                            } 
                        ]}
                        resizeMode="contain"
                    />
                </Animated.View>
            </PinchGestureHandler>
            
        )
    }

    function haveText () {
        if ( tweet.text ) {
            return (
                <Text style={{fontFamily: 'Helvetica-Neue-Light', marginBottom: 10}}>
                    <TweetText tweet={tweet}/>
                </Text>
            );
        }
        else {
            return(null);
        }
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
                    <QuotedTweet tweet={tweet.quoted_status} route={route} navigation={navigation} />
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

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View key='tweetBox' style={{
                    width: '95%',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 5,
                    borderColor: '#e1e8ed',
                    padding: 10
                }}>
                    {retweetInfo}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                        <TweetHeader
                            tweet={tweet}
                            elementsWidth={2+20+34+5+5+20}
                            fonts={{fontOfDisplayName: 'Helvetica-Neue-Bold', fontOfUsername: 'Helvetica-Neue-Regular'}} 
                        />
                        <MaterialCommunityIcons
                            name="twitter"
                            size={18}
                            color="#1DA1F2"
                            onPress={()=>{Linking.openURL('twitter://post?message=hello&in_reply_to_status_id=20');}} 
                        />
                    </View>
                    {replayInfo}
                    <TweetContent
                        route={route}
                        navigation={navigation}
                        tweet={tweet}
                        style={tweetMedia}
                    />
                    {
                        tweet.quoted_status
                            ? quotedTweet
                            : null
                    }{/* 
                    {quotedTweet} */}
                    <View key="tweetFooter" style={{flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="tw_and_fb_icons-01" size={15} color="gray" style={{marginRight: 8}} />
                            <Icon name="tw_and_fb_icons-02" size={15} color="gray" style={{marginRight: 8}}/>
                            <Icon name="tw_and_fb_icons-03" size={15} color="gray" />
                        </View>
                        <View>
                            <Text style={{fontFamily: 'Helvetica-Neue-Bold'}}>
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
    /* } else {
        return (
            <Text>
                Waiting...
            </Text>
        )
    } */

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

