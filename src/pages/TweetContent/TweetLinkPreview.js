import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import axios from 'axios'
import { parse } from 'node-html-parser'

function TweetLinkPreview ({ urls, style }) {
    const [content, setContent] = useState(null)
    var url
    var title
    var image

    if ( urls.length == 1) {
        axios('https://blog.twitter.com/developer/en_us/topics/tools/2020/covid19_public_conversation_data.html')
        .then(response => {
            const html = parse(response.data)
            html.querySelector('head').querySelectorAll('meta').map(item => {
                switch (item.getAttribute('property')) {
                    case 'og:url':
                        url = item.getAttribute('content')
                        break
                
                    case 'og:title':
                        title = item.getAttribute('content')
                        break
                
                    case 'og:image':
                        image = item.getAttribute('content')
                        break
                
                    default:
                        break
                }
            })
            url = url.split('/', 3)
            url = url[2]
            setContent(
                <View style={{ ...style.photo.container, borderWidth: 1, borderColor: 'lightgray' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{ uri: image }}
                            style={{ height: 70, width: 70,marginRight: 10 }}
                        />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Helvetica-Neue-Light' }}>{title}</Text>
                            <Text style={{ color: 'gray', fontFamily: 'Helvetica-Neue-Light' }}>{url}</Text>
                        </View>
                    </View>
                </View>
            )
        })
        // .catch((error) => alert( error.response.request._response ) )
    }
    return content
}

export default TweetLinkPreview