import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

export default function R_Contraseña({ navigation }) {
    const [email, setEmail] = React.useState('');

    const handleRecovery = () => {
        // Lógica de recuperación
        Alert.alert('Éxito', 'Se ha enviado un enlace de recuperación a tu correo');
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.titulo}>Recuperar Contraseña</Text>
                <Text style={styles.subtitulo}>Ingresa tu correo electrónico para recibir instrucciones de recuperación</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Correo Electrónico'
                        placeholderTextColor='#999'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>

                <TouchableOpacity
                    style={styles.recoveryButton}
                    onPress={handleRecovery}
                >
                    <Text style={styles.recoveryButtonText}>Enviar Enlace de Recuperación</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}>Volver al Inicio de Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    recoveryButton: {
        backgroundColor: '#4285F4',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    recoveryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        alignItems: 'center',
        marginBottom: 30,
    },
    loginText: {
        color: '#4285F4',
        fontSize: 16,
    },
});