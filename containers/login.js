import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Switch,
    KeyboardAvoidingView,
    Platform,
    Linking
} from 'react-native';
import { LinearGradient , Constants } from 'expo';
//
import AppSpinner from '../components/appSpinner'
import { showLoading, hideLoading } from '../actions/appAction'
import { rememberUser, loadRememberUser, loginUserDone } from '../actions/userAction'
import NetworkLightbox from '../components/networkLightbox'
import { postRequest } from '../actions/fetchAction'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { Icon } from 'react-native-elements'
//
import { STORAGE_KEY_USER, EIP_URL } from '../config';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tuser: '',
            pw: ''
        }
    }

    _click = () => {
        // Function body
        if ( this.state.tuser == "" || this.state.pw == "" || this.state.tuser == undefined || this.state.pw == undefined ) {
            Alert.alert('登 入 錯 誤', '請輸入帳號/密碼')
        }
        else {
            this.props.showLoading()
            this.props.loginUser(this.state)
        }
    }

    componentDidMount = () => {
        this._load();
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.user.loginFail !== undefined ){
            if(nextProps.user.loginFail){
                if(nextProps.user.versionMessage != '' && nextProps.user.versionMessage != undefined ){
                    setTimeout(() => {
                        Alert.alert('訊息',nextProps.user.versionMessage,
                        [{text: 'OK', onPress: () => {
                            Linking.canOpenURL(nextProps.user.versionUrl).then(supported => {
                            if (!supported) {
                                console.log('Can\'t handle url: ' + nextProps.user.versionUrl);
                            } else {
                                return Linking.openURL(nextProps.user.versionUrl);
                            }
                            }).catch(err => console.error('An error occurred', err));
                        }}]
                    )}, 100);
                }else{
                    setTimeout(() => {
                        Alert.alert('登 入 錯 誤','帳號 or 密碼 不正確!')
                    }, 100);
                }
            }else{
                if(this.state.remember){
                    nextProps.user.tuser = this.state.tuser
                    nextProps.user.pw = this.state.pw
                    nextProps.user.os = this.state.os
                    nextProps.user.remember = this.state.remember
                    storage.save({
                        key: STORAGE_KEY_USER,
                        data: { user: nextProps.user }
                    }).then(()=>{
                        setTimeout(()=>{
                            Actions.home({ type: 'replace' })
                        },500)
                    })
                }else{
                    setTimeout(()=>{
                        Actions.home({ type: 'replace' })
                    },500)
                }
            }
        }
        this.props.hideLoading()
    }

    _load = () => {
        try {
            storage.load({
                key: STORAGE_KEY_USER
            }).then(result => {
                loadRememberUser(result)
                this.setState(result)
                if (this.state.tuser!=='' && this.state.tuser!==undefined){
                    this._click() //auto login
                }
            }).catch(err => {
                if (err.name == 'NotFoundError') {

                }else{
                    console.error('_loadInitialState catch error' + err.name + err.message);
                }
            })
        } catch (error) {
            console.error('_loadInitialState error' + error.message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AppSpinner />
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', flex: 1 }} />
                    <LinearGradient
                    colors={['rgba(158,220,202,1)', 'white']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 1000,
                    }}
                    />
                </View>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.titlecontainer}>
                        {/* <Image
                            style={styles.logo}
                            source={require('../assets/images/elite_logo_sh.png')}
                            resizeMode="contain"
                        /> */}
                        <Text style={styles.smalltitle}>憲聖記帳士事務所</Text>
                        <Text style={styles.bigtitle}>客 戶 服 務 系 統</Text>
                    </View>
                    <View style={styles.formcontainer}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(value) => this.setState({ tuser: value })}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => this.pw.focus()}
                            placeholder="Account"
                            placeholderTextColor="rgba(166, 166, 166, 1)"
                            value={this.state.tuser}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => this.setState({ pw: value })}
                            placeholder="Password"
                            placeholderTextColor="rgba(166, 166, 166, 1)"
                            secureTextEntry
                            returnKeyType="go"
                            value={this.state.pw}
                            ref={(input) => this.pw = input}
                            underlineColorAndroid="transparent"
                        />
                        <View style={styles.viewswitch}>
                            <Switch style={{ flexDirection: 'column' }}
                                onValueChange={(value) => this.setState({ remember: value })}
                                onTintColor={'#a779ff'}
                                tintColor={'#9e9e9e'}
                                
                                value={this.state.remember}
                            />
                            <Text style={styles.switchiinput}>Remember</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.bottonContainer}
                            onPress={this._click.bind(this)}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                            <Icon style={styles.icon} name='arrow-forward' color='white' type="material" size={20} />
                        </TouchableOpacity>
                        <NetworkLightbox />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        showLoading: () => {
            dispatch(showLoading())
        },
        hideLoading: () => {
            dispatch(hideLoading())
        },
        loadRememberUser: (state) => {
            dispatch(loadRememberUser(state))
        },
        loginUser: (state) => {
            state.os = (Platform.OS === 'ios') ? 'IOS' :'Android';
            state.app_id = Constants.deviceId ? Constants.deviceId : 'fix' ;
            const data = {
                url: EIP_URL + 'emp_login',
                method: "POST",
                callback: loginUserDone,
                data: state
            }
            dispatch(postRequest(data))
        }
    }
}

export default Login = connect(mapStateToProps,mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
		flex: 1,
		// backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    smalltitle: {
		color: '#492c80',
		marginTop: 5,
		width: 260,
		textAlign: 'center',
        // opacity: 0.9,
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0)',
	},
    bigtitle: {
		color: '#492c80',
		marginTop: 6,
		width: 260,
		textAlign: 'center',
        // opacity: 0.9,
        fontWeight: 'bold',
        fontSize: 28,
        backgroundColor: 'rgba(255, 255, 255, 0)',
	},
    formcontainer: {
        padding: 30,
        // paddingTop: 30,
	},
    titlecontainer: {
		alignItems: 'center',
		flexGrow: 1,
        justifyContent: 'center',
        // marginTop: 10,
        marginTop: 55,
    },
    
    bottonContainer: {
		backgroundColor: '#492b80',
		
        borderRadius: 50,
        marginTop: 15,
        marginBottom: 35,

        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'center',
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
        fontWeight: '700',
        paddingVertical: 10,
	},
    input: {
		height: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		marginBottom: 10,
		color: '#492c80',
		paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#9e9e9e',
    },
    logocontainer: {
		alignItems: 'center',
		// flexGrow: 1,
		justifyContent: 'center',
        marginTop: 55,
        // width: 320,
        // height: 180,
        marginBottom: 15,
        flex: 1,
    },
    logo: {
		width: 220,
        height: 220,
        
        // borderRadius: 50,
        // shadowOffset:{width: 0,  height: 8,},
        // shadowColor: 'black',
        // shadowOpacity: .3,
        // shadowRadius: 5,
    },
    bgcontainer: {
		alignItems: 'center',
		flexGrow: 1,
        justifyContent: 'center',
        // marginTop: 0,
        
    },
    canvas: {
        margin: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width:320,
        // height:580,
        
        // alignItems: 'center',
		// flexGrow: 1,
		// justifyContent: 'center',
      },
    viewswitch: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'center',
        
    },
    switchiinput: {
        color: '#492c80',
        padding: 8,
        // opacity: 0.7,
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    icon: {
        marginLeft: 5,
        width: 22,
        height: 14,
        marginVertical: 8,
    },
});

