import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { getDatabase, ref, child, onValue } from 'firebase/database';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      street: '',
      district: '',
      city: '',
      phone: '',
      fax: '',
      email: ''
    }
  }
  render() {
      return (
        
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card>
            <Card.Title>Our Address</Card.Title>
            <Card.Divider />
                <Text style={{ margin: 10 }}>{this.state.number}, {this.state.street}</Text>
                <Text style={{ margin: 10 }}>{this.state.district}</Text>
                <Text style={{ margin: 10 }}>{this.state.city}</Text>
                <Text style={{ margin: 10 }}>Tel: {this.state.phone}</Text>
                <Text style={{ margin: 10 }}>Fax: {this.state.fax}</Text>
                <Text style={{ margin: 10 }}>Email: {this.state.email}</Text>
                <Text></Text>
                <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#9FE2BF' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />
            </Card>  
        </Animatable.View>
      );
    }
    composeMail() {
      MailComposer.composeAsync({
        recipients: ['quang.nk1878@sinhvien.hoasen.edu.vn'],
        subject: 'From Confusion',
        body: 'Hello my friends ...'
      });
    }
    componentDidMount() {
      const dbRef = ref(getDatabase());
      onValue(child(dbRef, 'contact/'), (snapshot) => {
        const value = snapshot.val();
        this.setState({
          number: value.address.number,
          street: value.address.street,
          district: value.address.district,
          city: value.address.city,
          phone: value.phone,
          fax: value.fax,
          email: value.email
        });
      });
    }
    }
  export default Contact;