// import '../../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from "../../components/Map";
import { SafeAreaView , withNavigationFocus} from "react-navigation";
import { Text } from 'react-native-elements';
import { Context as LocationContext } from '../../context/LocationContext';
import useLocation from "../../hooks/useLocation";
import TrackForm from '../../components/TrackForm';
import { FontAwesome } from 'expo-vector-icons';
import {LinearGradient} from "expo-linear-gradient";

const TrackCreateScreen = ( {isFocused} ) => {
    const { state: { recording }, addLocation } = useContext( LocationContext );
    const callback = useCallback( (location) => {
        addLocation( location, recording );
    }, [recording] );
    const [err] = useLocation( isFocused || recording , callback );

    return (
        <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <Text h2 style={styles.titleText}>Create a Track</Text>
                    <Map/>
                    {err ? <Text>Please enable location services</Text> : null}
                    <TrackForm/>
                </SafeAreaView>
            </View>
        </LinearGradient>
    )
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name='plus' size={20}/>
};

const styles = StyleSheet.create( {
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    }
} );

export default withNavigationFocus( TrackCreateScreen );