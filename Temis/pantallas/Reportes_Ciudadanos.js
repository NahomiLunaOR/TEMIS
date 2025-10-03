import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity,
  TextInput, Alert, Image, Modal, FlatList
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Reportes_Ciudadanos = () => {
  const [reports, setReports] = useState([
    {
      id: '1',
      title: 'Bache en avenida principal',
      description: 'Bache grande en la avenida Central, cerca del parque',
      category: 'Infraestructura',
      location: 'Avenida Central #123',
      date: '2023-10-15',
      status: 'Pendiente'
    },
    {
      id: '2',
      title: 'Alumbrado público defectuoso',
      description: 'Poste de luz no funciona en la calle 5 con carrera 8',
      category: 'Servicios Públicos',
      location: 'Calle 5 #8-10',
      date: '2023-10-10',
      status: 'En proceso'
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Seguridad', 'Infraestructura', 'Medio Ambiente', 'Servicios Públicos', 'Otro'];

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setCategory('');
    setEditingReport(null);
  };

  const handleSubmit = () => {
    if (!title || !description || !location || !category) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const newReport = {
      id: editingReport ? editingReport.id : Date.now().toString(),
      title,
      description,
      category,
      location,
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente'
    };

    if (editingReport) {
      setReports(reports.map(report => 
        report.id === editingReport.id ? newReport : report
      ));
      Alert.alert('Éxito', 'Reporte actualizado correctamente');
    } else {
      setReports([newReport, ...reports]);
      Alert.alert('Éxito', 'Reporte enviado correctamente');
    }

    setModalVisible(false);
    resetForm();
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setTitle(report.title);
    setDescription(report.description);
    setLocation(report.location);
    setCategory(report.category);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este reporte?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setReports(reports.filter(report => report.id !== id));
            Alert.alert('Éxito', 'Reporte eliminado correctamente');
          }
        }
      ]
    );
  };

  const renderReportItem = ({ item }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.reportCategory}>{item.category}</Text>
      <Text style={styles.reportLocation}>{item.location}</Text>
      <Text style={styles.reportDate}>{item.date}</Text>
      
      <View style={styles.reportActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => {
            setSelectedReport(item);
            setViewModalVisible(true);
          }}
        >
          <Ionicons name="eye" size={20} color="#4285F4" />
          <Text style={styles.actionText}>Ver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleEdit(item)}
        >
          <Ionicons name="pencil" size={20} color="#FFA500" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash" size={20} color="#FF3B30" />
          <Text style={styles.actionText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente': return '#FFA500';
      case 'En proceso': return '#4285F4';
      case 'Resuelto': return '#34A853';
      default: return '#999';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Reportes Ciudadanos</Text>
        
        <Text style={styles.subtitle}>
          Reporta incidentes en tu comunidad y ayuda a mejorar tu ciudad
        </Text>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.addButtonText}>Nuevo Reporte</Text>
        </TouchableOpacity>

        {reports.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="report-problem" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No hay reportes aún</Text>
            <Text style={styles.emptyStateSubtext}>
              Crea tu primer reporte para ayudar a mejorar tu comunidad
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Tus Reportes</Text>
            <FlatList
              data={reports}
              renderItem={renderReportItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            resetForm();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {editingReport ? 'Editar Reporte' : 'Nuevo Reporte'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => {
                      setModalVisible(false);
                      resetForm();
                    }}
                  >
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}>Título *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Bache en avenida principal"
                  value={title}
                  onChangeText={setTitle}
                />

                <Text style={styles.inputLabel}>Categoría *</Text>
                <View style={styles.categoryContainer}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryButton,
                        category === cat && styles.categoryButtonSelected
                      ]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text style={[
                        styles.categoryText,
                        category === cat && styles.categoryTextSelected
                      ]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Ubicación *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Avenida Central #123"
                  value={location}
                  onChangeText={setLocation}
                />

                <Text style={styles.inputLabel}>Descripción *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe el incidente en detalle..."
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={4}
                />

                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>
                    {editingReport ? 'Actualizar Reporte' : 'Enviar Reporte'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={viewModalVisible}
          onRequestClose={() => setViewModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedReport && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Detalles del Reporte</Text>
                    <TouchableOpacity onPress={() => setViewModalVisible(false)}>
                      <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.viewTitle}>{selectedReport.title}</Text>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Categoría:</Text>
                    <Text style={styles.detailValue}>{selectedReport.category}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Ubicación:</Text>
                    <Text style={styles.detailValue}>{selectedReport.location}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Fecha:</Text>
                    <Text style={styles.detailValue}>{selectedReport.date}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Estado:</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedReport.status) }]}>
                      <Text style={styles.statusText}>{selectedReport.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.detailLabel}>Descripción:</Text>
                  <Text style={styles.viewDescription}>{selectedReport.description}</Text>

                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setViewModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  reportCategory: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
    marginBottom: 5,
  },
  reportLocation: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  reportDate: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 15,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 15,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryButtonSelected: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  categoryText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  categoryTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  viewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  detailValue: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  viewDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Reportes_Ciudadanos;