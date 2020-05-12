import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as TrackContext } from '../../context/TrackContext';
import MapView, { Polyline } from "react-native-maps";
import {SafeAreaView} from "react-navigation";
import {LinearGradient} from "expo-linear-gradient";


const TrackDetailScreen = ( {navigation} ) => {
    const { state } = useContext( TrackContext );
    const _id = navigation.getParam( '_id' );

    const track = state.find( t => t._id === _id );
    const initialCoords = track.locations[0].coords;

    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <Text h3 style={styles.titleText}>{track.name}</Text>
                    <MapView
                        initialRegion={ {
                            longitudeDelta: 0.01,
                            latitudeDelta: 0.01,
                            ...initialCoords
                        } }
                        style={styles.mapContainer}
                    >
                        <Polyline
                            coordinates={track.locations.map( loc => loc.coords )}
                        />
                    </MapView>
                </SafeAreaView>
            </LinearGradient>
        </>
    )
};

const styles = StyleSheet.create( {
    mapContainer: {
        height: 300,
    },
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    }
} );

export default TrackDetailScreen;