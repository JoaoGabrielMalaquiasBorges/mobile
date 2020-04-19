import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';
import Main from './src/pages/Main';

export default function App() {

  /* var appContainerRef;
  var str = ''; */

  return (
    <>
      <StatusBar translucent={true} backgroundColor='rgba(0, 0, 0, 0.5)' />
      <Routes /* ref={component => appContainerRef = component} onNavigationStateChange={
        (prevState, newState, action) => {
          if (action.type == 'Navigation/BACK') {
            appContainerRef.dispatch(
              NavigationActions.setParams({
                params: { title: 'Hello' },
                key: prevState.routes[0].key,
              })
            );
          }
          //alert( JSON.stringify(prevState) )
          for(var property in action) {
            str = str + property + "=" + action[property];
          }
          //alert(str);
        }
      } *//>
    </>
  );
}
