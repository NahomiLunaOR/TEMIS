import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Menu_Principal({ navigation }) {
    // Función para manejar la navegación a diferentes módulos
    const handleNavigation = (screenName) => {
        navigation.navigate(screenName);
    };

    // Agregar botón de menú en el header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={{ marginLeft: 15, padding: 8 }}
                >
                    <Ionicons name="menu" size={28} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // Quitar el botón de cierre de sesión del contenido principal
    // ya que ahora estará en el drawer

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>TEMIS</Text>
                    </View>
                    <Text style={styles.subtitle}>Seguridad, precaución y prevención</Text>
                </View>

                {/* Grid de opciones */}
                <View style={styles.gridContainer}>
                    {/* Fila 1 */}
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.gridItem, styles.card]}
                            onPress={() => handleNavigation('Boton_Emergencia')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#FF6B6B' }]}>
                                <MaterialCommunityIcons name="alert-octagon" size={28} color="white" />
                            </View>
                            <Text style={styles.gridText}>Botón de Emergencia</Text>
                            <Text style={styles.gridSubtext}>Ayuda inmediata</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.gridItem, styles.card]}
                            onPress={() => handleNavigation('Mapa')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#4ECDC4' }]}>
                                <Ionicons name="map" size={28} color="white" />
                            </View>
                            <Text style={styles.gridText}>Mapa de Zonas</Text>
                            <Text style={styles.gridSubtext}>Áreas de riesgo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Fila 2 */}
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.gridItem, styles.card]}
                            onPress={() => handleNavigation('Modulo_Informativo')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#FFD166' }]}>
                                <Ionicons name="information-circle" size={32} color="white" />
                            </View>
                            <Text style={styles.gridText}>Módulo Informativo</Text>
                            <Text style={styles.gridSubtext}>Consejos de seguridad</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.gridItem, styles.card]}
                            onPress={() => handleNavigation('Reportes_Ciudadanos')}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#06D6A0' }]}>
                                <FontAwesome5 name="file-alt" size={24} color="white" />
                            </View>
                            <Text style={styles.gridText}>Reportes Ciudadanos</Text>
                            <Text style={styles.gridSubtext}>Reportar incidentes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Información adicional */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Ionicons name="call" size={20} color="#4285F4" />
                        <Text style={styles.infoText}>Línea de emergencia: 911</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="location" size={20} color="#4285F4" />
                        <Text style={styles.infoText}>Tu seguridad es nuestra prioridad</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(66, 133, 244, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#2c3e50',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginTop: 5,
    },
    gridContainer: {
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    gridItem: {
        width: '48%',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        minHeight: 180,
        justifyContent: 'center',
    },
    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    gridText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: '600',
        marginBottom: 5,
    },
    gridSubtext: {
        textAlign: 'center',
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 4,
    },
    infoContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 25,
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
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#2c3e50',
        marginLeft: 12,
    },

});