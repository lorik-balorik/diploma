import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthForm from "../../components/AuthForm";
import NavLink from "../../components/NavLink";
import {Context as AuthContext} from "../../context/AuthContext";
import {NavigationEvents, SafeAreaView} from "react-navigation";
import {LinearGradient} from "expo-linear-gradient";

const SigninScreen = ( {navigation} ) => {
    const { state, signin, clearErrorMessage } = useContext( AuthContext );

    return (
        <View style={styles.container}>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <NavigationEvents
                        onWillBlur={ clearErrorMessage }
                    />
                    <AuthForm
                        headerText='Sign In to Workout Diary'
                        errorMessage={state.errorMessage}
                        submitBtnText='Sign In'
                        onSubmit={ signin } //( {email, password} ) => signin( {email, password} )
                    />
                    <NavLink
                        linkText='Don`t have an account? Go to Sign Up!'
                        routeName='Signup'
                    />
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginBottom: 250,
        backgroundColor: '#FFDCC6'
    },
} );
export default SigninScreen;