const progressBar = {
    container: {
        height: 12,
        width: '100%',
        justifyContent: 'center'
    },
    filled: {
        height: 3,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    notFilledYet: {
        height: 1.5,
        backgroundColor: "rgba(162, 158, 158, 0.5)",
        borderRadius: 5,
        //This is to prevent progress bar to exceed radio button once that he don't start/end at min/max of horizontal position of your parent container as result of border width has been setted to 1 for use of elevation property
        marginHorizontal: 1
    },
    button: {
        height: 13,
        width: 13,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderWidth: 1, // setting border props for that elevation prop works
        borderColor: 'transparent',
        backgroundColor: 'white',
        borderRadius: 10,
    }
}

export default progressBar