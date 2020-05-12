import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";
import NavLink from "../../components/NavLink";
import {NavigationEvents, SafeAreaView} from "react-navigation";
import {LinearGradient} from "expo-linear-gradient";

const SignupScreen = ( {navigation} ) => {
    const { state, signup, clearErrorMessage } = useContext( AuthContext );

    return (
        <View style={styles.container}>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <NavigationEvents
                        onWillBlur={ clearErrorMessage }
                    />
                    <AuthForm
                        headerText='Sign Up to Workout Diary'
                        errorMessage={state.errorMessage}
                        submitBtnText='Sign Up'
                        onSubmit={ signup } //( {email, password} ) => signup( {email, password} )
                    />
                    <NavLink
                        linkText='Already have an account? Sign in instead.'
                        routeName='Signin'
                    />
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginBottom: 250,
    },
} );

export default SignupScreen;