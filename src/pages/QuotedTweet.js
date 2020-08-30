import React from 'react'
import { Text, View, Image } from 'react-native'
import TweetHeader from './TweetHeader'
import TweetText from './TweetText';
import TweetMedia from './TweetMedia'
import { tweetMedia } from './styles'

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
            <TweetMedia
                route={route}
                navigation={navigation}
                media={tweet.extended_entities.media}
                style={tweetMedia}
            />
        </View>
    );
}

export default QuotedTweet;