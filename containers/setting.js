import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Picker,
    Platform
} from 'react-native';
import _ from 'lodash'
//
import Config from '../app.json';

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let version = ''
        if (Platform.OS === 'ios'){
            version = Config.expo.version +'('+ Config.expo.ios.buildNumber + ')'
        }else{
            version = Config.expo.version +'('+ Config.expo.android.versionCode + ')'
        }
        return (
            <View >
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text >目前語言: </Text>
                    </View>
                    <View style={styles.item}>
                        <Text >繁體中文</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text>目前版本: </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>{version}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    title: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        flex: 2,
        alignItems:'center',
        justifyContent:'center'
    },
    picker: {
        width: 250
    }
})