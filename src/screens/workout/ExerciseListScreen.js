import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import {NavigationEvents, SafeAreaView} from "react-navigation";
import { ListItem } from "react-native-elements";
// import { Context as WorkoutContext } from '../../context/WorkoutContext';
import {LinearGradient} from "expo-linear-gradient";

const TrackListScreen = ( {navigation} ) => {
    const { state, fetchWorkouts } = useContext( WorkoutContext );


    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <NavigationEvents onWillFocus={ fetchWorkouts }/>
                    <Text h3 style={styles.titleText}>Workout List</Text>
                    <FlatList
                        data={state}
                        keyExtractor={item => item._id}
                        renderItem={ ( {item} ) => {
                            return <TouchableOpacity
                                onPress={ () => navigation.navigate("WorkoutDetail", {_id: item._id} ) }
                            >
                                <ListItem
                                    chevron title={item.name}
                                />
                            </TouchableOpacity>
                        } }
                    />
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
    }
} );

export default TrackListScreen;