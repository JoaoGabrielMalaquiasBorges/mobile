import React from 'react'
import { View, Image, Animated } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

function TweetImage(props) {
   var images = props.images
   var myRef = React.createRef();
   var pinchScale = new Animated.Value(1)

    switch ( images.length ) {
        case 1:
            return(
                <PinchGestureHandler /* {...gestureHandler} */ onGestureEvent={
                    
                        Animated.event(
                            [{ nativeEvent: { scale: pinchScale } }]
                        )
                }
                onHandlerStateChange={event => {
                    if (event.nativeEvent.state === State.END) {
                        myRef.current.setNativeProps({
                            sytle: {
                                width: JSON.stringify(pinchScale)*100 + '%'
                            }
                        })
                    }
                }}
                >
                    <Animated.View key='images_container'  ref={myRef} style={{width: '100%', aspectRatio: 2}}>
                        <Animated.Image
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{ height: '100%', transform: [{ scale: pinchScale }] }}
                        />
                    </Animated.View>
                </PinchGestureHandler>
            );
        case 2:
            return(
                <View key='images_container' style={{flexDirection: 'row'}}>
                    <View style={{width: '50%', aspectRatio: 1,  paddingRight: 1}}>
                        <Image
                            key='photo_1'
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{height: '100%'}}
                        />
                    </View>
                    <View style={{width: '50%', aspectRatio: 1,  paddingLeft: 1}}>
                        <Image
                            key='photo_2'
                            resizeMode="cover"
                            source={{uri: images[1].media_url}}
                            style={{height: '100%'}}
                        />
                    </View>
                </View>
            );
        case 3:
            return(
                <View key='images_container' style={{flexDirection: 'row'}}>
                    <View key='column_1' style={{width: '50%', paddingRight: 1}}>
                        <Image
                            key='photo_1'
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{aspectRatio: 1}}
                        />
                    </View>
                    <View key='column_2' style={{width: '50%', paddingLeft: 1, flexDirection: 'column'}}>
                        <View style={{aspectRatio: 2, paddingBottom: 1}}>
                            <Image
                                key='photo_2'
                                resizeMode="cover"
                                source={{uri: images[1].media_url}}
                                style={{height: '100%'}}
                            />
                        </View>
                        <View style={{aspectRatio: 2, paddingTop: 1}}>
                            <Image
                                key='photo_3'
                                resizeMode="cover"
                                source={{uri: images[2].media_url}}
                                style={{height: '100%'}}
                            />
                        </View>
                    </View>
                </View>
            );
        case 4:
            return(
                <View key='images_container' style={{flexDirection: 'column'}}>
                    <View key='line_1' style={{flexDirection: 'row'}}>
                        <View style={{width: '50%', aspectRatio: 2,  paddingRight: 1, paddingBottom: 1}}>
                            <Image
                                key='photo_1'
                                resizeMode="cover"
                                source={{uri: images[0].media_url}}
                                style={{height: '100%'}}
                            />
                        </View>
                        <View style={{width: '50%', aspectRatio: 2,  paddingLeft: 1, paddingBottom: 1}}>
                            <Image
                                key='photo_2'
                                resizeMode="cover"
                                source={{uri: images[1].media_url}}
                                style={{height: '100%'}}
                            />
                        </View>
                    </View>
                    <View key='line_2' style={{flexDirection: 'row'}}>
                        <View style={{width: '50%', aspectRatio: 2,  paddingTop: 1, paddingRight: 1}}>
                            <Image
                                key='photo_3'
                                resizeMode="cover"
                                source={{uri: images[2].media_url}}
                                style={{height: '100%'}}
                            />
                        </View>
                        <View style={{width: '50%', aspectRatio: 2,  paddingTop: 1, paddingLeft: 1}}>
                            <Image
                                key='photo_4'
                                resizeMode="cover"
                                source={{uri: images[3].media_url}}
                                style={{height: '100%'}}
                            />
                        </View>
                    </View>
                </View>
            );
    }
}

export default TweetImage;