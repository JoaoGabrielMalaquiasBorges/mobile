import React from 'react'
import { View } from 'react-native'
import TweetImage from './TweetImage'
import TweetVideo from '../TweetVideo'
import TweetGif from './TweetGif'

function TweetMedia ({ route, navigation, media, type, style }) {
    switch (type) {
        case 'photo':
            return (
                <TweetImage
                    navigation={navigation}
                    images={media}
                    containerWidth={style.photo.container.width}
                />
            )
    
        case 'video':
            return (
                <TweetVideo
                    route={route}
                    navigation={navigation}
                    video={media[0]}
                />
            )
    
        case 'animated_gif':
            return (
                // <View style={{ ...style.gif.container, maxWidth: media[0].sizes.large.w }}>
                    <TweetGif
                        gif={media[0]}
                    />  
                // </View>
                
            )
    }
}

export default TweetMedia