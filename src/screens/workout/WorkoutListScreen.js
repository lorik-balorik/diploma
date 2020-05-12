import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import {NavigationEvents, SafeAreaView} from "react-navigation";
import { ListItem } from "react-native-elements";
// import { Context as WorkoutContext } from '../../context/WorkoutContext';
import Spacer from '../../components/Spacer';
import {LinearGradient} from "expo-linear-gradient";

const WorkoutListScreen = ( {navigation} ) => {
    // const { state, fetchWorkouts } = useContext( WorkoutContext );
    // const [ state, setState ] = useState( '' );
    const state = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            name: 'Monday Training',
            set_1: [
                {
                    ex_id: 1,
                    muscle_type: 'legs',
                    name: 'jumping jacks',
                    reps: '15',
                    sets: '3'
                },
                {
                    ex_id: 2,
                    muscle_type: 'legs',
                    name: 'squats',
                    reps: '15',
                    sets: '3'
                },
                {
                    ex_id: 3,
                    muscle_type: 'legs',
                    name: 'lunges',
                    reps: '10',
                    sets: '3'
                }
            ],
            set_2: [
                {
                    ex_id: 1,
                    muscle_type: 'abdominal',
                    name: 'leg raises',
                    reps: '15',
                    sets: '3'
                },
                {
                    ex_id: 2,
                    muscle_type: 'abdominal',
                    name: 'crunches',
                    reps: '15',
                    sets: '3'
                },
                {
                    ex_id: 3,
                    muscle_type: 'abdominal',
                    name: 'scissors',
                    reps: '10',
                    sets: '3'
                }
            ]
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            name: 'Wednesday Training',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            name: 'Friday Training',
        },
    ];


    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    {/*<NavigationEvents onWillFocus={ fetchWorkouts }/>*/}
                    <Text h3 style={styles.titleText}>Workout List</Text>
                    {/*<FlatList*/}
                    {/*    data={state}*/}
                    {/*    keyExtractor={item => item._id}*/}
                    {/*    renderItem={ ( {item} ) => {*/}
                    {/*        return <TouchableOpacity*/}
                    {/*            onPress={ () => navigation.navigate("WorkoutDetail", {item} ) }*/}
                    {/*            // {_id: item._id} ) }*/}
                    {/*        >*/}
                    {/*            <ListItem*/}
                    {/*                chevron title={item.name}*/}
                    {/*                style={styles.item}*/}
                    {/*            />*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    } }*/}
                    {/*/>*/}
                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate("WorkoutCreate") }
                    >
                        <Text style={styles.btnText}>Create a new workout plan</Text>
                    </TouchableOpacity>
                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate("TrackList") }
                    >
                        <Text style={styles.btnText}>Go to Track List</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </>
    )
};

WorkoutListScreen.navigationOptions = () => {
    return {
        title: 'Workouts',
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
        alignSelf: 'center',
    },
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    },
    item: {
        marginTop: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    }
} );

export default WorkoutListScreen;