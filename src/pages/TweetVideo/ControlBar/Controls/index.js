import * as Font from 'expo-font';
import React from 'react';
import { Animated, View } from 'react-native';
import Playback from './Playback';
import Volume from './Volume';
import ScreenSize from './ScreenSize';
import { controls } from './styles';

function Controls({ route, navigation, video, videoRef, fadeControlBar }) {
    const controlBarRef = React.createRef()

    return (
        <Animated.View
            ref={controlBarRef}
            style={controls.container}
        >
            <Playback
                route={route}
                navigation={navigation}
                videoRef={videoRef}
                fadeControlBar={fadeControlBar}
            />
            <View style={controls.subcontainer}>
                <Volume navigation={navigation} route={route} videoRef={videoRef}/>
                <ScreenSize
                    navigation={navigation}
                    route={route}
                    video={video}
                    videoRef={videoRef}
                    fadeControlBar={fadeControlBar}
                />
            </View>
        </Animated.View>
    )
}

export default Controls;