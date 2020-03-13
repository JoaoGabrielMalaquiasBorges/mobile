import React from 'react';
import { Dimensions, View, Image } from 'react-native';

function TweetImage(props) {
    var images = props.images;
    var tweetImageContent = [];
    switch ( images.length ) {
        case 1:
            tweetImageContent.push(
                <View key='images_container'>
                    <Image
                        resizeMode="cover"
                        source={{uri: images[0].media_url}}
                        style={{height: props.width/2, borderRadius: 5}}
                    />
                </View>
            );
            break;
        case 2:
            tweetImageContent.push(
                <View key='images_container' style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image
                        key='photo_1'
                        resizeMode="cover"
                        source={{uri: images[0].media_url}}
                        style={{height: props.width/2,  width: props.width/2-1, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                    />
                    <Image
                        key='photo_2'
                        resizeMode="cover"
                        source={{uri: images[1].media_url}}
                        style={{height: props.width/2,  width: props.width/2-1, borderTopRightRadius: 5, borderBottomRightRadius: 5}}
                    />
                </View>
            );
            break;
        case 3:
            tweetImageContent.push(
                <View key='images_container' style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View key='column_1'>
                        <Image
                            key='photo_1'
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{height: props.width/2, width: props.width/2-1, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                        />
                    </View>
                    <View key='column_2' style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Image
                            key='photo_2'
                            resizeMode="cover"
                            source={{uri: images[1].media_url}}
                            style={{height: props.width/4-1, width: props.width/2-1, borderTopRightRadius: 5}}
                        />
                        <Image
                            key='photo_3'
                            resizeMode="cover"
                            source={{uri: images[2].media_url}}
                            style={{height: props.width/4-1, width: props.width/2-1, borderBottomRightRadius: 5}}
                        />
                    </View>
                </View>
            );
            break;
        case 4:
            tweetImageContent.push(
                <View key='images_container' style={{height: 180, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View key='line_1' style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Image
                            key='photo_1'
                            resizeMode="cover"
                            source={{uri: images[0].media_url}}
                            style={{height: 89, width: props.width/2-1, borderTopLeftRadius: 5}}
                        />
                        <Image
                            key='photo_2'
                            resizeMode="cover"
                            source={{uri: images[1].media_url}}
                            style={{height: 89, width: props.width/2-1, borderTopRightRadius: 5}}
                        />
                    </View>
                    <View key='line_2' style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Image
                            key='photo_3'
                            resizeMode="cover"
                            source={{uri: images[2].media_url}}
                            style={{height: 89, width: props.width/2-1, borderBottomLeftRadius: 5}}
                        />
                        <Image
                            key='photo_4'
                            resizeMode="cover"
                            source={{uri: images[3].media_url}}
                            style={{height: 89, width: props.width/2-1, borderBottomRightRadius: 5}}
                        />
                    </View>
                </View>
            );
            break;
    }
    return (tweetImageContent);
}

export default TweetImage;