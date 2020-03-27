import React from 'react';
import { StyleSheet, View, Dimensions, Animated,  TouchableWithoutFeedback, Image  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

export default class TweetVideo extends React.Component {
    state = {
        volumeIcon: "volume-off",
        iconName: 'play-arrow',
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

    componentDidMount() {
        //alert(this.myRef2.current.props.style)
    }

    videoDuration
    controlBarVisibility = new Animated.Value(1);

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
                if ( this.state.iconName == 'play-arrow' ) { 
                    this.play();
                    return { iconName: 'pause', videoProgress:  this.lastVideoProgress }
                }
                else {
                    //alert(this.state.iconName)
                    if ( this.state.iconName == 'pause' ) {
                        //alert('hi')
                        this.pause(); 
                        return { iconName: 'play-arrow', videoProgress:  this.lastVideoProgress }
                    }
                    else {
                        //alert('ho')
                        this.replay();
                        return { iconName: 'pause', videoProgress:  this.lastVideoProgress }
                    }
                }
            }
        );
    }

    lastVideoProgress = 0;
    shouldProgress = true;
    distance = 0;
    newVideoProgress = 0;
    test = true;

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
        
        
        this.newVideoProgress = (e.nativeEvent.pageX-this.distance*0.025-21-this.test/2-16/2)/(this.distance*0.95-42-this.test);
        //alert(this.newVideoProgress)
        if ( this.newVideoProgress >= 0 && this.newVideoProgress <= 1) {
            this.myRef2.current.setNativeProps({
                style: {
                    height: 16,
                    width: 16,
                    left: this.newVideoProgress >= 0.97 ? null : this.newVideoProgress*100-1 + '%',
                    end: this.newVideoProgress >= 0.97 ? 0 : null
                }
            });
            this.alreadyPlayed.current.setNativeProps({
                style: {
                    width: this.newVideoProgress*100 + '%'
                }
            });
        }
        if ( this.newVideoProgress <= 0.97 ) {
            this.lastVideoProgress = this.newVideoProgress;
        }
        else {
            this.lastVideoProgress = 0.97;
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{
                    width: 444.45,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'black',
                    borderRadius: 5
                }}>
                    <Video
                        resizeMode="cover"
                        ref={this.myRef}
                        source={{uri: this.video.video_info.variants[0].url}}
                        shouldPlay={false}
                        isMuted={true}
                        style={{
                            maxHeight: 250,
                            maxWidth: '100%',
                            aspectRatio: 9/16,
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        onPlaybackStatusUpdate={
                            playbackStatus => {
                                this.videoDuration = playbackStatus.durationMillis;
                                if ( playbackStatus.isPlaying ) {
                                    if ( this.shouldProgress ) {
                                        var currentVideoPosition = playbackStatus.positionMillis/playbackStatus.durationMillis;
                                        this.lastVideoProgress = currentVideoPosition;
                                        if ( currentVideoPosition <= 0.97) {
                                            if ( Dimensions.get('window').width > Dimensions.get('window').height) {
                                                var progressBarWidth = 444.45-20;
                                            }
                                            else {
                                                var progressBarWidth = Dimensions.get('window').width*0.95-22-20;
                                            }
                                            this.alreadyPlayed.current.setNativeProps({
                                                style: {
                                                    width: currentVideoPosition*progressBarWidth+5.5
                                                }
                                            });
                                            this.myRef2.current.setNativeProps({
                                                style: {
                                                    left: currentVideoPosition*progressBarWidth
                                                }
                                            });
                                        }
                                    }
                                }
                                if ( playbackStatus.didJustFinish ) {
                                    this.setState(
                                        () => {
                                            return { iconName: 'refresh', videoProgress:  1 }
                                        }
                                    );
                                }
                            }
                        }
                    />
                    <TouchableWithoutFeedback onPress={
                        () => {
                            Animated.timing(
                                this.controlBarVisibility,
                                {
                                    toValue: 1,
                                    duration: 0,
                                }
                            ).start()
                        }
                    }>
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                position: 'absolute'
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        ref={ this.animatedView }
                        style={{ ...styles.controlBar, opacity: this.controlBarVisibility }}
                    >
                        <View style={{
                            height: 12,
                            justifyContent: 'center',
                            marginTop: 5
                        }}>
                            <View style={{
                                height: 1.5,
                                backgroundColor: "rgba(162, 158, 158, 0.5)",
                                borderRadius: 5,
                                //This is to prevent progress bar to exceed radio button once that he don't start/end at min/max of horizontal position of your parent container as result of border width has been setted to 1 for use of elevation property
                                marginHorizontal: 1
                            }}>
                                <View
                                    ref={this.alreadyPlayed}
                                    style={{
                                        height: 2,
                                        width: this.state.videoProgress*100 + '%',
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                    }}
                                />
                            </View>
                            <View //view for shadow box
                                hitSlop={{ left: 14, top: 22.5, right: 14, bottom: 22.5 }}
                                ref={this.myRef2}
                                style={{
                                    height: 12,
                                    width: 12,
                                    position: 'absolute',
                                    left: this.state.videoProgress == 1 ? null : this.state.videoProgress*100-1 + '%',
                                    end: this.state.videoProgress == 1 ? 0 : null,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 4,
                                    borderWidth: 1, // setting border props for that elevation prop works
                                    borderColor: 'transparent',
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                }}
                                onMoveShouldSetResponder={e => true}
                                onResponderMove={this.setVideoProgress}
                                onResponderRelease={
                                    e => {

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
                                        this.shouldProgress = true;
                                        this.myRef.current.setPositionAsync(this.videoDuration*this.newVideoProgress);

                                        // Verify if video started by clicking on button or setting position on progress bar...
                                        // For last case play the video and update button type on state
                                        if ( this.state.iconName == 'play-arrow' || this.state.iconName == 'refresh' ) {
                                            this.play();
                                            this.setState(
                                                () => {
                                                    return { iconName: 'pause', videoProgress:  this.lastVideoProgress }
                                                }
                                            );
                                        }
                                        else {
                                            this.play();
                                        }
                                    }
                                }
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <MaterialIcons
                                ref={ this.streamButton }
                                name={this.state.iconName}
                                size={30}
                                color="#f5f5f5"
                                onPress={this.handleClick}
                            />
                            <Image
                                source={require('../../assets/images/replay.png')}
                                style={{ width: 24, height: 24}}
                            />
                            <MaterialCommunityIcons
                                name={this.state.volumeIcon}
                                size={30}
                                color="#f5f5f5"
                                onPress={this.setVolume}
                            />
                        </View>
                    </Animated.View>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    controlBar: {
        justifyContent: 'center',
        height: 51,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
});