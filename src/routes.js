import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import Profile from './pages/Profile';

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
                <Stack.Screen name="Profile" component={Profile} />
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
        Profile: {
            screen: Profile,
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