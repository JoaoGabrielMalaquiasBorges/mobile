const controlBar = {
    container: {
        height: 62,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    width: {
        portrait: 0.95-42, // Dimensions.get('window').width*0.95-42
        landscape: 424.45
    },
    videoBoxOffset: (-22)-444.45 // (Dimensions.get('window').width*0.95-22)-444.45
}

export default controlBar