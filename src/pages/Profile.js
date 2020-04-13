import React, { useState, useEffect} from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Video } from 'expo-av';
import Icon from './CustomIcon';
import * as Font from 'expo-font';
import TweetVideoFunction from './TweetVideoFunction';
import { NavigationEvents } from 'react-navigation';

function Profile({ navigation }) {
    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });

    const videoRef = navigation.getParam('videoRef');
    const fullscreenVideoRef = React.createRef();

    useEffect(() => {
        /* videoRef.current.getStatusAsync().then(
            playbackStatus => {
                fullscreenVideoRef.current.setStatusAsync(playbackStatus).then(
                    () => {
                        fullscreenVideoRef.current.playAsync();
                    }
                );
                //alert( JSON.stringify(playbackStatus) );
            }
        ); */
        //alert(navigation.isFocused())
        /* const unsubscribe = navigation.addListener('focus', e => {
            alert ('hi');
        }); */
        //navigation.addListener()
        return () => {
            //videoRef.current.playFromPositionAsync(5000);
        };
    });
    
    return(
        <>
            <StatusBar hidden={true} />
            <NavigationEvents
                onWillBlur={() => videoRef.current.playFromPositionAsync(5000)}
            />
            <View>
                <Video
                    ref={fullscreenVideoRef}
                    resizeMode="contain"
                    source={{ uri: videoRef.current.props.source.uri }}
                    style={{ height: 250, width: 300 }}/* 
                    onPlaybackStatusUpdate={_onPlaybackStatusUpdate} */
                />
                <Icon
                    name='play'
                    size={20}
                    color="black"
                    style={{ height: 20, marginLeft: 100 }}
                    onPress={
                        () => {
                            fullscreenVideoRef.current.playAsync();
                        }
                    }
                />
            </View>
        </> 
    );
}

export default Profile;