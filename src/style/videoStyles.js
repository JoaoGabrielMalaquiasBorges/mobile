import { StyleSheet } from 'react-native';

const videoStyles = StyleSheet.create({
    videoBox: {
        width: 444.45,
        maxWidth: '100%',
        overflow: 'hidden',
        backgroundColor: 'black',
        borderRadius: 5
    },
    video: {
        maxHeight: 250,
        maxWidth: '100%',
        aspectRatio: 9/16,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    touchableArea: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    controlBar: {
        justifyContent: 'center',
        height: 52,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    progressBar: {
        height: 12,
        marginBottom: 5,
        justifyContent: 'center'
    },
    fillBar: {
        height: 1.5,
        backgroundColor: "rgba(162, 158, 158, 0.5)",
        borderRadius: 5,
        //This is to prevent progress bar to exceed radio button once that he don't start/end at min/max of horizontal position of your parent container as result of border width has been setted to 1 for use of elevation property
        marginHorizontal: 1
    },
    alreadyFilledBar: {
        height: 2,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    progressControlButton: {
        height: 12,
        width: 12,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderWidth: 1, // setting border props for that elevation prop works
        borderColor: 'transparent',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    controlBarFooter: {
        height: 20,
        marginHorizontal: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default videoStyles;