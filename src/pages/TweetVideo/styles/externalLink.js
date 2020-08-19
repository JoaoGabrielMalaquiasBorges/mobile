const externalLink = {
    container: {
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    fullscreenSize: {
        subcontainer: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    notFullscreenSize: {
        subcontainer: {
            height: '100%',
            width: '100%',
            paddingTop: 57,
            position: 'absolute',
            bottom: 57,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    button: {
        height: 55,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50
    }
}

export default externalLink