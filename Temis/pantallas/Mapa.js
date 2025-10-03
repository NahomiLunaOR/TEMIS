// App.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const Mapa = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Texto simple */}
                <Text style={styles.title}>Mapa</Text>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
        marginBottom: 15,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        marginBottom: 20,
        textAlign: 'justify',
    },
    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    italicText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333',
        marginBottom: 10,
    },
    coloredText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    smallText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    largeText: {
        fontSize: 22,
        color: '#333',
        marginBottom: 10,
    },
    centerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    rightText: {
        fontSize: 16,
        textAlign: 'right',
        color: '#333',
        marginBottom: 10,
    },
    underlineText: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#333',
        marginBottom: 20,
    },
    longText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#555',
        textAlign: 'justify',
    },
});

export default Mapa;