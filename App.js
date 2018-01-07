import React from 'react'
import {
  AsyncStorage,
  StatusBar,
  Platform,
  BackHandler
} from 'react-native'
import Storage from 'react-native-storage'
//
import Main from './containers/main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
      connectionInfo: null
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    //

    if (Platform.OS === 'ios'){
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('light-content')
    }else{
      StatusBar.setHidden(true);
    }
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    Actions.pop()
  }

  render() {
    return (
        // <Text>123</Text>
         <Main />
    );
  }
}

//storage
const storage = new Storage({
  size: 5000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {}
})

global.storage = storage