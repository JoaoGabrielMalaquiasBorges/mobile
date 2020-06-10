import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from '../CustomIcon';
import videoStyles from '../../style/index';
import TweetVideoControlBar from "../TweetVideoControlBar";
import { testFunction, finishProgress } from '../TweetVideoProgressBar';
import { useFocusEffect } from '@react-navigation/native'
import TweetVideoProgressBar from "../TweetVideoProgressBar"
import runOnce from "../../../utils/once.js"
import { container } from './styles'
import Timer from './Timer'

function ControlBar ({ route, navigation, videoRef }) {
    return (
        <View style={container}>
            <TweetVideoProgressBar
                videoRef={videoRef}
                width={{
                    portraitWidth: 0.95-42, // Dimensions.get('window').width*0.95-42
                    landscapeWidth: 424.45
                }}
                videoBoxOffset={(-22)-444.45} // (Dimensions.get('window').width*0.95-22)-444.45
            />
            <TweetVideoControlBar
                videoRef={videoRef}
                navigatorProps={{
                    navigation: navigation,
                    route: route
                }}
                controlsState={{
                    playback: 'play',
                    volume: 'volume-off'
                }}
            />
            <Timer navigation={navigation} route={route}/>
        </View>
    )
}

export default ControlBar