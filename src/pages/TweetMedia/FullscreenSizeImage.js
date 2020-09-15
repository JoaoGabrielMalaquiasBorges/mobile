import React from 'react'
import { StatusBar } from 'react-native'
import axios from 'axios'
import { parse } from 'node-html-parser'
import ViewPager from '@react-native-community/viewpager'
import ImageContainer from './ImageContainer'

function FullscreenSizeImage ({ route }) {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    axios('https://blog.twitter.com/developer/en_us/topics/tools/2020/covid19_public_conversation_data.html')
    .then(response => {
        const html = parse(response.data)
        html.querySelector('head').querySelectorAll('meta').map(item => {
            if (item.getAttribute('property') == 'og:title') {
                alert(item.getAttribute('content'))
            }
        })
        // alert(response.data)
    })
    // .catch((error) => alert( error.response.request._response ) )
    const images = route.params.images.map(image => 
        <ImageContainer key={image.id_str} imageSource={image.media_url} />
    )

    return (
        <>
        <StatusBar hidden />
        <ViewPager initialPage={route.params.index} style={{ height: `${route.params.images.length}00%`, width: '100%' }} >
            {images}
        </ViewPager>
        </>
    )
}

export default FullscreenSizeImage
