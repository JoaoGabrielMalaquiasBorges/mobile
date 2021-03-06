import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Icon from './pages/CustomIcon'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Main from './pages/Main'
import FullscreenSizeVideo from './pages/TweetVideo/FullscreenSizeVideo'
import FullscreenSizeImage from './pages/TweetMedia/FullscreenSizeImage'
import BackButton from './pages/BackButton'

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Main' screenOptions={{
                headerStyle: {
                    backgroundColor: 'purple'
                }
            }}>
                <Stack.Screen name="Main" component={Main} options={{ title: 'Insider Spider' }} />
                <Stack.Screen name="FullscreenSizeVideo" component={FullscreenSizeVideo} options={{ headerShown: false }}/>
                <Stack.Screen
                    name='FullscreenSizeImage'
                    component={FullscreenSizeImage}
                    options={{ header: ({ navigation }) => {
                        return (<BackButton navigation={navigation} />)
                    }}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/* const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Insider Spider'
            },
        },
        FullscreenSizeVideo: {
            screen: FullscreenSizeVideo,
            navigationOptions: {
                onTransitionStart: () => {
                    alert('hi')
                }
            },
        },
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    })
); */

export default Routes;