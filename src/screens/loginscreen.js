import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground, Image, Alert, Modal, } from 'react-native';
import { auth, signInWithEmailAndPassword,updatePassword } from "../config/firebase"
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from "../context/context"
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const image = require('../images/logo.png');
export default function LoginScreen({ navigation }) {


    const { state, dispatch } = useContext(GlobalContext)
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [current, setCurrent] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [newpass,setnewpass]=useState('');

const user = auth.currentUser;
const newPassword = newpass;

    const signin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, pass)
            if (state.authUser.userrole == 'branch manager') {
                navigation.navigate('Home')
            }
            else {
                navigation.navigate('Public User')
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const forget = () => {
        alert("password has been changes sucessfully")



    }




    return (
        <View style={styles.container}>
            <Image source={require('../images/Saylani-logo.png')} style={{ height: 50, width: 200, marginLeft: '20%' }} />
            <ImageBackground source={image} resizeMode="cover" style={{ width: "100%", flex: 1, justifyContent: 'center', opacity: 0.1, height: 400 }}>
            </ImageBackground>
            <View style={styles.main}>
                <Text style={styles.head}>Welcome to Saylani Welfare Trust</Text>
                <Text style={styles.head}>Login Here !</Text>
                <TextInput placeholder=" Enter Email" style={styles.input}
                    onChangeText={(email) => { setemail(email) }}
                />
                <TextInput placeholder=" Enter Password" style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(pass) => { setpass(pass) }}
                />

                <View style={{ marginTop: 30, marginLeft: '15%' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }}>User Role</Text>
                    <RadioButtonGroup
                        containerStyle={{ marginBottom: 10 }}
                        selected={current}
                        onSelected={(value) => setCurrent(value)}
                        radioBackground="#0976BC"
                    >
                        <RadioButtonItem value="Branch Manager" label="Branch Manager" style={{ marginBottom: 10 }} />
                        <RadioButtonItem value="Public User" label={<Text>Public User</Text>} style={{ marginBottom: 10 }} />
                    </RadioButtonGroup>
                </View>
                <Pressable  onPress={() => setModalVisible(true)}>
                    <Text style={{fontWeight:"bold"}}>               Forget password?</Text>
                </Pressable>
                {/* model */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Change Password!</Text>
                                <TextInput placeholder=" Enter Current Password" style={styles.modelinput}  secureTextEntry={true}/>
                                <TextInput placeholder=" Enter New Password" style={styles.modelinput} onChangeText={(newpass)=>{setnewpass(newpass)}} secureTextEntry={true}/>
                                <View style={{display:'flex'}}>
                                    <View>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={forget}>
                                    <Text style={styles.textStyle}>Change Password</Text>
                                </Pressable>
                                </View>
                                <View>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                                </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                {/* model */}








                <Pressable style={styles.buttons}
                    onPress={signin}
                >
                    <Text style={styles.texts}><Icon name="sign-in" style={{ color: "white", fontSize: 25, marginRight: 5 }} />  Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    main: {
        width: '80%',
        height: '70%',
        margin: '10%',
        justifyContent: 'center',
    },
    modelinput:{
        borderBottomWidth: 2,
        height: 50,
        borderColor: "#0976BC",
        marginTop: 20,
        width: 200,
        marginLeft:'8%'
    },
    input: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        height: 50,
        borderColor: "#0976BC",
        marginTop: 20,
        width: 200,
        marginLeft: '17%',


    },
    radio: {
        marginLeft: '10%'

    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',

    },
    head: {
        textAlign: 'center',
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold',
        color: 'black',


    },
    textg: {
        fontSize: 15,
        color: 'white',
    },
    textf: {
        fontSize: 15,
        color: 'white',
    },
    buttons: {
        alignItems: 'center',
        paddingVertical: 12,
        width: 200,
        borderRadius: 15,
        backgroundColor: '#0976BC',
        marginTop: 40,
        marginLeft: "17%",
        height: 50,
        marginBottom: '50%'
    },
    texts: {
        fontSize: 15,
        color: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        height:300,
        width:250,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:80,
        alignItems:'center',
        marginLeft:'30%'
      },
      buttonClose: {
        backgroundColor: '#2196F3',
        margin:'5%'

      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
      },
      modalText: {
        textAlign: 'center',
        fontWeight:'bold'
      },
});
