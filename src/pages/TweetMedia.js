import React from 'react'
import TweetImage from './TweetImage'
import TweetVideo from './TweetVideo'
import TweetGif from './TweetGif'

function TweetMedia ({ route, navigation, media }) {
    switch (media[0].type) {
        case 'photo':
            return (
                <TweetImage
                    images={media}
                    width={Dimensions.get('window').width-42}
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