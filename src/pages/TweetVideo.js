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
        iconName: 'play',
        videoProgress: 0,
        width: 0
    }

    constructor(props) {
        super(props);
        this.video = props.video;
        this.myRef = React.createRef();
        this.myRef2 = React.createRef();
        this.alreadyPlayed = React.createRef();
        this.myRef4 = React.createRef();
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
    lastVideoProgress = 0;
    shouldProgress = true;
    distance = 0;
    newVideoProgress = 0;
    test = true;

    isPortrait() {
        if ( Dimensions.get('window').height > Dimensions.get('window').width ) {
            return true;
        }
        else { return false }
    }
    
    progressBarOffset = this.isPortrait() ? 6.5/(Dimensions.get('window').width*0.95-42) : 6.5/424.45;

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

    fadeInOut = () => {
        Animated.timing(
            this.controlBarVisibility,
            {
                toValue: 1,
                duration: 0,
            }
        ).start();
    }

    setVolume = () => {
        this.setState((prevState) => {
            if ( prevState.volumeIcon == "volume-off" ) {
                this.unmute(); 
                return { volumeIcon: "volume-high", videoProgress:  this.lastVideoProgress }
            }
            else {
                this.mute(); 
                return { volumeIcon: "volume-off", videoProgress:  this.lastVideoProgress }
            }
        })
    }
    
    handleClick = () => {
        this.setState(
            () => {
                if ( this.state.iconName == 'play' ) { 
                    this.play();
                    return { iconName: 'pause', videoProgress:  this.lastVideoProgress }
                }
                else {
                    if ( this.state.iconName == 'pause' ) {
                        this.pause(); 
                        return { iconName: 'play', videoProgress:  this.lastVideoProgress }
                    }
                    else {
                        this.replay();
                        return { iconName: 'pause', videoProgress:  this.lastVideoProgress }
                    }
                }
            }
        );
    }

    updateProgressBar = playbackStatus => {
        if ( playbackStatus.isPlaying ) {
            if ( this.shouldProgress ) {
                this.videoDuration = playbackStatus.durationMillis;
                var currentVideoPosition = playbackStatus.positionMillis/playbackStatus.durationMillis;
                if ( currentVideoPosition <= 0.97) {
                    this.lastVideoProgress = currentVideoPosition;
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
            this.setState(
                () => {
                    return { iconName: 'replay', videoProgress:  1 }
                }
            );
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
        
        
        this.newVideoProgress = (e.nativeEvent.pageX-this.distance*0.025-21-this.test/2)/(this.distance*0.95-42-this.test);
        //alert(this.newVideoProgress)
        this.myRef2.current.setNativeProps({
            style: {
                height: 16,
                width: 16,
                left: this.newVideoProgress >= 0.97 ? null : this.newVideoProgress*100 + '%',
                end: this.newVideoProgress >= 0.97 ? 0 : null
            }
        });
        this.alreadyPlayed.current.setNativeProps({
            style: {
                width: (this.newVideoProgress+this.progressBarOffset)*100 + '%'
            }
        });
        if ( this.newVideoProgress <= 0.97 ) {
            this.lastVideoProgress = this.newVideoProgress;
        }
        else {
            this.lastVideoProgress = 0.97;
        }
    }

    afterSetNewVideoProgress = e => {

        this.myRef2.current.setNativeProps({
            style: {
                height: 12,
                width: 12
            }
        });

        Animated.timing(
            this.controlBarVisibility,
            {
                toValue: 0.5,
                duration: 2000,
            }
        ).start();

        this.pause(); // prevent that progress bar still growing after move event has ended
        this.myRef.current.setPositionAsync(this.videoDuration*this.newVideoProgress);

        // Verify if video started by clicking on button or setting position on progress bar...
        // For last case play the video and update button type on state
        if ( this.state.iconName == 'play' || this.state.iconName == 'replay' ) {
            this.setState(
                () => {
                    return { iconName: 'pause', videoProgress:  this.lastVideoProgress }
                }
            );
            this.play();
            this.shouldProgress = true;
        }
        else {
            this.play();
            this.shouldProgress = true;
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
                    <TouchableWithoutFeedback onPress={this.fadeInOut}>
                        <View style={videoStyles.touchableArea} />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        ref={ this.animatedView }
                        style={{ ...videoStyles.controlBar, opacity: 0.5 }}
                    >
                        <View style={videoStyles.progressBar}>
                            <View style={videoStyles.fillBar}>
                                <View
                                    ref={this.alreadyPlayed}
                                    style={{
                                        ...videoStyles.alreadyFilledBar,
                                        width: this.state.videoProgress == 1 ?
                                        this.state.videoProgress*100 + '%' :
                                        (this.state.videoProgress+this.progressBarOffset)*100 + '%'
                                    }}
                                />
                            </View>
                            <View
                                hitSlop={{ left: 14, right: 14 }}
                                ref={this.myRef2}
                                style={{
                                    ...videoStyles.progressControlButton,
                                    left: this.state.videoProgress == 1 ? null : this.state.videoProgress*100 + '%',
                                    end: this.state.videoProgress == 1 ? 0 : null
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

