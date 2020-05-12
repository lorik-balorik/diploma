import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from "react-native";
import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ( {navigation, linkText, routeName} ) => {
    return (
        <>
            <Spacer/>
            <TouchableOpacity onPress={ () => navigation.navigate( {routeName} ) }>
                <Text style={styles.link}>{linkText}</Text>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create( {
    link: {
        color: 'blue',
        alignSelf: 'center'
    }
} );

export default withNavigation( NavLink );