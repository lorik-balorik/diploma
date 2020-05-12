import React, {useContext} from 'react';
import { Input, Button } from "react-native-elements";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
    const { state: { name, recording, locations },
        startRecording,
        stopRecording,
        changeName
    } = useContext( LocationContext );

    const [saveTrack] = useSaveTrack();

    return <>
        <Spacer>
            <Input
                value={name}
                onChangeText={changeName}
                placeholder='Enter name'
            />
        </Spacer>
        <Spacer>
            {
                recording
                    ? <TouchableOpacity
                        style={styles.btn}
                        onPress={stopRecording}
                    >
                        <Text style={styles.btnText}>Stop</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity
                        style={styles.btn}
                        onPress={startRecording}
                    >
                        <Text style={styles.btnText}>Start Recording</Text>
                    </TouchableOpacity>
            }
        </Spacer>
        <Spacer>
            {
                !recording && locations.length
                    ? <TouchableOpacity
                        style={styles.btn}
                        onPress={saveTrack}
                    >
                        <Text style={styles.btnText}>Save Record</Text>
                    </TouchableOpacity>
                    : null
            }
        </Spacer>
    </>

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
} );

export default TrackForm;