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
                width: 50,
                height: 50
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