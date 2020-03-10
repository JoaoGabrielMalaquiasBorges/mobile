import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Insider Spider'
            },
        },
        Profile,
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    })
);

export default Routes;