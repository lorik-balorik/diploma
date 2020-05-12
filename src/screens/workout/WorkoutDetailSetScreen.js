import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {Input, ListItem, Text} from 'react-native-elements';
import { Context as WorkoutContext } from '../../context/WorkoutContext';
import {SafeAreaView} from "react-navigation";
import {LinearGradient} from "expo-linear-gradient";
import Spacer from '../../components/Spacer';
import {Context as TrackContext} from "../../context/TrackContext";
import {navigate} from "../../navigationRef";


const WorkoutDetailSetScreen = ( {navigation} ) => {
    const { state, createWorkout } = useContext( WorkoutContext );
    const items = navigation.getParam( 'items' );

    const exercises = [];
    const [ workoutName, setWorkoutName ] = useState( '' );

    // const [ set ]

    // function Exercises () {
    items.forEach( function ex ( value, key, map ) {

            console.log( `m[${key}] = ${value.name}` );
            // const item =

            exercises.push( value );

             // const saveTrack = async () => {
             //     await createTrack( name, locations );
             //     reset();
             //     navigate( 'TrackList' );
             // };
             //
             // return [saveTrack];
            return exercises;
                // <View style={ { flex: 1, flexDirection: 'row' } }>
                //     <Text>{value.name}</Text>
                //     {/*<Input*/}
                //     {/*    label='Reps'*/}
                //     {/*    value={}*/}
                //     {/*    onChangeText={ setFirstName }*/}
                //     {/*    // autoCapitalize='true'*/}
                //     {/*    autoCorrect={false}*/}
                //     {/*/workout.set_1>*/}
                // </View>
        } );
    // }

    // const workout = state.find( t => t._id === _id );


    // const track = state.find( t => t._id === _id );
    // const initialCoords = track.locations[0].coords;
    //
    // const workout = navigation.getParam( 'item' );
    // console.log( items );

    // const initialCoords = track.locations[0].coords;

    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <Text h3 style={styles.titleText}>Specify the data</Text>
                    <Spacer/>
                    <Spacer/>
                    <Input
                        containerStyle={ {width:380, marginHorizontal: 15} }
                        placeholder='Enter a name for workout'
                        label='Workout Name'
                        value={workoutName}
                        onChangeText={ setWorkoutName }
                        autoCorrect={false}
                    />
                    <Spacer/>
                    <Text style={{marginTop:10, marginBottom:10, alignSelf:'center', fontSize:20, color: '#494d4e' }}>
                        Exercise List
                    </Text>
                    <Spacer/>
                    <FlatList
                        data={exercises}
                        keyExtractor={item => item.name}
                        renderItem={ ({item}) => {
                            // return <ListItem
                            //     title={item.name}
                            //     subtitle={item.muscle_type}
                            //     subtitleStyle={styles.subtitleStyle}
                            //     badge={
                            //         {value: item.reps + 'x' + item.sets, textStyle: { color: 'white', fontSize: 16 }, containerStyle: { width: 80 } } }
                            //     bottomDivider
                            // />

                            return <>
                                <Text style={{marginHorizontal:20, marginBottom:20, fontSize:20, color: '#494d4e' }}>{item.name}</Text>

                                <View style={ { flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 30 } }>
                                    <Input
                                        returnKeyType='done'
                                        keyboardType='decimal-pad'
                                        placeholder='vumber'
                                        containerStyle={styles.input}
                                        label='Repeats'
                                        // value={height ? height.toString() : ''}
                                        // onChangeText={ setHeight }
                                        value={item.specs.repeats}
                                        autoCorrect={false}
                                    />

                                    <Input
                                        returnKeyType='done'
                                        keyboardType='decimal-pad'
                                        placeholder='number'
                                        containerStyle={styles.input}
                                        label='Circles'
                                        // value={height ? height.toString() : ''}
                                        // onChangeText={ setHeight }
                                        value={item.specs.circles}
                                        autoCorrect={false}
                                    />

                                    <Input
                                        returnKeyType='done'
                                        keyboardType='decimal-pad'
                                        placeholder='number'
                                        containerStyle={styles.input}
                                        label='Rest Time'
                                        // value={height ? height.toString() : ''}
                                        // onChangeText={ setHeight }
                                        value={item.specs.rest}
                                        autoCorrect={false}
                                    />
                                </View>
                            </>
                        }}
                    />

                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate("WorkoutStart") }
                    >
                        <Text style={styles.btnText}>Save the workout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </>
    )
};

const styles = StyleSheet.create( {

    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 7,
        // flex:1,
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#A64600',
        height: 30,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    subtitleStyle: {
        color: 'gray',
        fontSize: 12
    },
    input: {
        width: 100,
        marginHorizontal: 15
    },

} );

export default WorkoutDetailSetScreen;