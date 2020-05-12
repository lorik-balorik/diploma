import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import {NavigationEvents, SafeAreaView} from "react-navigation";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from '../../context/TrackContext';
import {LinearGradient} from "expo-linear-gradient";
import Spacer from '../../components/Spacer';

const TrackListScreen = ( {navigation} ) => {
    const { state, fetchTracks } = useContext( TrackContext );


    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <NavigationEvents onWillFocus={ fetchTracks }/>
                    <Text h3 style={styles.titleText}>Track List</Text>
                    <FlatList
                        data={state}
                        keyExtractor={item => item._id}
                        renderItem={ ( {item} ) => {
                            return <TouchableOpacity
                                onPress={ () => navigation.navigate("TrackDetail", {_id: item._id} ) }
                            >
                                <ListItem
                                    chevron title={item.name}
                                    style={styles.item}
                                />
                            </TouchableOpacity>
                        } }
                    />
                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate("WorkoutList") }
                    >
                        <Text style={styles.btnText}>Go back to Workout List</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </>
    )
};

TrackListScreen.navigationOptions = () => {
    return {
        title: 'Tracks',
        headerShown: 'false'
    };
};

const styles = StyleSheet.create( {
    btn: {
        backgroundColor: '#A64600',
        height: 30,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
} );

export default TrackListScreen;