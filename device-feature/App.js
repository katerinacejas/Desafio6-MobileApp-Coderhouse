import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export default function App() {
	const [imagen, setImagen] = useState()

	const tomarFoto = async () => {
		const verificacionPermisos = await ImagePicker.requestCameraPermissionsAsync()
		if (verificacionPermisos) {

			let foto = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [1, 1],
				base64: true,
				quality: 1,
			})
			if (!foto.canceled) {
				setImagen(`data:image/jpeg;base64,${foto.assets[0].base64}`)
			}
		}

	}

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>  ¡Aplicacion sencilla para sacar una foto! </Text>
			{imagen ? (
				<Image source={{uri: imagen}} style={styles.imagenEstilo} />
			) : (
				<Image source={require('./usuario.png')} style={styles.imagenEstilo} />
			)}
			<TouchableOpacity style={styles.botonCamara} onPress={tomarFoto}>
				<Text style={styles.textoBoton}> Tomar una foto </Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titulo: {
		color: 'black',
		textAlign: 'center',
		fontSize: 25,
		marginBottom: 50,
	},
	imagenEstilo: {
		width: 250,
		height: 250,
		borderRadius: 60,
	},
	botonCamara: {
		marginTop: 50,
		backgroundColor: 'purple',
		padding: 10,
		borderRadius: 20,
	},
	textoBoton: {
		color: 'white',
		textAlign: 'center',
		fontSize: 26,
	},
});