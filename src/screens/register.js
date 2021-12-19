import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, createUserWithEmailAndPassword, doc, db, setDoc } from "../config/firebase"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
// import { GlobalContext } from "../context/context"
const image=require('../images/logo.png')
export default function Register({ navigation }) {
    // const { state, dispatch } = useContext(GlobalContext)
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [current, setCurrent] = useState("");
    const signup = async () => {
        try {
            let { user } = await createUserWithEmailAndPassword(auth, email, pass);
            let dataRef = doc(db, 'signup users', user.uid)
            await setDoc(dataRef, {
                name: name,
                email: user.email,
                password: pass,
                uid: user.uid,
                userrole: current
            });
        } catch (err) {
            console.log(err.message)
        }


        // dispatch({ type: "AUTH_USER", payload: obj })
        // console.log(state.authUser,"hello")


    }

    return (
        <View style={styles.container}>

            <ImageBackground source={image} resizeMode="cover" style={{ width: "100%", flex: 1, justifyContent: 'center', opacity: 0.1, height: 400 }}>
            </ImageBackground>
            <Text style={styles.head}>Register Here</Text>
            <Text style={styles.head}>Public User</Text>
            <TextInput placeholder=" Enter Your Name" style={styles.input}
                onChangeText={(email) => { setname(email) }}
            />
            <TextInput placeholder=" Enter Email" style={styles.input}
                onChangeText={(email) => { setemail(email) }}
            />
            <TextInput placeholder=" Enter Password" style={styles.input}
                secureTextEntry={true}
                onChangeText={(pass) => { setpass(pass) }}
            />
            <View style={{ marginLeft: '20%', marginTop: '5%' }}>
                <RadioButtonGroup
                    containerStyle={{ marginBottom: 10 }}
                    selected={current}
                    onSelected={(value) => setCurrent(value)}
                    radioBackground="#0976BC"
                >
                    <RadioButtonItem value="Public User" label={<Text>Public User</Text>} />
                </RadioButtonGroup>
            </View>
            <Pressable style={styles.button}
                onPress={signup}
            >
                <Text style={styles.texts}><Icon name="sign-in" style={{ color: "white", fontSize: 25, marginRight: 5 }} />   Register</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        height: 50,
        borderColor: "#0976BC",
        marginTop: 20,
        width: 200,
        marginLeft: '22%'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: 360,
    },
    text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',

    },
    head: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        textAlign: "center",
        fontWeight:'bold'
    },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        width: 200,
        borderRadius: 15,
        backgroundColor: '#0976BC',
        marginTop: 40,
        marginLeft: "22%",
        height: 50,
        marginBottom:'50%'
    },
    texts: {
        fontSize: 15,
        color: 'white',
    },
});
