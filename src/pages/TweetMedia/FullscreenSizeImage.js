import React from 'react'
import { StatusBar } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import ImageContainer from './ImageContainer'

function FullscreenSizeImage ({ route }) {
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
