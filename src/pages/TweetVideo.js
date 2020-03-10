import React from 'react';
import { StyleSheet, View, Dimensions, ProgressBarAndroid,  TouchableNativeFeedback  } from 'react-native';
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
        this.progressBarWidth = props.width;
        this.myRef = React.createRef();
    }

    videoDuration

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

    setVideoProgress = (e) => {
        var newVideoProgress = e.nativeEvent.locationX/(this.progressBarWidth-10);
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

    render() {
        const {width} = Dimensions.get('window');
        
        return (
            <View>
                <Video
                    resizeMode="contain"
                    ref={this.myRef}
                    source={{uri: this.video.video_info.variants[0].url}}
                    shouldPlay={false}
                    isMuted={true}
                    style={{height: 300, backgroundColor: 'black', borderRadius: 5}}
                    onPlaybackStatusUpdate={playbackStatus => {
                        this.videoDuration = playbackStatus.durationMillis;
                        if ( playbackStatus.isPlaying ) {
                            this.setState(() => {
                                return {width: playbackStatus.positionMillis/playbackStatus.durationMillis};
                            });
                        }
                        if ( playbackStatus.didJustFinish ) {
                            this.setState((prevState) => {
                                return {name: "refresh", width: 1};
                            });
                        }
                    }}
                />
                <View style={styles.controlBar} >
                    <TouchableNativeFeedback onPressIn={this.setVideoProgress}>
                            <ProgressBarAndroid
                                styleAttr="Horizontal"
                                indeterminate={false}
                                color="#f5f5f5"
                                progress={this.state.width}
                            />
                    </TouchableNativeFeedback>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <MaterialIcons
                            name={this.state.name}
                            size={35}
                            color="#f5f5f5"
                            onPress={this.handleClick}
                        />
                        <MaterialCommunityIcons
                            name={this.state.volumeIcon}
                            size={35}
                            color="#f5f5f5"
                            onPress={this.setVolume}
                        />
                    </View>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    controlBar: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        height: 48,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0)",
        justifyContent: 'center',
    }
});