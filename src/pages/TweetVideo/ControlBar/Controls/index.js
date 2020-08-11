import * as Font from 'expo-font';
import React from 'react';
import { Animated, View } from 'react-native';
import Playback from './Playback';
import Volume from './Volume';
import ScreenSize from './ScreenSize';
import { controls } from './styles';

function Controls({ route, navigation, videoRef, fadeControlBar }) {
    Font.loadAsync({
        'FontName': require("../../../../../assets/fonts/icomoon.ttf")
    });

    const controlBarRef = React.createRef();


    /* const prevParams = route.params != undefined ? route.params.rate : undefined
    var flag = false
    useMemo(() => { flag = true }, [prevParams])

    useEffect(() => {
        if (route.name == 'Main' && route.params != undefined) {
            flag == true ? alert('hi') : alert('ho')
        }
    }, [route.params]) */


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
                <ScreenSize navigation={navigation} route={route} videoRef={videoRef}/>
            </View>
        </Animated.View>
    )
}

export default Controls;