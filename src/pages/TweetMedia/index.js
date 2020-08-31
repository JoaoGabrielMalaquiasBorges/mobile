import React from 'react'
import { View } from 'react-native'
import TweetImage from './TweetImage'
import TweetVideo from '../TweetVideo'
import TweetGif from './TweetGif'

function TweetMedia ({ route, navigation, media, style }) {
    switch (media[0].type) {
        case 'photo':
            return (
                <View style={style.photo.container}>
                    <TweetImage
                        images={media}
                    /> 
                </View>
            )
    
        case 'video':
            return (
                <View style={style.video.container}>
                    <TweetVideo
                        route={route}
                        navigation={navigation}
                        video={media[0]}
                    />   
                </View>
            )
    
        case 'animated_gif':
            return (
                <View style={{ ...style.gif.container, maxWidth: media[0].sizes.large.w }}>
                    <TweetGif
                        gif={media[0]}
                    />  
                </View>
                
            )
    }
}

export default TweetMedia