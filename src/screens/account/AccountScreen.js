import React, { useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Avatar, Button, Text} from "react-native-elements";
import Spacer from "../../components/Spacer";
import {NavigationEvents, SafeAreaView} from "react-navigation";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AccountContext } from '../../context/AccountContext';
import {FontAwesome, EvilIcons} from "expo-vector-icons";
import {LinearGradient} from "expo-linear-gradient";

const AccountScreen = ( {navigation} ) => {
    const { signout } = useContext( AuthContext );
    const { state, fetchAccountData } = useContext( AccountContext );

    // console.log( state );
    const account = state.find( t => t._id );
    console.log( account );
    // {account.accountData.lastName}
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={ () => fetchAccountData() }/>
            <LinearGradient colors={ [ '#FF9140', '#FFDCC6', '#FFFFFF' ] } style={ {flex: 1} }>
                <SafeAreaView forceInset={ {top: 'always'} }>
                    <Text h3 style={styles.titleText}>Your Account</Text>
                    <Spacer/>
                    <Avatar
                        containerStyle={{ alignSelf: 'center' }}
                        size={150}
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        onPress={() => console.log("Works!")}
                    />
                    {/*<Image*/}
                    {/*    style={{ width: 150, height: 150, borderRadius: 70, alignSelf: 'center' }}*/}
                    {/*    // source={ {uri: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} }*/}
                    {/*    // source={ {uri: 'data:image/jpeg;base64,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'} }*/}
                    {/*/>*/}
                    <Spacer/>
                    <Text h4 style={styles.titleText}>Name:
                        { account ? <Text style={{ fontSize: 20 }}> { account.accountData.firstName } { account.accountData.lastName }</Text> : null }
                    </Text>
                    <Spacer/>
                    <Text h4 style={styles.titleText}>Gender:
                        { account ? <Text style={{ fontSize: 20 }}> { account.accountData.gender }</Text> : null }
                    </Text>
                    <Spacer/>
                    <Text h4 style={styles.titleText}>Weight:
                        { account ? <Text style={{ fontSize: 20 }}> { account.accountData.weight } kg</Text> : null }
                    </Text>
                    <Spacer/>
                    <Text h4 style={styles.titleText}>Height:
                        { account ? <Text style={{ fontSize: 20 }}> { account.accountData.height } cm</Text> : null }
                    </Text>
                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={signout}
                    >
                        <Text style={styles.btnText}>Sign out</Text>
                    </TouchableOpacity>
                    <Spacer/>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => navigation.navigate( "ChangeAccountData" ) }
                    >
                        <Text style={styles.btnText}>Change account data</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </View>

    )
};

const styles = StyleSheet.create( {
    container: {
        // backgroundColor: '#FF9B73',
        flex: 1,
        justifyContent: 'center'
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
    titleText: {
        color: '#494d4e',
        alignSelf: 'center'
    }
} );

// AccountScreen.navigationOptions = {
// title: 'Account',
// tabBarIcon: <EvilIcons name='gear' size={20}/>

// };

export default AccountScreen;