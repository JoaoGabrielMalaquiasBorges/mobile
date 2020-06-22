import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image, Text  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import { ScreenOrientation  } from 'expo';
import Icon from '../CustomIcon';
import videoStyles from '../../style/index';
import Controls from "./Controls";
import { testFunction, finishProgress } from './ProgressBar';
import { useFocusEffect } from '@react-navigation/native'
import ProgressBar from "./ProgressBar"
import runOnce from "../../../utils/once.js"
import { controlBar } from './styles'
import Timer from './Timer'

function ControlBar ({ route, navigation, videoRef }) {
    return (
        <View style={controlBar.container}>
            <ProgressBar
                videoRef={videoRef}
                width={{
                    portraitWidth: route.name == 'Main'
                        ? 0.95-42 // Dimensions.get('window').width*0.95-42
                        : -20, // Dimensions.get('window').width-20
                    landscapeWidth: route.name == 'Main'
                        ? 424.45
                        : -20 // Dimensions.get('window').width-20
                }}
                videoBoxOffset={
                    route.name == 'Main'
                        ? (-22)-444.45 // (Dimensions.get('window').width*0.95-22)-444.45
                        : 0
                }
            />
            <Controls
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