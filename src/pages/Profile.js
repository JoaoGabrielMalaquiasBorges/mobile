import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Video } from 'expo-av';
import Icon from './CustomIcon';
import * as Font from 'expo-font';
import TweetVideoFunction from './TweetVideoFunction';

function Profile({ navigation }) {
    Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });
    const videoRef = navigation.getParam('videoRef');
    const videoRef2 = React.createRef();
    var a = null;
    videoRef.current.getStatusAsync().then(
        status => {
            a = status;
            videoRef2.current.setStatusAsync(a)
            //alert(JSON.stringify(a));
        }
    )
    return(
        <>
            <StatusBar hidden={true}/>
            <View>
                <Video
                    ref={videoRef2}
                    resizeMode="contain"
                    source={{ uri: videoRef.current.props.source.uri }}
                    status={a}
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
                            videoRef2.current.setStatusAsync(videoRef.current.getStatusAsync())
                        }
                    }
                />
            </View>
        </> 
    );
}

export default Profile;