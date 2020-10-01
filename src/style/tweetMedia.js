const tweetMedia = {
    media: {
        photo: {
            container: {
                marginBottom: 10,
                borderRadius: 10,
                overflow: 'hidden',
                width: '100%',
                aspectRatio: 2
            }
        },
        video: {
            container: {
                width: '100%',
                maxWidth: 444.45,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
                borderRadius: 10,
                overflow: 'hidden'
            }
        },
        gif: {
            container: {
                width: '100%',
                // maxWidth: tweet.extended_entities.media[0].sizes.large.w,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
                borderRadius: 10,
                overflow: 'hidden'
            }
        }
    }
}

export default tweetMedia