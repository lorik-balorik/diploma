import React, {useContext, useState, useCallback} from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Modal, TouchableHighlight, View, Alert } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import {NavigationEvents, SafeAreaView} from "react-navigation";
import { ListItem } from "react-native-elements";
import { Context as ExerciseContext } from '../../context/ExerciseContext';
import {LinearGradient} from "expo-linear-gradient";
import MapView, {Polyline} from "react-native-maps";
import Spacer from "../../components/Spacer";

const ExerciseListScreen = ( {navigation} ) => {
    const { state, fetchExercises } = useContext( ExerciseContext );

    const [ show, setShow ] = useState( false );
    const [ modalVisible, setModalVisible ] = useState( false );
    const [ subList, setSubList ] = useState( { _id: '' } );

    const [ selected, setSelected ] = useState( new Map() );
    // const selected = [];

    const onSelect = useCallback(
        ( id, name ) => {

                const newSelected = {
                    name: name,
                    specs: {
                        repeats: '',
                        circles: '',
                        rest: ''
                    }
                };
                const newSelectedArray = new Map( selected );
                // const newArray = selected;
            // console.log( selected );
            // console.log( newSelected );
            // selected.push( {
            //     name: 'Bicep Curl',
            //     specs: {
            //         repeats: '',
            //         circles: '',
            //         rest: ''
            //     }
            // } );
            // console.log(  selected.indexOf( newSelected ) );
            !selected.get( id ) ? newSelectedArray.set( id, newSelected ) : newSelectedArray.delete( id );
            //     selected.includes( newSelected )
                    // ?
                   // const  newArray = selected.filter( select => select.name != name );
                    // :
                    // selected.push( newSelected );



                setSelected( newSelectedArray );

            // console.log( selected );
            },
        [ selected ],
    );
    console.log( selected );

    // repeats: String,
    //     circles: String,
    //     rest: String,

    // console.log( state );


    //exercise_schema -> muscle_group -> array of exercises
    // -> ex. name, ex. info

    function Item({id, name, info, selected, onSelect }) {
        // console.log( exercise );
        return ( <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{info}</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#A64600" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Info-Box</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <View style={ { flex: 1, flexDirection: 'row', alignSelf: 'center' } }>
                <TouchableOpacity
                    onPress={() => onSelect( id, name )}
                    style={[
                        styles.item,
                        { backgroundColor: selected ? '#F2BB66' : '#FFE5B4', width: 200 },
                    ]}
                >
                    <Text style={ {fontSize: 17, padding: 10} }>{name}</Text>
                </TouchableOpacity>

                { !!info ? <TouchableOpacity
                                onPress={ () => setModalVisible( true ) }
                            >
                                <Icon name='info' type='feather' color='black' size={25} iconStyle={ {padding: 15} }  />
                            </TouchableOpacity>
                        : <Text style={ {paddingLeft: 50} }> </Text>
                }
            </View>

        </> );
    }


    return (
        <>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <NavigationEvents onWillFocus={ fetchExercises }/>
                    <Text h3 style={styles.titleText}>Select some exercises</Text>
                    <FlatList
                        data={state}
                        keyExtractor={item => item._id}
                        renderItem={ ( {item} ) => {
                            return <TouchableOpacity
                                onPress={ () => {
                                    // subList.length
                                    // console.log( !!show );
                                        // ? show == 'false' && subList._id == item._id ? setShow( 'true' ) : setShow( 'false' )
                                    subList._id == item._id ? setShow( !show ): null;
                                    setSubList( item );
                                    // console.log( show && subList._id == item._id );
                                    // console.log( show )
                                } }

                                //FIX THE SECOND PRESS ON OTHER ELEMENT OF LIST ->
                                //  -> add in array new subFlatLists by array.map()
                            >
                                <ListItem
                                    // chevron
                                    rightIcon={ <Icon name='chevron-down' type='feather' color='#D3D3D3' size={20}/> }
                                    title={item.muscle_group}
                                    style={styles.item}
                                />
                                { show && subList._id == item._id
                                    ? <FlatList
                                        // horizontal
                                        data={item.exercises}
                                        keyExtractor={item => item._id}
                                        renderItem={ ( { item } ) => (
                                            <Item
                                            id={item._id}
                                            name={item.name}
                                            info={item.info}
                                            selected={ selected.has( item._id ) }
                                            onSelect={onSelect}
                                        />
                                            ) }
                                        extraData={selected}
                                    />
                                    : null
                                }
                                {/*{ !show && subList._id == item._id*/}
                                {/*    ? <FlatList*/}
                                {/*        // horizontal*/}
                                {/*        data={item.exercises}*/}
                                {/*        keyExtractor={item => item._id}*/}
                                {/*        renderItem={ ( { item } ) => (*/}
                                {/*            <Item*/}
                                {/*                id={item._id}*/}
                                {/*                name={item.name}*/}
                                {/*                info={item.info}*/}
                                {/*                selected={!!selected.get(item._id)}*/}
                                {/*                onSelect={onSelect}*/}
                                {/*            />*/}
                                {/*        ) }*/}
                                {/*        extraData={selected}*/}
                                {/*    />*/}
                                {/*    : null*/}
                                {/*}*/}

                            </TouchableOpacity>
                        } }
                    />

                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate("WorkoutDetailSet", {items: selected}) }
                    >
                        <Text style={styles.btnText}>Fill out exercises data</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </>
    )
};

ExerciseListScreen.navigationOptions = () => {
    return {
        title: 'Exercises',
        headerShown: 'false'
    };
};

const styles = StyleSheet.create( {
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
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    },
    item: {
        // backgroundColor: '#f9c2ff',
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

} );

export default ExerciseListScreen;