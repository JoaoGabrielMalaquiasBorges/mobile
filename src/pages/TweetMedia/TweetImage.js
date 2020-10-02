import React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'

function TweetImage(props) {
   var images = props.images
   
   switch ( images.length ) {
        case 1:
            return (
                
                <TouchableWithoutFeedback onPressIn={() => {
                    props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                }>
                    <Image
                        source={{uri: images[0].media_url}}
                        style={{ height: '100%' }}
                    />
                </TouchableWithoutFeedback>
                
            )

        case 2:
            return (
                <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPressIn={() => {
                        props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                    }>
                        <Image
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{height: '100%', width: '50%'}}
                        />
                    </TouchableWithoutFeedback>
                    <View style={{ width: '1%', minWidth: 1 }}/>
                    <TouchableWithoutFeedback onPressIn={() => {
                        props.navigation.navigate('FullscreenSizeImage', { images: images, index: 1 })}
                    }>
                        <Image
                            resizeMode="cover"
                            source={{uri: images[1].media_url}}
                            style={{height: '100%', width: '50%'}}
                        />
                    </TouchableWithoutFeedback>
                </View>
            )

        case 3:
            return (
                <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
                    <View style={{ height: '100%', width: '50%' }}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[0].media_url}}
                                style={{height: '100%', width: '100%'}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ width: '1%', minWidth: 1 }}/>
                    <View style={{ height: '100%', width: '50%', flexDirection: 'column' }}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 1 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[1].media_url}}
                                style={{height: '50%', width: '100%'}}
                            />
                        </TouchableWithoutFeedback>
                        <View style={{ height: '2%', minHeight: 1 }}/>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 2 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[2].media_url}}
                                style={{height: '50%', width: '100%'}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )

        case 4:
            return (
                <View style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
                    <View style={{ height: '50%', width: '100%', flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[0].media_url}}
                                style={{height: '100%', width: '50%'}}
                            />
                        </TouchableWithoutFeedback>
                        <View style={{ width: '1%', minWidth: 1 }}/>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 1 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[1].media_url}}
                                style={{height: '100%', width: '50%'}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ height: '2%', minHeight: 1 }}/>
                    <View style={{ height: '50%', width: '100%', flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 2 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[2].media_url}}
                                style={{height: '100%', width: '50%'}}
                            />
                        </TouchableWithoutFeedback>
                        <View style={{ width: '1%', minWidth: 1 }}/>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 3 })}
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[3].media_url}}
                                style={{height: '100%', width: '50%'}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
    }
}

export default TweetImage;