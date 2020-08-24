import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

function TweetGif(props) {
    var gif = props.gif;
    let myRef = React.createRef();
    function play() {
        myRef.current.replayAsync();
    }
    return (
        <TouchableWithoutFeedback onPress={play}>
            <View>
                <Video
                    resizeMode="cover"
                    ref={myRef}
                    source={{uri: gif.video_info.variants[0].url}}
                    isMuted={true}
                    style={{
                        width: gif.sizes.large.w,
                        maxWidth: '100%', 
                        aspectRatio: gif.video_info.aspect_ratio[0]/gif.video_info.aspect_ratio[1],
                        backgroundColor: 'black'
                    }}
                />
                <View style={{position: 'absolute', bottom: 10, height: 18, width: 30, marginLeft: 10, borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, 0.3)', alignItems: 'center'}}>
                    <Text style={{position: 'relative', color: 'white', fontSize: 12, fontWeight: "bold", letterSpacing: 0.5}}>
                        GIF
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default TweetGif;