import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  TouchableOpacity, Linking, Alert, SectionList
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const Modulo_Informativo = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Datos de contacto de emergencia extraídos del documento
  const emergencyData = [
    {
      title: 'POLICÍAS',
      data: [
        { name: 'Robo de Vehículos', number: '066' },
        { name: 'Policía Municipal de Tonalá', number: '35-86-61-00' },
        { name: 'Policía Municipal de Zapopan', number: '36-56-56-56' },
        { name: 'Policía Municipal de Tlaquepaque', number: '30-50-30-50' },
        { name: 'Policía Municipal de Guadalajara', number: '36-19-39-75 / 060' },
        { name: 'Secretaría de Seguridad Ciudadana', number: '38-14-15-15' },
        { name: 'Seguridad Para el Turista', number: '01-800-36-32-200' },
        { name: 'Radio Patrullas', number: '080' },
        { name: 'Procuraduría General de Justicia', number: '38-37-60-00' },
        { name: 'Policía Preventiva', number: '36-73-38-31' },
      ]
    },
    {
      title: 'BOMBEROS Y PROTECCIÓN CIVIL',
      data: [
        { name: 'Emergencias', number: '36-19-52-41' },
        { name: 'Base 1', number: '36-19-07-94' },
        { name: 'Base 2', number: '38-23-35-61' },
        { name: 'Base 3', number: '36-45-60-34' },
        { name: 'Base 4', number: '36-44-44-79' },
        { name: 'Base 5', number: '39-42-02-01' },
        { name: 'Protección Civil y Bomberos Tonalá', number: '12-00-39-18 / 12-00-39-30 / 12-00-39-31' },
        { name: 'Protección Civil Jalisco (Estatal)', number: '36-75-30-60' },
      ]
    },
    {
      title: 'OTROS SERVICIOS',
      data: [
        { name: 'Agencia de Delitos Sexuales', number: '38-37-60-00' },
        { name: 'Alcohólicos Anónimos (24 horas)', number: '36-13-89-93 / 36-14-86-79' },
        { name: 'Ángeles Verdes', number: '078' },
        { name: 'Cáritas de Guadalajara', number: '36-17-61-22 / 36-17-65-55' },
        { name: 'Centro de Atención Ciudadana', number: '36-68-18-18 / 36-68-18-32' },
        { name: 'Centro de Intervención en Crisis', number: '38-33-38-38' },
        { name: 'Centro de Rehabilitación Infantil Teletón', number: '31-34-2526 / 31-34-25-25' },
        { name: 'Comisión Estatal de Derechos Humanos', number: '36-34-20-21 / 36-34-19-90' },
        { name: 'Violencia Intra Familiar', number: '36-99-38-82' },
        { name: 'Denuncia Municipal Guadalajara', number: '070' },
        { name: 'Denuncia Anónima', number: '089' },
        { name: 'Departamento de Tránsito', number: '32-24-84-84' },
        { name: 'Reporte de Fugas GAS L.P.', number: '36-68-38-00' },
        { name: 'DIF Guadalajara', number: '38-48-50-00' },
        { name: 'Drogadictos Anónimos (24 horas)', number: '36-96-00-23' },
        { name: 'I.S.S.S.T.E.', number: '36-33-01-03 / 36-33-00-44' },
        { name: 'IMSS', number: '38-23-92-61 / 38-12-48-68' },
        { name: 'Instituto Jalisciense de Salud Mental', number: '36-33-93-83' },
        { name: 'Instituto Municipal de la Mujer', number: '36-38-52-00' },
        { name: 'Locatel (24 horas)', number: '31-34-49-82' },
        { name: 'Neuróticos Anónimos (24 horas)', number: '36-38-90-55' },
        { name: 'Procuraduría Federal del Consumidor', number: '36-15-73-83 / 36-15-73-93' },
      ]
    }
  ];

  const helpCenters = [
    {
      name: 'Instituto Jalisciense de las Mujeres',
      address: 'Miguel Blanco No.883, 5to. Piso, Col. Centro, C.P. 44100, Guadalajara, Jalisco.',
      services: 'Asesoría legal, psicológica y apoyo integral',
      phone: ' 36583170 Ext 50628'
    },
    {
      name: 'Centro de Justicia para las Mujeres, Guadalajara',
      address: 'C. Alvaro Alcazar 5869, Jardines Alcalde, 44298 Guadalajara, Jal.',
      services: 'Atención integral para mujeres en situación de violencia',
      phone: '33-3668-1880'
    },
    {
      name: 'DIF Guadalajara',
      address: 'Av. Gral. Eulogio Parra 2539, Lomas de Guevara, 44679 Guadalajara, Jal.',
      services: 'Apoyo social y protección a grupos vulnerables',
      phone: '3338485000'
    }
  ];

  const handleCall = (number) => {
    // Limpiar número para llamada
    const cleanNumber = number.replace(/[-\s]/g, '').split('/')[0].trim();
    Alert.alert(
      'Llamar',
      `¿Deseas llamar al ${number}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => Linking.openURL(`tel:${cleanNumber}`) }
      ]
    );
  };

  const renderEmergencyItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.emergencyItem}
      onPress={() => handleCall(item.number)}
    >
      <View style={styles.emergencyInfo}>
        <Text style={styles.emergencyName}>{item.name}</Text>
        <Text style={styles.emergencyNumber}>{item.number}</Text>
      </View>
      <Ionicons name="call" size={20} color="#e74c3c" />
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const renderSection = (title, content, key) => (
    <View style={styles.section} key={key}>
      <TouchableOpacity
        style={styles.sectionHeaderButton}
        onPress={() => toggleSection(key)}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={expandedSection === key ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#2c3e50"
        />
      </TouchableOpacity>
      
      {expandedSection === key && (
        <View style={styles.sectionContent}>
          {content}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Módulo Informativo</Text>
        <Text style={styles.subtitle}>
          Información sobre derechos, procedimientos y recursos de ayuda para mujeres y grupos vulnerables en Guadalajara 2025
        </Text>

        {renderSection('Derechos Fundamentales', (
          <View>
            <Text style={styles.paragraph}>
              Toda persona tiene derecho a una vida libre de violencia. En Jalisco, las leyes protegen especialmente a mujeres, niñas, niños, adolescentes, personas adultas mayores, personas con discapacidad y comunidad LGBTQ+.
            </Text>
            <Text style={styles.boldText}>Derechos específicos:</Text>
            <Text style={styles.paragraph}>
              - Derecho a la integridad física, psicológica y sexual{'\n'}
              - Derecho a la igualdad y no discriminación{'\n'}
              - Derecho al acceso a la justicia{'\n'}
              - Derecho a la protección institucional{'\n'}
              - Derecho a la información y asesoría legal
            </Text>
          </View>
        ), 'derechos')}

        {renderSection('Procedimientos de Denuncia', (
          <View>
            <Text style={styles.boldText}>Pasos para presentar una denuncia:</Text>
            <View style={styles.stepsContainer}>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Acudir a cualquier Ministerio Público o Centro de Justicia para Mujeres</Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>Proporcionar información detallada de los hechos</Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>Solicitar medidas de protección si es necesario</Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>4</Text>
                <Text style={styles.stepText}>Recibir seguimiento del caso</Text>
              </View>
            </View>
            
            <Text style={styles.boldText}>¿Qué necesitas llevar?</Text>
            <Text style={styles.paragraph}>
              - Identificación oficial{'\n'}
              - Datos del agresor (si se conocen){'\n'}
              - Evidencias (mensajes, fotos, testigos){'\n'}
              - Información detallada de los hechos
            </Text>
          </View>
        ), 'denuncia')}

        {renderSection('Centros de Ayuda', (
          <View>
            {helpCenters.map((center, index) => (
              <View key={index} style={styles.helpCard}>
                <Text style={styles.helpTitle}>{center.name}</Text>
                <Text style={styles.helpText}>{center.address}</Text>
                <Text style={styles.helpText}>{center.services}</Text>
                <TouchableOpacity 
                  style={styles.callButton}
                  onPress={() => handleCall(center.phone)}
                >
                  <Ionicons name="call" size={16} color="white" />
                  <Text style={styles.callButtonText}>{center.phone}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ), 'centros')}

        {renderSection('Contactos de Emergencia', (
          <View>
            <Text style={styles.paragraph}>
              En caso de emergencia, contacta inmediatamente a alguno de estos servicios:
            </Text>
            <SectionList
              sections={emergencyData}
              keyExtractor={(item, index) => item.name + index}
              renderItem={renderEmergencyItem}
              renderSectionHeader={renderSectionHeader}
              scrollEnabled={false}
            />
          </View>
        ), 'emergencia')}

        {renderSection('Prevención y Autocuidado', (
          <View>
            <Text style={styles.boldText}>Medidas de prevención:</Text>
            <Text style={styles.paragraph}>
              - Comparte tu ubicación con personas de confianza{'\n'}
              - Guarda evidencia de situaciones de riesgo{'\n'}
              - Conoce las rutas de escape en tus lugares frecuentes{'\n'}
              - Ten números de emergencia guardados{'\n'}
              - Confía en tu intuición
            </Text>
            
            <Text style={styles.boldText}>Recursos de autocuidado:</Text>
            <Text style={styles.paragraph}>
              - Terapia psicológica gratuita en centros de salud{'\n'}
              - Grupos de apoyo comunitarios{'\n'}
              - Apps de seguridad personal{'\n'}
              - Redes de apoyo vecinales
            </Text>
          </View>
        ), 'prevencion')}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Para más información:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.jalisco.gob.mx/https:/jalisco.gob.mx/api/atencion-ciudadana')}>
            <Text style={styles.link}>Atención ciudadana en Jalisco</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeaderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  sectionContent: {
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  stepsContainer: {
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3498db',
    color: 'white',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 15,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  helpCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  callButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  emergencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
  },
  emergencyNumber: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default Modulo_Informativo;