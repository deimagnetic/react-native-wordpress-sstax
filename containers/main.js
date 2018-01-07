import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Provider } from 'react-redux'
import { Actions, Scene, Router } from 'react-native-router-flux'
// 頁面
import Login from './login';
import Home from './home';
import Setting from './setting';
import PushNotification from './pushNotification';
//components
import Menu from '../components/menu';
//action
import { toggleSideMenu } from '../actions/menuAction'
//
import configureStore from '../store'
import AppStyles from '../style';

const store = configureStore()

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    _toggleMenu = () => {
        store.dispatch(toggleSideMenu(store.getState().sideMenu.isOpen))
        Actions.refresh()
    }

    render() {
        return (
        <Provider store={store}>
            <Router navigationBarStyle={styles.navBar} titleStyle={{ color: "white" }} tintColor='white' navBarButtonColor='white'>
                <Scene key="root">
                    <Scene key="login" component={Login} title="登入" hideNavBar={true} initial={true} />
                    <Scene key="home" component={Home} title="首頁" passProps={true}  />
                    <Scene key="pushNotification" component={PushNotification} title="推播查詢" />
                    <Scene key="setting" component={Setting} title="設定" />
                </Scene>
            </Router>
        </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: AppStyles.colour.background,
  }
});