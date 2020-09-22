const quotedTweet = {
    container: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#e1e8ed',
        overflow: 'hidden'
    },
    media: {
        photo: {
            container: {
                width: 60,
                height: 60,
                borderRadius: 10,
                overflow: 'hidden'
            }
        },
        video: {
            container: {
                width: '100%',
                maxWidth: 444.45,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        },
        gif: {
            container: {
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        }
    }
}

export default quotedTweet