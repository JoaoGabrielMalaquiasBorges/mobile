import React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'

function TweetImage(props) {
   var images = props.images
   
   switch ( images.length ) {
        case 1:
            return(
                /* <View style={{width: '100%', aspectRatio: 2}}>
                    <TouchableWithoutFeedback onPressIn={() => {
                        props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                    }> */
                        <Image
                            source={{uri: images[0].media_url}}
                            style={{ height: '100%' }}
                        />
                    /* </TouchableWithoutFeedback>
                </View> */
            );
        case 2:
            return(
                <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
                <Image
                    key='photo_1'
                    resizeMode="cover"
                    source={{uri: images[0].media_url}}
                    style={{height: '100%', width: '50%'}}
                />
                <Image
                    key='photo_2'
                    resizeMode="cover"
                    source={{uri: images[1].media_url}}
                    style={{height: '100%', width: '50%'}}
                />
                </View>
                /* <View key='images_container' style={{ flexDirection: 'row'}}>
                    <View style={{width: '50%', aspectRatio: 1,  paddingRight: 1}}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                        }>
                            <Image
                                key='photo_1'
                                resizeMode="cover"
                                source={{uri: images[0].media_url}}
                                style={{height: '100%'}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                     <View style={{width: '50%', aspectRatio: 1,  paddingLeft: 1}}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 1 })}
                        }>
                            <Image
                                key='photo_2'
                                resizeMode="cover"
                                source={{uri: images[1].media_url}}
                                style={{height: '100%'}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View> */
            );
        case 3:
            return (
                <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
                    <View style={{ height: '100%', width: '50%' }}>
                        <Image
                            key='photo_1'
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{height: '100%', width: '100%'}}
                        />
                    </View>
                    <View style={{ height: '100%', width: '50%', flexDirection: 'column' }}>
                        <Image
                            key='photo_2'
                            resizeMode="cover"
                            source={{uri: images[1].media_url}}
                            style={{height: '50%', width: '100%'}}
                        />
                        <Image
                            key='photo_3'
                            resizeMode="cover"
                            source={{uri: images[2].media_url}}
                            style={{height: '50%', width: '100%'}}
                        />
                    </View>
                </View>
                /* <View key='images_container' style={{flexDirection: 'row'}}>
                    <View key='column_1' style={{width: '50%', paddingRight: 1}}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                        }>
                            <Image
                                key='photo_1'
                                resizeMode="cover"
                                source={{uri: images[0].media_url}}
                                style={{aspectRatio: 1}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View key='column_2' style={{width: '50%', paddingLeft: 1, flexDirection: 'column'}}>
                        <View style={{aspectRatio: 2, paddingBottom: 1}}>
                            <TouchableWithoutFeedback onPressIn={() => {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 1 })}
                            }>
                                <Image
                                    key='photo_2'
                                    resizeMode="cover"
                                    source={{uri: images[1].media_url}}
                                    style={{height: '100%'}}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{aspectRatio: 2, paddingTop: 1}}>
                            <TouchableWithoutFeedback onPressIn={() => {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 2 })}
                            }>
                                <Image
                                    key='photo_3'
                                    resizeMode="cover"
                                    source={{uri: images[2].media_url}}
                                    style={{height: '100%'}}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View> */
            );
        case 4:
            return (
                <View style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
                    <View style={{ height: '50%', width: '100%', flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPressIn={() => {
                            if (props.containerWidth == '100%') {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                            }
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[0].media_url}}
                                style={{height: '100%', width: '50%'}}
                            />
                        </TouchableWithoutFeedback>
                        <View style={{ width: '1%', minWidth: 1 }}/>
                        <TouchableWithoutFeedback onPressIn={() => {
                            if (props.containerWidth == '100%') {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 1 })}
                            }
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
                            if (props.containerWidth == '100%') {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 2 })}
                            }
                        }>
                            <Image
                                resizeMode="cover"
                                source={{uri: images[2].media_url}}
                                style={{height: '100%', width: '50%'}}
                            />
                        </TouchableWithoutFeedback>
                        <View style={{ width: '1%', minWidth: 1 }}/>
                        <TouchableWithoutFeedback onPressIn={() => {
                            if (props.containerWidth == '100%') {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 3 })}
                            }
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