import React from 'react';
import { Animated } from 'react-native';
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import Timer from './Timer';
import { controlBar } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

var flag = 0
var displayValue = new Animated.Value(flag)

export function fadeControlBar (duration, delay, value) {
    Animated.timing(displayValue, {
        toValue: (flag-1)*(-1) || value,
        duration: duration,
        delay: delay
    }).start(({ finished }) => { flag = (flag-1)*(-1) || value })
}

function ControlBar ({ route, navigation, videoRef }) {
    return (
        <Animated.View style={{
            ... route.name == 'FullscreenSizeVideo'
                    ? controlBar.fullscreenSize.container
                    : controlBar.notFullscreenSize.container,
            opacity: displayValue,
            zIndex: displayValue
        }}>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={
                    route.name == 'FullscreenSizeVideo'
                        ? controlBar.fullscreenSize.gradient
                        : controlBar.notFullscreenSize.gradient
                }
            >
                <ProgressBar
                    route={route}
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
                    route={route}
                    navigation={navigation}
                    videoRef={videoRef}
                    fadeControlBar={fadeControlBar}
                />
                <Timer navigation={navigation} route={route}/>
            </LinearGradient>
        </Animated.View>
    )
}

export default ControlBar