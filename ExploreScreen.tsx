import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <LinearGradient
      colors={['#F75C9D', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/icons/info.png')} style={styles.iconMedium} />
            <Text style={styles.header}>What To Expect</Text>
          </View>
          <Text style={styles.sectionText}>
            Once you book, a roadside mechanic will contact you shortly to confirm your location and payment. 
            Service is typically dispatched within 30–45 minutes.
          </Text>
        </View>

        <Text style={styles.header}>Service Price List</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {[
            { title: 'Gas by the Gallon', price: '$10', image: require('../../assets/images/services/1.png') },
            { title: 'Tire Inflation', price: '$15', image: require('../../assets/images/services/2.png') },
            { title: 'Oil Change', price: '$25', image: require('../../assets/images/services/3.png') },
            { title: 'Battery Jump', price: '$30', image: require('../../assets/images/services/4.png') },
            { title: '5 Gallon Refill', price: '$35', image: require('../../assets/images/services/5.png') },
            { title: 'Door Unlock', price: '$40', image: require('../../assets/images/services/6.png') },
            { title: 'Tire Change', price: '$50', image: require('../../assets/images/services/7.png') },
          ].map((item, index) => (
            <View key={index} style={styles.serviceCard}>
              <Image source={item.image} style={styles.serviceImage} resizeMode="contain" />
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.feeNoteRow}>
          <Image source={require('../../assets/icons/warning.png')} style={styles.iconSmall} />
          <Text style={styles.feeNote}>All services are subject to a $25 service fee.</Text>
        </View>

        <View style={styles.headerRow}>
          <Image source={require('../../assets/icons/location.png')} style={styles.icon} />
          <Text style={styles.header}>Service Area</Text>
        </View>
        <Text style={styles.text}>
          We service the entire Tri-State area in and around Cincinnati, OH.
        </Text>

        <View style={styles.headerRow}>
          <Image source={require('../../assets/icons/sos.png')} style={styles.icon} />
          <Text style={styles.header}>Tips for Roadside Emergencies</Text>
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tip}>• Stay calm and remain in your vehicle if safe</Text>
          <Text style={styles.tip}>• Turn on hazard lights</Text>
          <Text style={styles.tip}>• Share your exact location when booking</Text>
          <Text style={styles.tip}>• Keep your phone charged</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F75C9D',
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F75C9D',
    marginBottom: 16,
  },
  service: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
  },
  price: {
    color: '#FF8BA7',
    fontWeight: '600',
  },
  tipBox: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F75C9D',
  },
  tip: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 6,
  },
  serviceCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginRight: 14,
    width: 180,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F75C9D',
  },
  serviceIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  serviceTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  servicePrice: {
    color: '#FF8BA7',
    fontSize: 16,
    fontWeight: '600',
  },
  serviceImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  feeNote: {
    color: '#ccc',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  feeNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconSmall: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  sectionBox: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F75C9D',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },
  iconMedium: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
});
