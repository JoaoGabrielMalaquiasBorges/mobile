import React from 'react';
import { View } from 'react-native';
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import Timer from './Timer';
import { controlBar } from './styles';

function ControlBar ({ route, navigation, videoRef }) {
    return (
        <View style={controlBar.container}>
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