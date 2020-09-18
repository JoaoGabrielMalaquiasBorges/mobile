import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import Icon from '../CustomIcon'
import axios from 'axios'
import { parse } from 'node-html-parser'

function tweetLinkPreview (urls, style) {
    var url
    var title
    var image

    var promise = new Promise((resolve) => {
        axios(urls[0].expanded_url)
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

            if (!(url && title && image)) {
                resolve(null)
            }
            
            // removing protocol and 'www.' prefixes from url
            url = url.split('/', 3)
            url = url[url.length-1]
            url = url.split('www.')
            url = url[url.length-1]

            resolve(
                <View key='linkPreview' style={{ ...style.photo.container, borderWidth: 1, borderColor: 'lightgray' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{ uri: image }}
                            style={{ height: 80, width: 80, marginRight: 10 }}
                        />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Helvetica-Neue-Light' }}>{title}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='link' size={15} color='lightgray' />
                                <Text style={{ color: 'gray', fontFamily: 'Helvetica-Neue-Light' }}>{url}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
        .catch(() => resolve(null) )
    })
    return promise
}

export default tweetLinkPreview