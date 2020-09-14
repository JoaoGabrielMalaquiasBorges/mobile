import React from 'react'
import WebView from 'react-native-webview'

function ImageContainer ({ imageSource }) {
    return (
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
    )
}

export default ImageContainer
