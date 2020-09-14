import React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'

function TweetImage(props) {
   var images = props.images
   
   switch ( images.length ) {
        case 1:
            return(
                <View key='images_container' style={{width: '100%', aspectRatio: 2}}>
                    <TouchableWithoutFeedback onPressIn={() => {
                        props.navigation.navigate('FullscreenSizeImage', { images: images, index: 0 })}
                    }>
                        <Image
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{height: '100%'}}
                        />
                    </TouchableWithoutFeedback>
                </View>
            );
        case 2:
            return(
                <View key='images_container' style={{flexDirection: 'row'}}>
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
                </View>
            );
        case 3:
            return(
                <View key='images_container' style={{flexDirection: 'row'}}>
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
                </View>
            );
        case 4:
            return(
                <View key='images_container' style={{flexDirection: 'column'}}>
                    <View key='line_1' style={{flexDirection: 'row'}}>
                        <View style={{width: '50%', aspectRatio: 2,  paddingRight: 1, paddingBottom: 1}}>
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
                        <View style={{width: '50%', aspectRatio: 2,  paddingLeft: 1, paddingBottom: 1}}>
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
                    </View>
                    <View key='line_2' style={{flexDirection: 'row'}}>
                        <View style={{width: '50%', aspectRatio: 2,  paddingTop: 1, paddingRight: 1}}>
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
                        <View style={{width: '50%', aspectRatio: 2,  paddingTop: 1, paddingLeft: 1}}>
                            <TouchableWithoutFeedback onPressIn={() => {
                                props.navigation.navigate('FullscreenSizeImage', { images: images, index: 3 })}
                            }>
                                <Image
                                    key='photo_4'
                                    resizeMode="cover"
                                    source={{uri: images[3].media_url}}
                                    style={{height: '100%'}}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            );
    }
}

export default TweetImage;