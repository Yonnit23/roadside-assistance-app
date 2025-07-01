import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';

type ConfirmationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Confirmation'>;

export default function ConfirmationScreen() {
  const navigation = useNavigation<ConfirmationNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Your request has been created!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking')}>
        <Text style={styles.buttonText}>Return to Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 24,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#F75C9D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});