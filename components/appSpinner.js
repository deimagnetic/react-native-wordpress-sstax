import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
//
import AppStyles from '../style'

class AppSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Spinner visible={this.props.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.app.isLoading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {}
}

export default AppSpinner = connect(mapStateToProps,mapDispatchToProps)(AppSpinner);