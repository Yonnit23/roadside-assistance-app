import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-root-toast';
import { RootStackParamList } from '../../navigationTypes';

type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;

export default function BookingScreen() {
  const navigation = useNavigation<BookingScreenNavigationProp>();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [service, setService] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (submitting) {
      Alert.alert('Please wait before submitting again.');
      return;
    }

    if (!name || !phone || !location || !service) {
      Alert.alert('Please fill out all required fields');
      return;
    }

    setSubmitting(true);

    const subject = 'New Roadside Service Request';
    const body = `
Name: ${name}
Phone: ${phone}
Location: ${location}
Location Type: ${locationType}
Vehicle: ${vehicleDetails}
Service: ${service}
Preferred Payment Method: ${paymentMethod || 'N/A'}
`;

    const mailto = `mailto:DDDroadhelp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() => {
      Toast.show('Failed to open email client.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    });

    Toast.show('Email app opened. Send the form to complete your request.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM
    });

    setTimeout(() => {
      setSubmitting(false);
      navigation.navigate('Confirmation');
    }, 10000);

    setName('');
    setPhone('');
    setLocation('');
    setLocationType('');
    setVehicleDetails('');
    setService('');
    setPaymentMethod('');
  };

  return (
    <LinearGradient
      colors={['#F75C9D', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.sectionBox}>
            <Text style={styles.title}>Book a Service</Text>

            <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor="#999" value={name} onChangeText={setName} />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              value={phone}
              keyboardType="number-pad"
              maxLength={14}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, '');
                let formatted = '';

                if (cleaned.length <= 3) {
                  formatted = `(${cleaned}`;
                } else if (cleaned.length <= 6) {
                  formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
                } else {
                  formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
                }

                setPhone(formatted);
              }}
            />

            <TextInput style={styles.input} placeholder="Vehicle Location" placeholderTextColor="#999" value={location} onChangeText={setLocation} />

            <View style={styles.pickerWrapper}>
              <Picker selectedValue={locationType} onValueChange={(val) => setLocationType(val.toString())} style={styles.picker} dropdownIconColor="white">
                <Picker.Item label="Select Location Type..." value="" />
                <Picker.Item label="Flat Surface" value="Flat Surface" />
                <Picker.Item label="Hill" value="Hill" />
                <Picker.Item label="Highway" value="Highway" />
                <Picker.Item label="Street" value="Street" />
                <Picker.Item label="Parking Lot" value="Parking Lot" />
                <Picker.Item label="Driveway" value="Driveway" />
              </Picker>
            </View>

            <TextInput style={styles.input} placeholder="Vehicle Description (Year, Make, Model, Color)" placeholderTextColor="#999" value={vehicleDetails} onChangeText={setVehicleDetails} />

            <View style={styles.pickerWrapper}>
              <Picker selectedValue={service} onValueChange={(val) => setService(val.toString())} style={styles.picker} dropdownIconColor="white">
                <Picker.Item label="Select a service..." value="" />
                <Picker.Item label="Gas by the Gallon – $10" value="Gas by the Gallon – $10" />
                <Picker.Item label="Tire Inflation – $15" value="Tire Inflation – $15" />
                <Picker.Item label="Oil Change – $25" value="Oil Change – $25" />
                <Picker.Item label="Battery Jump – $30" value="Battery Jump – $30" />
                <Picker.Item label="5 Gallon Refill – $35" value="5 Gallon Refill – $35" />
                <Picker.Item label="Door Unlock – $40" value="Door Unlock – $40" />
                <Picker.Item label="Tire Change – $50" value="Tire Change – $50" />
              </Picker>
            </View>

            <TextInput style={styles.input} placeholder="Preferred Payment Method (optional)" placeholderTextColor="#999" value={paymentMethod} onChangeText={setPaymentMethod} />

            <Text style={styles.feeNote}>All services are subject to a $25 service fee.</Text>
            <Text style={styles.waiver}>By submitting, you acknowledge that this is a non-refundable service request and availability is based on technician readiness.</Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
              <Text style={styles.buttonText}>{submitting ? 'Submitting...' : 'Submit Booking'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionBox: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F75C9D',
    marginBottom: 20,
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F75C9D',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  pickerWrapper: {
    backgroundColor: '#333',
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 8,
  },
  feeNote: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  waiver: {
    color: '#888',
    fontSize: 12,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#F75C9D',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
