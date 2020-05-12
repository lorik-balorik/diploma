import React, {useState} from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Spacer from "./Spacer";

const AuthFrom = ( { headerText, errorMessage, onSubmit, submitBtnText } ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>

                <Text h3 style={styles.titleText}>{headerText}</Text>
                <Spacer/>
                <Input
                    label='Email'
                    value={email}
                    onChangeText={ setEmail }
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Spacer/>
                <Input
                    secureTextEntry={true}
                    label='Password'
                    value={password}
                    onChangeText={ setPassword }
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
                <Spacer>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ () => onSubmit( {email, password} ) }
                    >
                        <Text style={styles.btnText}>{submitBtnText}</Text>
                    </TouchableOpacity>
                </Spacer>
            </Spacer>
        </>
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
        alignSelf: 'center',
        marginTop: 150
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
        alignSelf: 'center'
    }
} );

export default AuthFrom;