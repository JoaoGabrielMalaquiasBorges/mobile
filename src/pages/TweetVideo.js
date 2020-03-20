import React from 'react';
import { StyleSheet, View, Dimensions, ProgressBarAndroid,  TouchableNativeFeedback  } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

export default class TweetVideo extends React.Component {
    state = {
        volumeIcon: "volume-off",
        name: "play-arrow",
        width: 0,
        controlButtonPosition: 0 
    }

    constructor(props) {
        super(props);
        this.video = props.video;
        this.progressBarWidth = props.width;
        this.myRef = React.createRef();
        this.myRef2 = React.createRef();
    }

    videoDuration
    test = 0

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

    setVideoProgress = e => {
        if ( Dimensions.get('window').width > 360) {
            var width = 360-10;
        }
        else {
            var width = Dimensions.get('window').width*0.95-22;
        }
        var newVideoProgress = e.nativeEvent.locationX/width;
        this.myRef.current.setPositionAsync(this.videoDuration*newVideoProgress);
        if ( this.state.name == 'play-arrow' ) {
            this.setState(() => {
                return {width: newVideoProgress};
            })
        }
        else if ( this.state.name == 'refresh' ) {
            this.setState(() => {
                return {name: 'pause'};
            })
        }
    }

    stopRadioButton() {
        alert(this.myRef2.current.props.style.width);
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
                                    //alert(playbackStatus.positionMillis/playbackStatus.durationMillis)
                                    this.setState(() => {
                                        return {
                                            width: (playbackStatus.positionMillis/playbackStatus.durationMillis).toFixed(2)
                                        };
                                    });
                                }
                                if ( playbackStatus.didJustFinish ) {
                                    this.setState((prevState) => {
                                        return {name: "refresh", width: 1};
                                    });
                                }
                            }
                        }
                    />
                    <View style={styles.controlBar}>
                        {/* <TouchableNativeFeedback onPressIn={this.setVideoProgress}>
                                <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    color="#f5f5f5"
                                    progress={this.state.width}
                                />
                        </TouchableNativeFeedback> */}
                        <View style={{
                            height: 15,
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                height: 2,
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: 5,
                                marginHorizontal: 1 //This is to prevent progress bar to exceed radio button once that he don't start/end at min/max of horizontal position of your parent container as result of shadow addition by elevation property use
                            }}>
                                <View style={{
                                    height: 2,
                                    width: this.state.width*100 + '%',
                                    backgroundColor: 'white',
                                    borderRadius: 5
                                }}/>
                            </View>
                            <View //view for shadow box
                                ref={this.myRef2}
                                style={{
                                    width: 13,
                                    position: 'absolute',
                                    left: this.state.width == 1 ? null : this.state.width*100-1 + '%',
                                    end: -1,
                                    elevation: 4,
                                    //setting border props for that elevation prop works
                                    borderWidth: 1,
                                    borderColor: 'transparent',
                                }}
                                onMoveShouldSetResponder={
                                    e => {
                                        //alert('hi')
                                    }
                                }
                            >
                                <View
                                    style={{
                                        height: 10,
                                        width: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
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
                    </View>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    controlBar: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
    }
});