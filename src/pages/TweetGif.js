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
                    style={{height: gif.sizes.small.h, backgroundColor: 'black', borderRadius: 5}}
                />
                <View style={{height: 18, width: 28, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', bottom: 5, marginLeft: 5, borderRadius: 5}}>
                    <Text style={{position: 'relative', color: 'white', fontSize: 12, fontWeight: "bold"}}>
                        GIF
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default TweetGif;