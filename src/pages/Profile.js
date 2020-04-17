import React, { useState, useEffect} from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Video } from 'expo-av';
import Icon from './CustomIcon';
import * as Font from 'expo-font';
import TweetVideoFunction from './TweetVideoFunction';
import { NavigationEvents, NavigationActions } from 'react-navigation';

function Profile({ navigation }) {
    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });

    const notFullscreenSizeVideo = navigation.getParam('notFullscreenSizeVideo');
    const fullscreenVideoRef = React.createRef();

    //alert(notFullscreenSizeVideo.routeKey + '\n' + navigation.state.key)

    useEffect(() => {
        //alert( JSON.stringify(notFullscreenSizeVideo.playbackStatus) );
        fullscreenVideoRef.current.setStatusAsync(notFullscreenSizeVideo.playbackStatus).then(
            /* e => {
                alert( JSON.stringify(notFullscreenSizeVideo.playbackStatus) );
            } */
        );
        return () => {
            fullscreenVideoRef.current.unloadAsync();
        };
    });

    /* for(var property in navigation.state) {
        alert(property + "=" + navigation.state[property]);
    } */
    
    return(
        <>
            <StatusBar hidden={true} />
            <NavigationEvents
                onWillBlur={
                    payload => fullscreenVideoRef.current.getStatusAsync().then(
                        playbackStatus => {
                            //notFullscreenSizeVideo.videoRef.current.setStatusAsync(playbackStatus);
                            notFullscreenSizeVideo.videoRef.current.playFromPositionAsync(5000);
                        }
                    )
                }
            />
            <View>
                <Video
                    ref={fullscreenVideoRef}
                    //resizeMode="contain"
                    source={{ uri: notFullscreenSizeVideo.videoRef.current.props.source.uri }}
                    style={{ height: 250, width: 300 }}
                    //onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
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