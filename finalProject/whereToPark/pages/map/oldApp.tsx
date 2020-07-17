// import React from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import * as Location from 'expo-location';
// import MapView, { MarkerAnimated, Marker } from 'react-native-maps';

// const App = (): any => {
//     const [errorMsg, setErrorMsg] = React.useState('');
//     const [location, setLocation] = React.useState(null);
//     const [text, setText] = React.useState('');

//     React.useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestPermissionsAsync();
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//             }
//             let x = await Location.getCurrentPositionAsync({});
//             x = x.coords;
//             let y = await Location.reverseGeocodeAsync(x);
//             console.log(x);
//             console.log(y);
//             setLocation(x.coords);
//             // setText(JSON.stringify(y))
//         })();
//     });

//     return (
//         <View style={styles.container}>
//             <Text>Open up App.tsx to start working on your app!</Text>
//             <StatusBar style="auto" />
//             {location != null ?
//                 <View style={styles.container}>
//                     <MapView style={styles.mapStyle} region={longitude: location.longitude, latitude: location.latitude}>
//                         <MarkerAnimated coordinate={{ longitude: location.longitude ? location.longitude : 0, latitude: location.latitude ? location.latitude : 0 }} title="test" description="test" />
//                     </MapView>
//                     <Text>{text}</Text>
//                 </View>
//                 : null
//             }
//         </View>
//     );
// };

// export default App;
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     mapStyle: {
//         width: Dimensions.get('window').width,
//         height: 300,
//     },
// });
