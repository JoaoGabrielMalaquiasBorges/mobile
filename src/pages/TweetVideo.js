import React from 'react';
import { View, Dimensions, Animated,  TouchableWithoutFeedback, Image  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import * as Font from 'expo-font';
import Icon from './CustomIcon';
import videoStyles from '../style/index';

export default class TweetVideo extends React.Component {
    state = {
        volumeIcon: "volume-off",
        iconName: 'play'
    }

    constructor(props) {
        super(props);
        this.video = props.video;
        this.myRef = React.createRef();
        this.myRef2 = React.createRef();
        this.alreadyPlayed = React.createRef();
        this.streamButton = React.createRef();
        this.animatedView = React.createRef();
    }

    font = Font.loadAsync({
        'FontName': require("../../assets/fonts/icomoon.ttf")
    });

    componentDidMount() {
        //alert(this.myRef2.current.props.style)
    }

    videoDuration
    controlBarVisibility = new Animated.Value(1);
    shouldProgress = true;
    progressBarOffset;
    distance = 0;
    newVideoProgress;
    test = true;

    isPortrait() {
        if ( Dimensions.get('window').height > Dimensions.get('window').width ) {
            return true;
        }
        else { return false }
    }

    play() {
        this.myRef.current.playAsync();
    }

    pause() {
        this.myRef.current.pauseAsync();
    }

    replay() {
        this.myRef.current.replayAsync();
    }

    mute() {
        this.myRef.current.setIsMutedAsync(true);
    }

    unmute() {
        this.myRef.current.setIsMutedAsync(false);
    }

    fadeInOut() {
        if ( this.controlBarVisibility._value == 1) {
            Animated.timing(
                this.controlBarVisibility,
                {
                    toValue: 0,
                    duration: 0
                }
            ).start();
        }
        else {
            Animated.timing(
                this.controlBarVisibility,
                {
                    toValue: 1,
                    duration: 0,
                }
            ).start();
        }
    }

    setVolume = () => {
        if ( this.state.volumeIcon == "volume-off" ) {
            this.setState(
                () => {
                    return { volumeIcon: "volume-high" }
                }
            );
            this.unmute();
        }
        else {
            this.setState(
                () => {
                    return { volumeIcon: "volume-off" }
                }
            );
            this.mute(); 
        }
    }
    
    handleClick = () => {
        if ( this.state.iconName == 'play' ) {
            this.setState(
                () => {
                    return { iconName: 'pause' }
                }
            );
            this.play();
            Animated.timing(
                this.controlBarVisibility,
                {
                    toValue: 0,
                    duration: 5000
                }
            ).start();
        }
        else {
            if ( this.state.iconName == 'pause' ) {
                this.pause();
                this.setState(
                    () => {
                        return { iconName: 'play' }
                    }
                );
            }
            else {
                this.setState(
                    () => {
                        return { iconName: 'pause' }
                    }
                );
                this.replay();
            }
        }
    }

    updateProgressBar = playbackStatus => {
        this.videoDuration = playbackStatus.durationMillis;
        if ( playbackStatus.isPlaying ) {
            if ( this.shouldProgress ) {
                var currentVideoPosition = playbackStatus.positionMillis/playbackStatus.durationMillis;
                if ( currentVideoPosition <= 0.97) {
                    this.progressBarOffset = this.isPortrait() ? 6.5/(Dimensions.get('window').width*0.95-42) : 6.5/424.45;
                    this.alreadyPlayed.current.setNativeProps({
                        style: {
                            width: (currentVideoPosition+this.progressBarOffset)*100 + '%'
                        }
                    });
                    this.myRef2.current.setNativeProps({
                        style: {
                            left: currentVideoPosition*100 + '%'
                        }
                    });
                }
            }
        }
        if ( playbackStatus.didJustFinish ) {
            this.myRef.current.stopAsync();
            this.alreadyPlayed.current.setNativeProps({
                style: {
                    width: '100%'
                }
            });
            this.myRef2.current.setNativeProps({
                style: {
                    left: null,
                    end: 0
                }
            });
            this.setState(
                () => {
                    return { iconName: 'replay' }
                }
            );
            this.fadeInOut();
        }
    }
    
    setVideoProgress = e => {

        this.shouldProgress = false;

        if ( Dimensions.get('window').width > Dimensions.get('window').height) { //when true then orientation is landscape
            this.distance = Dimensions.get('window').width;
            this.test = ((Dimensions.get('window').width*0.95-22)-444.45);
        }
        else {
            this.distance = Dimensions.get('window').width;
            this.test = 0;
        }
        
        
        this.newVideoProgress = (e.nativeEvent.pageX-this.distance*0.025-21-this.test/2-8)/(this.distance*0.95-42-this.test);
        if ( this.newVideoProgress >= 0 && this.newVideoProgress <= 0.97) {
            this.myRef2.current.setNativeProps({
                style: {
                    height: 16,
                    width: 16,
                    left: this.newVideoProgress == 0.97 ? null : this.newVideoProgress*100 + '%',
                    end: this.newVideoProgress == 0.97 ? 0 : null
                }
            });
            this.progressBarOffset = this.isPortrait() ? 6.5/(Dimensions.get('window').width*0.95-42) : 6.5/424.45;
            this.alreadyPlayed.current.setNativeProps({
                style: {
                    width: (this.newVideoProgress+this.progressBarOffset)*100 + '%'
                }
            });
        }
    }

    afterSetNewVideoProgress = e => {
        this.myRef2.current.setNativeProps({
            style: {
                height: 12,
                width: 12
            }
        });
        this.pause(); //for better adjust video behavior
        this.myRef.current.setPositionAsync(this.videoDuration*this.newVideoProgress).then(
            () => {
                this.shouldProgress = true;
                this.play();
            }
        );
        if ( this.state.iconName == 'play' || this.state.iconName == 'replay' ) {
            this.setState(
                () => {
                    return { iconName: 'pause' }
                }
            );
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={videoStyles.videoBox}>
                    <Video
                        resizeMode="cover"
                        ref={this.myRef}
                        source={{ uri: this.video.video_info.variants[0].url }}
                        shouldPlay={false}
                        isMuted={true}
                        style={videoStyles.video}
                        onPlaybackStatusUpdate={this.updateProgressBar}
                    />
                    <TouchableWithoutFeedback onPress={
                        () => {
                            this.fadeInOut();
                        }
                    }>
                        <View style={videoStyles.touchableArea} />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        ref={ this.animatedView }
                        style={{ ...videoStyles.controlBar, opacity: this.controlBarVisibility }}
                    >
                        <View style={videoStyles.progressBar}>
                            <View style={videoStyles.fillBar}>
                                <View
                                    ref={this.alreadyPlayed}
                                    style={{
                                        ...videoStyles.alreadyFilledBar,
                                        width: 0
                                    }}
                                />
                            </View>
                            <View
                                hitSlop={{ left: 14, right: 14 }}
                                ref={this.myRef2}
                                style={{
                                    ...videoStyles.progressControlButton,
                                    left: 0,
                                    end: 0
                                }}
                                onMoveShouldSetResponder={e => true}
                                onResponderMove={this.setVideoProgress}
                                onResponderRelease={this.afterSetNewVideoProgress}
                            />
                        </View>
                        <View style={videoStyles.controlBarFooter}>
                            <Icon
                                ref={this.streamButton}
                                name={this.state.iconName}
                                size={18}
                                color="white"
                                style={{ height: 18 }}
                                onPress={this.handleClick}
                            />
                            <Icon
                                name={this.state.volumeIcon}
                                size={20}
                                color="white"
                                style={{height: 20}}
                                onPress={this.setVolume}
                            />
                        </View>
                    </Animated.View>
                </View>
                
            </View>
        );
    }
}

