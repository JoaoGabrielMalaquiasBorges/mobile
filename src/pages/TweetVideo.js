import React from 'react';
import { StyleSheet, View, Dimensions, Animated,  TouchableWithoutFeedback, TouchableOpacity  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

export default class TweetVideo extends React.Component {
    state = {
        volumeIcon: "volume-off",
        name: "play-arrow",
        width: 0
    }

    constructor(props) {
        super(props);
        this.video = props.video;
        this.myRef = React.createRef();
        this.myRef2 = React.createRef();
        this.myRef3 = React.createRef();
        this.myRef4 = React.createRef();
        this.myRef5 = React.createRef();
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
                return { volumeIcon: "volume-high" }
            }
            else {
                this.mute(); 
                return { volumeIcon: "volume-off" }
            }
        })
    }

    handleClick = () => {
        this.setState((prevState) => {
            if ( prevState.name == "play-arrow" ) { 
                this.play();
                return { name: "pause" }
            }
            else if ( prevState.name == "pause" ) {
                this.pause(); 
                return { name: "play-arrow" }
            }
            else {
                this.replay();
                return { name: "pause", width: 0 }
            }
        } );
    }
    distance = 0;
    newVideoProgress = 0;
    test = true;
    setVideoProgress = e => {
        /* for(var property in this.controlBarVisibility) {
            alert(property + "=" + this.controlBarVisibility[property]);
        } */
        /* if ( this.controlBarVisibility._value < 1) {
            alert(this.controlBarVisibility._value)

        } */
        /* this.controlBarVisibility.stopAnimation(
            value => {
                if ( value < 1) {
                    this.controlBarVisibility.current.setNativeProps({
                        style: {
                            opacity: 1
                        }
                    });
                }
            }
        ); */
        /* if(this.width == 0) {
            alert(this.width)
        } */
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
                    left: this.newVideoProgress >= 0.97 ? null : this.newVideoProgress*100-2 + '%',
                    end: this.newVideoProgress >= 0.97 ? 0 : null
                }
            });
    
            this.myRef3.current.setNativeProps({
                style: {
                    width: this.newVideoProgress*100 + '%'
                }
            });
        }


        /* if ( this.state.name == 'play-arrow' ) {
            this.setState(() => {
                return {width: newVideoProgress};
            })
        }
        else if ( this.state.name == 'refresh' ) {
            this.setState(() => {
                return {name: 'pause'};
            })
        } */
    }

    stopRadioButton = () => {
        alert('');
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
                                //alert(this.state.width)
                                this.videoDuration = playbackStatus.durationMillis;
                                if ( playbackStatus.isPlaying ) {
                                    this.setState(() => {
                                        return {
                                            width: playbackStatus.positionMillis/playbackStatus.durationMillis
                                        };
                                    });
                                }
                                if ( playbackStatus.didJustFinish ) {
                                    /* this.setState((prevState) => {
                                        return {name: "refresh", width: 1};
                                    }); */
                                }
                            }
                        }
                    />
                    <TouchableWithoutFeedback onPress={
                        () => {
                            //this.controlBarVisibility.stopAnimation()
                            //alert(this.controlBarVisibility._value)
                            /* Animated.timing(
                                this.controlBarVisibility,
                                {
                                    toValue: 1,
                                    duration: 2000
                                }
                            ).start() */
                            //this.controlBarVisibility.stopAnimation()
                            //this.controlBarVisibility = 0.5;
                            /* Animated.timing(
                                this.controlBarVisibility,
                                {
                                    toValue: 1,
                                    useNativeDriver: true
                                }
                            ).start() */
                            /* this.animatedView.current.setNativeProps({
                                style: {
                                    opacity: 1
                                }
                            }); */
                            Animated.timing(
                                this.controlBarVisibility,
                                {
                                    toValue: 1,
                                    duration: 0,
                                }
                            ).start()
                            /* this.myRef2.current.setNativeProps({
                                onResponderMove: this.setVideoProgress
                            }); */
                        }
                    }>
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                position: 'absolute',
                                //backgroundColor: 'green'
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
                                //This is to prevent progress bar to exceed radio button once that he don't start/end at min/max of horizontal position of your parent container as result of shadow addition by elevation property use
                                marginHorizontal: 1
                            }}>
                                <View
                                    ref={this.myRef3}
                                    style={{
                                        height: 2,
                                        width: 0,//this.state.width*100 + '%',
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
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    //left: 0,//this.state.width == 1 ? null : this.state.width*100-1 + '%',
                                    //end: -1,
                                    elevation: 4,
                                    //setting border props for that elevation prop works
                                    borderWidth: 1,
                                    borderColor: 'transparent',
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                }}
                                onMoveShouldSetResponder={e => true}
                                onResponderMove={this.setVideoProgress}
                                onResponderRelease={
                                    e => {
                                        setTimeout(() => {
                                            this.myRef2.current.setNativeProps({
                                                style: {
                                                    height: 12,
                                                    width: 12
                                                }
                                            })
                                        }, 50);
                                        Animated.timing(
                                            this.controlBarVisibility,
                                            {
                                                toValue: 0,
                                                duration: 2000,
                                            }
                                        ).start()
                                        //setTimeout(() => {
                                            /* for (let index = 0.4; index >= 0; index-=0.1) {
                                                setTimeout(() => {
                                                    this.myRef5.current.setNativeProps({
                                                        style:{
                                                            opacity: index
                                                        }
                                                    }) 
                                                }, 1000);
                                            } */
                                            
                                        //}, 5000);
                                        
                                    }
                                }
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <MaterialIcons
                                name={this.state.name}
                                size={30}
                                color="#f5f5f5"
                                onPress={this.handleClick}
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