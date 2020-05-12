import React, { useContext } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
// import { Context as WorkoutContext } from '../../context/WorkoutContext';
import {SafeAreaView} from "react-navigation";
import {LinearGradient} from "expo-linear-gradient";
import Spacer from '../../components/Spacer';


const WorkoutDetailScreen = ( {navigation} ) => {
    // const { state } = useContext( WorkoutContext );
    // const _id = navigation.getParam( '_id' );

    // const workout = state.find( t => t._id === _id );

    const workout = navigation.getParam( 'item' );
    console.log( workout );

    // const initialCoords = track.locations[0].coords;

    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <Text h3 style={styles.titleText}>{workout.name}</Text>
                    <Spacer/>
                    <Text style={{ fontWeight: 'bold', marginBottom:10, alignSelf:'center' }}>
                        Super Set #1
                    </Text>
                    {/*<View style={styles.headerContainer}>*/}
                    {/*    <Text>*/}
                    {/*        Exercise*/}
                    {/*    </Text>*/}

                    {/*    <Text>*/}
                    {/*        Times x Reps*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                    <FlatList
                        data={workout.set_1}
                        keyExtractor={item => item.ex_id}
                        renderItem={ ({item}) => {
                            return <ListItem
                                title={item.name}
                                subtitle={item.muscle_type}
                                subtitleStyle={styles.subtitleStyle}
                                badge={
                                    {value: item.reps + 'x' + item.sets, textStyle: { color: 'white', fontSize: 16 }, containerStyle: { width: 80 } } }
                                bottomDivider
                            />
                        }}
                    />

                    <Text style={{marginTop:10, fontWeight: 'bold', marginBottom:10, alignSelf:'center'}}>
                        Super Set #2
                    </Text>
                    {/*<View style={styles.headerContainer}>*/}
                    {/*    <Text>*/}
                    {/*        Exercise*/}
                    {/*    </Text>*/}

                    {/*    <Text>*/}
                    {/*        Times x Reps*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                    <FlatList
                        data={workout.set_2}
                        keyExtractor={item => item.ex_id}
                        renderItem={ ({item}) => {
                            return <ListItem
                                title={item.name}
                                subtitle={item.muscle_type}
                                subtitleStyle={styles.subtitleStyle}
                                badge={
                                    {value: item.reps + 'x' + item.sets, textStyle: { color: 'white', fontSize: 16 }, containerStyle: { width: 80 } } }
                                bottomDivider
                            />
                        }}
                    />
                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate("WorkoutStart") }
                    >
                        <Text style={styles.btnText}>Start the workout</Text>
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
        marginBottom: 15
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
    }

} );

export default WorkoutDetailScreen;