import React from 'react'
import { StatusBar } from 'react-native'
import WebView from 'react-native-webview'

function FullscreenSizeImage ({ route }) {
    var imageSource = route.params.uri

    return (
        <>
        <StatusBar hidden />
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
            style={{ backgroundColor: 'black' }}
        />
        </>
    )
}

export default FullscreenSizeImage
