import React, {useContext, useState} from 'react';
import {Text, Button, Input, Avatar,} from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Picker } from "react-native";
// import { Picker, Icon } from 'native-base';
import Spacer from "../../components/Spacer";
import { Context as AccountContext } from '../../context/AccountContext';
import {NavigationEvents, SafeAreaView} from "react-navigation";
import {LinearGradient} from "expo-linear-gradient";
import 'react-navigation';

const AccountSetDataScreen = ( { navigation } ) => {
    const { state, fetchAccountData, setAccountData } = useContext( AccountContext );
    const account = state.find( t => t._id );
    const _id = account
        ? account._id
        : null;

    // console.log( state, account );
    // console.log( _id );

    const [firstName, setFirstName] = useState( account ? account.accountData.firstName : '' );
    const [lastName, setLastName] = useState( account ? account.accountData.lastName : '');
    const [gender, setGender] = useState( account ? account.accountData.gender : 'none' );
    const [weight, setWeight] = useState( account ? account.accountData.weight : '' );
    const [height, setHeight] = useState( account ? account.accountData.height : '' );

    return (
        <View style={{ flex:1, justifyContent: 'center' }}>
            <NavigationEvents onWillFocus={ () => fetchAccountData() }/>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <NavigationEvents onWillFocus={ () => fetchAccountData() } />
                    <Spacer>
                        <Text h3 style={styles.titleText}>Change Account Data</Text>
                        <Spacer/>
                        <Avatar
                            containerStyle={{ alignSelf: 'center' }}
                            size={150}
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            onPress={() => console.log("Works!")}
                        />
                        <Spacer/>
                        <Input
                            label='First Name'
                            value={firstName}
                            onChangeText={ setFirstName }
                            // autoCapitalize='true'
                            autoCorrect={false}
                        />
                        <Spacer/>
                        <Input
                            label='Last Name'
                            value={lastName}
                            onChangeText={ setLastName }
                            // autoCapitalize='none'
                            autoCorrect={false}
                        />

                        <Spacer>

                            <View style={styles.smallElContainer}>
                                <Input
                                    returnKeyType='done'
                                    keyboardType='decimal-pad'
                                    placeholder='kg'
                                    containerStyle={styles.input}
                                    label='Weight'
                                    value={weight ? weight.toString() : ''}
                                    onChangeText={ setWeight }
                                />
                                <Input
                                    returnKeyType='done'
                                    keyboardType='decimal-pad'
                                    placeholder='cm'
                                    containerStyle={styles.input}
                                    label='Height'
                                    value={height ? height.toString() : ''}
                                    onChangeText={ setHeight }
                                    autoCorrect={false}
                                />
                                <Picker
                                    selectedValue={gender}
                                    itemSlyte={styles.pickerItem}
                                    onValueChange={ itemValue => setGender( itemValue ) }
                                    style={{height: 30, width: '58%' }}
                                    // borderColor: 'red', borderWidth: 1
                                    mode='dialog'
                                    iosHeader="Specify a gender"
                                    headerStyle={ { width: '107%', alignSelf: 'center' } }
                                    // iosIcon={<Icon name="arrow-down" />}
                                >
                                    <Picker.Item label='Not Specified' value='none' />
                                    <Picker.Item label='Male' value='Male' />
                                    <Picker.Item label='Female' value='Female' />
                                </Picker>
                            </View>
                        </Spacer>
                        {/*{ errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }*/}
                        <Spacer/>
                        <Spacer/>
                        <Spacer/>
                        <Spacer>
                            {/*<Text>{_id}</Text>*/}
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={ () => setAccountData( { firstName, lastName, gender, weight: weight ? parseFloat( weight ) : '', height: height ? parseFloat( height ) : '', _id } ) }
                        >
                            <Text style={styles.btnText}>Save Changes</Text>
                        </TouchableOpacity>
                        </Spacer>
                    </Spacer>
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create( {
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginTop: 15,
        alignSelf: 'center'
    },
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    },
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
    input: {
        width: 80
    },
    smallElContainer: {
        flexDirection: 'row'
    },
    pickerItem: {
        height: 30
    }
} );

export default AccountSetDataScreen;