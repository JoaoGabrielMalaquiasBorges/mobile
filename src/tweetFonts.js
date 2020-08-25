import * as Font from 'expo-font'

export async function loadFonts () {
    Font.loadAsync({
        'FontName': require("../assets/fonts/icomoon.ttf"),
        'Helvetica-Neue-Regular': require('../assets/fonts/HelveticaNeueRegular.ttf'),
        'Helvetica-Neue-Bold': require('../assets/fonts/HelveticaNeueBold.ttf'),
        'Helvetica-Neue-Light': require('../assets/fonts/HelveticaNeueLight.ttf')
    }).then(() => {
        tweetFonts = {
            fontOfDisplayName: 'Helvetica-Neue-Bold',
            fontOfUsername: 'Helvetica-Neue-Regular',
            fontOfContent: 'Helvetica-Neue-Light'
        }
    })
}

export function getFontOf (font) {
    switch (font) {
        case 'displayName':
            return 'Helvetica-Neue-Bold'
    
        case 'username':
            return 'Helvetica-Neue-Regular'
        
        case 'content':
            return 'Helvetica-Neue-Light'
    }
}
