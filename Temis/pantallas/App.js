import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';

// Importaciones de pantallas
import Registro from './Registro';
import R_Contraseña from './R_Contraseña';
import Menu_Principal from './Menu_Principal';
import Boton_Emergencia from './Boton_Emergencia';
import Mapa from './Mapa';
import Modulo_Informativo from './Modulo_Informativo';
import Reportes_Ciudadanos from './Reportes_Ciudadanos';
import Perfil from './Perfil';
import Registro_Contactos from './Registro_Contactos';
import Configuracion from './Configuracion';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Componente del Drawer Content personalizado
function CustomDrawerContent(props) {
  return (
    <View style={drawerStyles.container}>
      <View style={drawerStyles.drawerHeader}>
        <Text style={drawerStyles.drawerTitle}>TEMIS</Text>
        <Text style={drawerStyles.drawerSubtitle}>Seguridad, precaución y prevención</Text>
      </View>

      <TouchableOpacity
        style={drawerStyles.drawerItem}
        onPress={() => props.navigation.navigate('Main')}
      >
        <Text style={drawerStyles.drawerItemText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={drawerStyles.drawerItem}
        onPress={() => props.navigation.navigate('Perfil')}
      >
        <Text style={drawerStyles.drawerItemText}>Informacion Personal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={drawerStyles.drawerItem}
        onPress={() => props.navigation.navigate('Registro_Contactos')}
      >
        <Text style={drawerStyles.drawerItemText}>Contactos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={drawerStyles.drawerItem}
        onPress={() => props.navigation.navigate('Configuracion')}
      >
        <Text style={drawerStyles.drawerItemText}>Configuracion</Text>
      </TouchableOpacity>

      <View style={drawerStyles.drawerFooter}>
        <TouchableOpacity
          style={drawerStyles.logoutButton}
          onPress={() => props.navigation.navigate('Login')}
        >
          <Text style={drawerStyles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Navigator del Drawer (para las pantallas después del login)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#49688d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#f8f9fa',
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={Menu_Principal}
        options={{
          title: 'TEMIS - Inicio',
        }}
      />
      <Drawer.Screen
        name="Boton_Emergencia"
        component={Boton_Emergencia}
        options={{ title: 'Botón de Emergencia' }}
      />
      <Drawer.Screen
        name="Mapa"
        component={Mapa}
        options={{ title: 'Mapa de Zonas de Riesgo' }}
      />
      <Drawer.Screen
        name="Modulo_Informativo"
        component={Modulo_Informativo}
        options={{ title: 'Módulo Informativo' }}
      />
      <Drawer.Screen
        name="Reportes_Ciudadanos"
        component={Reportes_Ciudadanos}
        options={{ title: 'Reportes Ciudadanos' }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: 'Mi Perfil' }}
      />
      <Drawer.Screen
        name="Registro_Contactos"
        component={Registro_Contactos}
        options={{ title: 'Contactos' }}
      />
      <Drawer.Screen
        name="Configuracion"
        component={Configuracion}
        options={{ title: 'Configuracion' }}
      />
    </Drawer.Navigator>
  );
}

// ... el resto de tu código se mantiene igual ...

// Pantalla de Login 
function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, llene todos los campos');
      return;
    }
    // Navegar al Drawer Navigator en lugar de a Main directamente
    navigation.navigate('Drawer');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>TEMIS</Text>
        <Text style={styles.texto}>Bienvenid@</Text>

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
          <TextInput
            style={styles.input}
            placeholder='Contraseña'
            placeholderTextColor='#999'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidó su Contraseña?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>o</Text>
          <View style={styles.separatorLine} />
        </View>

        <StatusBar style='auto' />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Componente principal con navegación
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Registro} />
        <Stack.Screen name="ForgotPassword" component={R_Contraseña} />

        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos del Drawer
const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#49688d',
    marginBottom: 20,
  },
  drawerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  drawerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  drawerFooter: {
    marginTop: 'auto',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutButton: {
    backgroundColor: '#49688d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Mantener tus estilos igual
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
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4285F4',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#49688d',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    alignItems: 'center',
    marginBottom: 30,
  },
  registerText: {
    color: '#49688d',
    fontSize: 16,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
  },
});
