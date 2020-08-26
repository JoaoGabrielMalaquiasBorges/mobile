import * as Font from 'expo-font'

export async function loadFonts () {
    await Font.loadAsync({
        'FontName': require("../assets/fonts/icomoon.ttf"),
        'Helvetica-Neue-Regular': require('../assets/fonts/HelveticaNeueRegular.ttf'),
        'Helvetica-Neue-Bold': require('../assets/fonts/HelveticaNeueBold.ttf'),
        'Helvetica-Neue-Light': require('../assets/fonts/HelveticaNeueLight.ttf')
    })
}
