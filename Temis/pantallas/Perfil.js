import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
    Switch,
    Image
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Perfil = () => {
    const [userData, setUserData] = useState({
        nombre: 'María García',
        email: 'maria.garcia@email.com',
        telefono: '+1 234-567-8901',
        direccion: 'Calle Principal #123, Ciudad',
        fechaNacimiento: '15/05/1990',
        genero: 'Femenino',
        tipoSangre: 'O+',
        alergias: 'Polen, Mariscos',
        contactoEmergencia: '+1 345-678-9012 (Juan Pérez)'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [locationSharing, setLocationSharing] = useState(true);

    const handleSave = () => {
        setIsEditing(false);
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
    };

    const handleInputChange = (field, value) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const renderEditableField = (label, value, field, keyboardType = 'default') => (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(text) => handleInputChange(field, text)}
                    keyboardType={keyboardType}
                />
            ) : (
                <Text style={styles.fieldValue}>{value || 'No especificado'}</Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header con foto de perfil */}
                <View style={styles.header}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profilePlaceholder}>
                            <Ionicons name="person" size={50} color="#fff" />
                        </View>
                    </View>

                    <Text style={styles.userName}>{userData.nombre}</Text>
                    <Text style={styles.userEmail}>{userData.email}</Text>
                </View>

                {/* Botones de acción */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, isEditing ? styles.saveButton : styles.editButton]}
                        onPress={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                        <Ionicons
                            name={isEditing ? "checkmark" : "pencil"}
                            size={20}
                            color="#fff"
                        />
                        <Text style={styles.actionButtonText}>
                            {isEditing ? 'Guardar' : 'Editar Perfil'}
                        </Text>
                    </TouchableOpacity>

                    {isEditing && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.cancelButton]}
                            onPress={() => setIsEditing(false)}
                        >
                            <Ionicons name="close" size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Información personal */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="person-outline" size={24} color="#4285F4" />
                        <Text style={styles.sectionTitle}>Información Personal</Text>
                    </View>

                    {renderEditableField('Nombre completo', userData.nombre, 'nombre')}
                    {renderEditableField('Email', userData.email, 'email', 'email-address')}
                    {renderEditableField('Teléfono', userData.telefono, 'telefono', 'phone-pad')}
                    {renderEditableField('Fecha de nacimiento', userData.fechaNacimiento, 'fechaNacimiento')}
                    {renderEditableField('Género', userData.genero, 'genero')}
                </View>

                {/* Información de contacto */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="location-outline" size={24} color="#49688d" />
                        <Text style={styles.sectionTitle}>Dirección</Text>
                    </View>

                    {renderEditableField('Dirección', userData.direccion, 'direccion')}
                </View>

                {/* Información médica */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="medical-bag" size={24} color="#49688d" />
                        <Text style={styles.sectionTitle}>Información Médica</Text>
                    </View>

                    {renderEditableField('Tipo de sangre', userData.tipoSangre, 'tipoSangre')}
                    {renderEditableField('Alergias', userData.alergias, 'alergias')}
                </View>

                {/* Contacto de emergencia */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="alert-circle-outline" size={24} color="#49688d" />
                        <Text style={styles.sectionTitle}>Contacto de Emergencia</Text>
                    </View>

                    {renderEditableField('Contacto', userData.contactoEmergencia, 'contactoEmergencia')}
                </View>

                {/* Preferencias */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="settings-outline" size={24} color="#49688d" />
                        <Text style={styles.sectionTitle}>Preferencias</Text>
                    </View>

                    <View style={styles.preferenceItem}>
                        <View style={styles.preferenceInfo}>
                            <Ionicons name="notifications-outline" size={20} color="#6c757d" />
                            <Text style={styles.preferenceText}>Notificaciones de emergencia</Text>
                        </View>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            thumbColor={notifications ? '#4285F4' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                        />
                    </View>

                    <View style={styles.preferenceItem}>
                        <View style={styles.preferenceInfo}>
                            <Ionicons name="location-outline" size={20} color="#6c757d" />
                            <Text style={styles.preferenceText}>Compartir ubicación en emergencias</Text>
                        </View>
                        <Switch
                            value={locationSharing}
                            onValueChange={setLocationSharing}
                            thumbColor={locationSharing ? '#4285F4' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                        />
                    </View>
                </View>

                {/* Estadísticas */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <FontAwesome name="bar-chart" size={20} color="#4285F4" />
                        <Text style={styles.sectionTitle}>Estadísticas</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Reportes realizados</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Emergencias</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>28</Text>
                            <Text style={styles.statLabel}>Días activo</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profilePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#49688d',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#49688d',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        gap: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 25,
        gap: 8,
    },
    editButton: {
        backgroundColor: '#4285F4',
    },
    saveButton: {
        backgroundColor: '#06D6A0',
    },
    cancelButton: {
        backgroundColor: '#FF6B6B',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    fieldContainer: {
        marginBottom: 15,
    },
    fieldLabel: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 5,
        fontWeight: '500',
    },
    fieldValue: {
        fontSize: 16,
        color: '#2c3e50',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    input: {
        fontSize: 16,
        color: '#2c3e50',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    preferenceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    preferenceText: {
        fontSize: 16,
        color: '#2c3e50',
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4285F4',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#6c757d',
        textAlign: 'center',
    },
});

export default Perfil;
