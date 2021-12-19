import React, { useState, useEffect } from 'react';
import MapView, { Marker,  } from 'react-native-maps';
import  Entypo from '@expo/vector-icons/Entypo';

import { StyleSheet, Text, View, Dimensions , Image, Pressable} from 'react-native';
import * as Location from 'expo-location';

export default function Map({navigation}) {
    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const maplocation=[
        {
            branch_name: "Aliabad",
            latitude: 24.9200172,
            longitude: 67.0612345
        },
        {
            branch_name: "Numaish chowrangi",
            latitude: 24.8732834,
            longitude: 67.0337457
        },
        {
            branch_name: "Saylani house phase 2",
            latitude: 24.8278999,
            longitude: 67.0688257
        },
        {
            branch_name: "Touheed commercial",
            latitude: 24.8073692,
            longitude: 67.0357446
        },
        {
            branch_name: "Sehar Commercial",
            latitude: 24.8138924,
            longitude: 67.0677652
        },
        {
            branch_name: "Jinnah avenue",
            latitude: 24.8949528,
            longitude: 67.1767206
        },
        {
            branch_name: "Johar chowrangi",
            latitude: 24.9132328,
            longitude: 67.1246195
        },
        {
            branch_name: "Johar chowrangi 2",
            latitude: 24.9100704,
            longitude: 67.1208811
        },
        {
            branch_name: "Hill park",
            latitude: 24.8673515,
            longitude: 67.0724497
        }
    ]
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location, 'locationlocation')
            setLocation(location);
        })();
    }, []);


        function move(){
            return(
                navigation.navigate('Form')
            )
        }

    return (
        <View style={styles.container}>
            {location ?
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    maxZoomLevel={11}
                minZoomLevel={10}
                >
                
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={"Me"}
                    >
                        
                        <Entypo name='location-pin' color={'red'} size={30}/>
                    </Marker>

                    {
                        maplocation.map((item)=>{
                            return(

                                <Marker
                                coordinate={{
                                    latitude:item.latitude ,
                                    longitude: item.longitude,
                                }}
                                title={"branches"}
                            >
                                
                                <Entypo name='location-pin' color={'black'} size={30}/>
                            </Marker>


                            )
                        })
                    }



                </MapView> : null

            }
            <Pressable style={styles.Pressable} onPress={ move}>
                <Text style={styles.btntext}>Select Location</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: 350,
    },
    img:{
        width: 50,
        height: 50,
    
    },
    Pressable:{
        backgroundColor: 'black',
        width: '80%',
        height: 45,
        marginTop: 180,
        alignItems:'center',
        justifyContent: 'center'
    },
    btntext:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18

    }
});