import React from 'react';
import { Text } from 'react-native';

function TweetText({ text, entities }) {

    var tweetText = '';
    var tweetTextComponent= [];
    var tweetSpecialText = [];
    var aux = [];
    var aux2 = [];
    var finalIndexes = [];

    // if ( !tweet.truncated ) {
        tweetText = text;
        var hashtags = entities.hashtags;
        var urls = entities.urls;
        var user_mentions = entities.user_mentions;
        var symbols = entities.symbols;
    /* }
    else {
        tweetText = tweet.extended_tweet;
        var hashtags = tweet.extended_tweet.entities.hashtags;
        var urls = tweet.extended_tweet.entities.urls;
        var user_mentions = tweet.extended_tweet.entities.user_mentions;
        var symbols = tweet.extended_tweet.entities.symbols;
    } */

    if ( hashtags.length > 0 ) {
        hashtags.forEach(element => {
            tweetSpecialText[element.indices[0]] = <Text key={element.indices[0]} style={{color: '#1DA1F2'}}>{"#" + element.text}</Text>;
            finalIndexes[element.indices[1]] = element.indices[1];
        });
    }
    if ( urls.length > 0 ) {
        urls.forEach(element => {
            tweetSpecialText[element.indices[0]] = <Text key={element.indices[0]} style={{color: '#1DA1F2'}}>{element.display_url}</Text>;
            finalIndexes[element.indices[1]] = element.indices[1];
        });
    }
    if ( user_mentions.length > 0  ) {
        user_mentions.forEach(element => {
            tweetSpecialText[element.indices[0]] = <Text key={element.indices[0]} style={{color: '#1DA1F2'}}>{"@" + element.screen_name}</Text>;
            finalIndexes[element.indices[1]] = element.indices[1];
        });
    }
    if ( symbols.length > 0  ) {
        symbols.forEach(element => {
            tweetSpecialText[element.indices[0]] = <Text key={element.indices[0]} style={{color: '#1DA1F2'}}>{"$" + element.text}</Text>;
            finalIndexes[element.indices[1]] = element.indices[1];
        });
    }

    if ( tweetSpecialText.length > 0 ) {
        tweetSpecialText.map(function (element, key) {
            aux.push(key);
        })
        finalIndexes.map(function (element) {
            aux2.push(element);
        })
        var start, i = 0;
        aux.forEach(element => {
            if ( element != start ) {
                tweetTextComponent.push(tweetText.substring(start, element));
                tweetTextComponent.push(tweetSpecialText[element]);
                start = aux2[i];
                i++;
            }
            else {
                tweetTextComponent.push(tweetSpecialText[element]);
                start = aux2[i];
                i++;
            }
        });
        if ( tweetText.substring(start).length > 0 ) {
            tweetTextComponent.push(tweetText.substring(start));
        }
    }
    else {
        tweetTextComponent.push(text);
    }
    
    return (tweetTextComponent);
}

export default TweetText;