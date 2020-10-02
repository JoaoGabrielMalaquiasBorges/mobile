import React from 'react'
import TweetImage from './TweetImage'
import TweetVideo from '../TweetVideo'
import TweetGif from './TweetGif'

function TweetMedia ({ route, navigation, media, type }) {
    switch (type) {
        case 'photo':
            return (
                <TweetImage
                    navigation={navigation}
                    images={media}
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
                <TweetGif
                    gif={media[0]}
                />
            )
    }
}

export default TweetMedia