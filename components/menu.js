import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
//
import { STORAGE_KEY_USER, HTTP_WEB_URL, HTTP_DOMAIN } from '../config';
import AppStyles from '../style';
import { logoutUser } from '../actions/userAction'


class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    _logout = () => {
        try {
            storage.remove({
                key: STORAGE_KEY_USER
            }).then(result => {
                this.props.logout()
                Actions.login()
            }).catch(err => {
                console.error('_logout catch error: ' + err.name + err.message);
            })
        } catch (error) {
            console.error('_logout try: ' + error.message);
        }
    }

    _debug = () => {
        try {
            storage.load({
                key: STORAGE_KEY_USER
            }).then(result => {

            }).catch(err => {
                console.error('_debug catch error: ' + err.name + err.message);
            })
        } catch (error) {
            console.error('_debug try: ' + error.message);
        }
    }

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.headcontainer}>
                    <Image
                        source={{ uri: EIP_DOMAIN+'/employee/picture/' + this.props.user.emp_no + '.jpg' }}
                        style={styles.itemHead}
                    />
                </View>
                {/* <TouchableOpacity style={styles.itemView} onPress={() => { Actions.home() }}>
                    <Icon style={styles.icon} name='calendar' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>首頁</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.itemView} onPress={() => { Actions.workAct() }}>
                    <Icon style={styles.icon} name='calendar-check-o' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>上下班紀錄</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => { Actions.addressListTop() }}>
                    <Icon style={styles.icon} name='address-card-o' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>通訊錄</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => { Actions.pushNotification() }}>
                    <Icon style={styles.icon} name='bell' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>推播查詢</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => { Actions.info() }}>
                    <Icon style={styles.icon} name='user-plus' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>我的資訊</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => { Actions.setting() }}>
                    <Icon style={styles.icon} name='cog' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>設定</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => { this._logout() }}>
                    <Icon style={styles.icon} name='sign-out' color='white' type="font-awesome" size={20} />
                    <Text style={styles.item}>登出</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        //marginTop: 60,
        backgroundColor: AppStyles.colour.menu
    },
    itemHead: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginBottom: 15,

        // borderRadius: 50,
        // shadowOffset:{width: 0,  height: 8,},
        // shadowColor: 'black',
        // shadowOpacity: .3,
        // shadowRadius: 5,

    },
    itemView:{
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, .1)',
    },
    item: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 50,
        marginTop: 15,
        marginBottom: 15,
        color: 'white',
    },
    icon: {
        // marginRight:30,
        width: 32,
        height: 16,

        // margin: 0,
        position: 'absolute',
        top: 15,
        left: 20,
        bottom: 15,
        right: 10,
    },
    headcontainer: {
        // marginLeft: 20,
        marginTop: 20,
        alignItems: 'center',
        flexGrow: 1,
        // justifyContent: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, .1)',
        paddingLeft: 20,
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutUser())
        },
    }
}

export default Menu = connect(mapStateToProps,mapDispatchToProps)(Menu);