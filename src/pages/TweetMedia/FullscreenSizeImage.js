import React from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import WebView from 'react-native-webview'
import { PinchGestureHandler } from 'react-native-gesture-handler'

function FullscreenSizeImage ({ route }) {
    var imageSource = route.params.uri

    return (
        <>
        <StatusBar hidden />
        <View onResponderTerminationRequest={() => true} style={{ height: '100%', width: '100%' }}>
        
        <WebView
            originWhitelist={['*']}
            source={{
                html: `
                    <div style="margin-left: -1%; margin-right: -1%; height: 100%; display: flex; justify-content: center; align-items: center">
                        <img style="max-width: 100%; max-height: 100%" src="${imageSource}"/>
                    </div>
                `
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ height: '100%', width: '100%', backgroundColor: 'black' }}
        />
        </View>
        </>
    )
}

export default FullscreenSizeImage
