import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] });
      if (data.length > 0) { setContact(data); }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={contact}
        renderItem={({ item }) => <Text>{item.name} ({item.phoneNumbers[0].number})</Text>}
        // Work on an iOS device
      />
      <View style={styles.btn}>
        <Button title="GET CONTACTS" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 70,
    marginLeft: 50,
    marginBottom: 30,
  },
  btn: {
    marginBottom: 40,
  },
});
