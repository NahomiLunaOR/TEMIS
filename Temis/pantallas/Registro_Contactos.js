import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Registro_Contactos = () => {
    const [contacts, setContacts] = useState([
        { id: '1', name: 'María García', phone: '+1 234-567-8901' },
        { id: '2', name: 'Juan Pérez', phone: '+1 345-678-9012' },
        { id: '3', name: 'Ana Rodríguez', phone: '+1 456-789-0123' }
    ]);

    const [newContact, setNewContact] = useState({
        name: '',
        phone: ''
    });

    const addContact = () => {
        if (!newContact.name.trim() || !newContact.phone.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        const newContactItem = {
            id: Date.now().toString(),
            name: newContact.name,
            phone: newContact.phone
        };

        setContacts([...contacts, newContactItem]);
        setNewContact({ name: '', phone: '' });
        Alert.alert('Éxito', 'Contacto agregado correctamente');
    };

    const deleteContact = (id) => {
        Alert.alert(
            'Eliminar contacto',
            '¿Estás seguro de que quieres eliminar este contacto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        setContacts(contacts.filter(contact => contact.id !== id));
                    }
                }
            ]
        );
    };

    const renderContactItem = ({ item }) => (
        <View style={styles.contactItem}>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <TouchableOpacity
                onPress={() => deleteContact(item.id)}
                style={styles.deleteButton}
            >
                <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Registre sus contactos</Text>
                        <Text style={styles.subtitle}>Contactos de emergencia</Text>
                    </View>

                    {/* Formulario de nuevo contacto */}
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Agregar nuevo contacto</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre completo"
                            placeholderTextColor="#999"
                            value={newContact.name}
                            onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Número de teléfono"
                            placeholderTextColor="#999"
                            value={newContact.phone}
                            onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                            keyboardType="phone-pad"
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setNewContact({ name: '', phone: '' })}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.addButton]}
                                onPress={addContact}
                            >
                                <Text style={styles.addButtonText}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Lista de contactos */}
                    <View style={styles.contactsContainer}>
                        <Text style={styles.contactsTitle}>Contactos registrados</Text>

                        {contacts.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Ionicons name="people-outline" size={50} color="#CCCCCC" />
                                <Text style={styles.emptyStateText}>No hay contactos registrados</Text>
                                <Text style={styles.emptyStateSubtext}>
                                    Agrega contactos de emergencia para que puedan ayudarte en caso necesario
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={contacts}
                                renderItem={renderContactItem}
                                keyExtractor={item => item.id}
                                scrollEnabled={false}
                                style={styles.contactsList}
                            />
                        )}
                    </View>

                    {/* Información adicional */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Ionicons name="information-circle-outline" size={20} color="#4285F4" />
                            <Text style={styles.infoText}>
                                Estos contactos serán notificados en caso de emergencia
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="shield-checkmark-outline" size={20} color="#4285F4" />
                            <Text style={styles.infoText}>
                                La información de contactos es privada y segura
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    cancelButtonText: {
        color: '#6c757d',
        fontWeight: '600',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#4285F4',
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    contactsContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contactsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    contactsList: {
        marginBottom: 10,
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    contactPhone: {
        fontSize: 14,
        color: '#6c757d',
    },
    deleteButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6c757d',
        marginTop: 15,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#adb5bd',
        textAlign: 'center',
        lineHeight: 20,
    },
    infoContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#6c757d',
        marginLeft: 12,
        flex: 1,
        lineHeight: 20,
    },
});

export default Registro_Contactos;