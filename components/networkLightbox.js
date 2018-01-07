import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    NetInfo,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
//
import { showLoading, hideLoading } from '../actions/appAction'

class NetworkLightbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            connectionInfo: null,
        };
    }

    componentDidMount() {
        //检测网络是否连接
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({ isConnected });
        });

        //检测网络连接信息
        NetInfo.fetch().done((connectionInfo) => {
            this.setState({ connectionInfo });
        });

        //监听网络变化事件
        NetInfo.addEventListener('change', (networkType) => {
            this.setState({ isConnected: networkType })
        })
    }

    render() {
        if (!this.state.isConnected){
            return (
                <View style={styles.container} >
                    <Text style={styles.welcome}>
                        {this.state.isConnected ? '連線正常' : '沒有連線，請檢查網路設置'}
                    </Text>
                </View>
            );
        }else{
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        //top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        padding: 5,
        backgroundColor: 'red',
        color: 'white'
    },
});

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLoading: () => {
            dispatch(showLoading())
        },
        hideLoading: () => {
            dispatch(hideLoading())
        }
    }
}

export default NetworkLightbox = connect(mapStateToProps, mapDispatchToProps)(NetworkLightbox);