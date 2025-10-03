import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Vibration,
    Alert,
    Animated,
    Easing,
    Dimensions,
    ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function BotonEmergenciaScreen({ navigation }) {
    const [emergencyActive, setEmergencyActive] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timer;
        if (emergencyActive && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            // Start progress animation
            Animated.timing(progressAnim, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();

            // Pulse animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true
                    })
                ])
            ).start();

            // Fade in animation for countdown
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            }).start();
        } else if (countdown === 0 && emergencyActive) {
            sendEmergencyAlert();
        }

        return () => {
            clearInterval(timer);
            pulseAnim.stopAnimation();
            progressAnim.stopAnimation();
        };
    }, [emergencyActive, countdown]);

    const startEmergency = () => {
        Vibration.vibrate(100);
        setEmergencyActive(true);
        setCountdown(10);
        progressAnim.setValue(0);
    };

    const cancelEmergency = () => {
        setEmergencyActive(false);
        setCountdown(10);
        pulseAnim.stopAnimation();
        progressAnim.stopAnimation();
        
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start();
    };

    const sendEmergencyAlert = () => {
        Vibration.vibrate([0, 500, 200, 500]);

        Alert.alert(
            "Alerta de Emergencia Enviada",
            "Se ha notificado a tus contactos de emergencia.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setEmergencyActive(false);
                        setCountdown(10);
                        progressAnim.setValue(0);
                        
                        Animated.timing(fadeAnim, {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: true
                        }).start();
                    }
                }
            ]
        );
    };

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.title}>Botón de Emergencia</Text>

                    <View style={styles.emergencySection}>
                        {emergencyActive ? (
                            <>
                                <View style={styles.emergencyButtonContainer}>
                                    <Animated.View style={[
                                        styles.emergencyButtonActive,
                                        { transform: [{ scale: pulseAnim }] }
                                    ]}>
                                        <Text style={styles.emergencyButtonTextActive}>EMERGENCIA</Text>
                                    </Animated.View>
                                    
                                    <View style={styles.progressBarContainer}>
                                        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                                    </View>
                                </View>

                                <Animated.View style={[styles.countdownContainer, { opacity: fadeAnim }]}>
                                    <Text style={styles.countdownText}>
                                        Alertando a sus contactos de emergencia en
                                    </Text>
                                    
                                    <View style={styles.countdownCircle}>
                                        <Text style={styles.countdownNumber}>{countdown}</Text>
                                    </View>
                                    
                                    <Text style={styles.countdownSubtext}>
                                        Toca cancelar para detener la alerta
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={cancelEmergency}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancelar Alerta</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </>
                        ) : (
                            <TouchableOpacity
                                style={styles.emergencyButton}
                                onPress={startEmergency}
                                activeOpacity={0.7}
                            >
                                <View style={styles.emergencyButtonInner}>
                                    <Text style={styles.emergencyButtonText}>EMERGENCIA</Text>
                                    <Text style={styles.emergencyButtonSubtext}>Mantener presionado</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.infoIcon}>ℹ️</Text>
                            <Text style={styles.infoTitle}>Información Importante</Text>
                        </View>
                        
                        <View style={styles.infoItem}>
                            <View style={styles.infoBullet} />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoItemTitle}>¿Cuándo usar este botón?</Text>
                                <Text style={styles.infoItemText}>
                                    Utilice este botón solo en situaciones de verdadera emergencia donde su seguridad o integridad física esté en riesgo.
                                </Text>
                            </View>
                        </View>
                        
                        <View style={styles.infoItem}>
                            <View style={styles.infoBullet} />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoItemTitle}>¿Qué sucede al activarlo?</Text>
                                <Text style={styles.infoItemText}>
                                    Se enviará su ubicación actual y un mensaje de alerta a sus contactos de emergencia.
                                </Text>
                            </View>
                        </View>
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
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
        marginVertical: 15,
        color: '#2c3e50',
        letterSpacing: 1,
    },
    emergencySection: {
        minHeight: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    emergencyButtonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    emergencyButton: {
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        borderWidth: 4,
        borderColor: '#ff9f99',
    },
    emergencyButtonInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emergencyButtonActive: {
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#ff5252',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        borderWidth: 6,
        borderColor: '#ff9f99',
    },
    emergencyButtonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    emergencyButtonSubtext: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginTop: 10,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    emergencyButtonTextActive: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    progressBarContainer: {
        width: 250,
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 3,
        marginTop: 20,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#ff5252',
        borderRadius: 3,
    },
    countdownContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        width: width * 0.85,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginTop: 10,
    },
    countdownText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        color: '#2c3e50',
        fontWeight: '600',
    },
    countdownSubtext: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        color: '#7f8c8d',
    },
    countdownCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ff5252',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    countdownNumber: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
    },
    cancelButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    infoSection: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoIcon: {
        marginRight: 10,
        fontSize: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    infoBullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e74c3c',
        marginTop: 8,
        marginRight: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#2c3e50',
    },
    infoItemText: {
        fontSize: 14,
        color: '#7f8c8d',
        lineHeight: 20,
    },
});