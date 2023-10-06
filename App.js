import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, ScrollView, StyleSheet, Image } from 'react-native';

const App = () => {
  const [screen, setScreen] = useState('Home');
  const [patientInfo, setPatientInfo] = useState({});
  const [appointmentType, setAppointmentType] = useState('Médico');
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [patients, setPatients] = useState([]);

  const handleAppointment = () => {
    console.log('Informações do paciente:', patientInfo);
    console.log('Tipo de consulta:', appointmentType);

    let appointmentPrice = 100;
    if (appointmentType === 'Psicólogo') {
      appointmentPrice = 120;
    }

    setPaymentInfo({ ...patientInfo, appointmentType, appointmentPrice });
    setPatients([...patients, { ...patientInfo, appointmentType, appointmentPrice }]);
    setScreen('Payment');
  };

  const handlePayment = () => {
    console.log('Informações de pagamento:', paymentInfo);
    setScreen('PatientList');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const viewPatientList = () => {
    setScreen('PatientList');
  };

  const handleGoBack = () => {
    setScreen('Home');
  };

  return (
    <ScrollView style={styles.container}>
      {screen === 'Home' && (
        <View>
          <Text style={styles.header}>Consultório Médico Palestra Itália</Text>
          <Text style={styles.subHeader}>Sua Saúde em Boas Mãos</Text>
          
          <Button title="Agendar Consulta" onPress={() => setScreen('Appointment')} color="green" />
          <Button title="Ver Lista de Pacientes" onPress={viewPatientList} color="blue" />
        </View>
      )}
      {screen === 'Appointment' && (
        <View>
          <Text style={styles.header}>Agendamento de Consulta</Text>
          <TextInput
            placeholder="Nome Completo"
            style={styles.input}
            onChangeText={(text) => setPatientInfo({ ...patientInfo, name: text })}
          />
          <TextInput
            placeholder="CPF"
            style={styles.input}
            onChangeText={(text) => setPatientInfo({ ...patientInfo, cpf: text })}
          />
          <TextInput
            placeholder="Data de Nascimento"
            style={styles.input}
            onChangeText={(text) => setPatientInfo({ ...patientInfo, birthdate: text })}
          />
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            onChangeText={(text) => setPatientInfo({ ...patientInfo, address: text })}
          />
         
          <Button title="Agendar Consulta" onPress={handleAppointment} color="green" />
          <Button title="Voltar" onPress={handleGoBack} color="gray" />
        </View>
      )}
      {screen === 'Payment' && (
        <View>
          <Text style={styles.header}>Pagamento</Text>
          <Text style={styles.paymentInfo}>Nome: {paymentInfo.name}</Text>
          <Text style={styles.paymentInfo}>CPF: {paymentInfo.cpf}</Text>
          <Text style={styles.paymentInfo}>Data de Nascimento: {paymentInfo.birthdate}</Text>
          <Text style={styles.paymentInfo}>Endereço: {paymentInfo.address}</Text>
          <Text style={styles.paymentInfo}>Tipo de Consulta: {paymentInfo.appointmentType}</Text>
          <Text style={styles.paymentInfo}>Preço da Consulta: R${paymentInfo.appointmentPrice}</Text>
          {isEditing ? (
            <View>
              <Button title="Salvar Edições" onPress={() => setIsEditing(false)} color="green" />
            </View>
          ) : (
            <View>
              <Button title="Editar Informações Pessoais" onPress={handleEdit} color="orange" />
              <Button title="Pagar" onPress={handlePayment} color="blue" />
            </View>
          )}
          <Button title="Voltar" onPress={handleGoBack} color="gray" />
        </View>
      )}
      {screen === 'PatientList' && (
        <View>
          <Text style={styles.header}>Lista de Pacientes Agendados</Text>
          <ScrollView>
            {patients.map((patient, index) => (
              <View key={index} style={styles.patientItem}>
                <Text>Nome: {patient.name}</Text>
                <Text>CPF: {patient.cpf}</Text>
                <Text>Data de Nascimento: {patient.birthdate}</Text>
                <Text>Endereço: {patient.address}</Text>
                <Text>Tipo de Consulta: {patient.appointmentType}</Text>
                <Text>Preço da Consulta: R${patient.appointmentPrice}</Text>
              </View>
            ))}
          </ScrollView>
          <Button title="Voltar" onPress={handleGoBack} color="gray" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    marginBottom: 10,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
    textAlign: 'center',
  },
  consultorioImage: {
    width: '100%',
    height: 200, // Ajuste a altura conforme necessário
    resizeMode: 'cover',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  patientItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
});

export default App;