import * as Font from 'expo-font'

export async function loadFonts () {
    await Font.loadAsync({
        'FontName': require("../assets/fonts/icomoon.ttf"),
        'Helvetica-Neue-Regular': require('../assets/fonts/HelveticaNeueRegular.ttf'),
        'Helvetica-Neue-Bold': require('../assets/fonts/HelveticaNeueBold.ttf'),
        'Helvetica-Neue-Light': require('../assets/fonts/HelveticaNeueLight.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
        'FreeSansBold': require('../assets/fonts/FreeSansBold.ttf'),
        'FreeSans': require('../assets/fonts/FreeSans.ttf'),
    })
}
