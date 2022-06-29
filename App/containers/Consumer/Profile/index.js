import * as React from 'react';
import {
  Button,
  ScrollView,
  Image,
  View,
  Text
} from 'react-native';
import { AuthContext } from '../../../AuthProvider';
import AppointmentCard from '../../../components/AppointmentCard';
import Avatar from '../../../components/Avatar';
import DentistCard from '../../../components/DentistCard';
import LinkButton from '../../../components/LinkButton';
import Colors from '../../../utils/Colors';
import Images from '../../../utils/Images';
import {styles} from './styles';

const ConsumerProfileScreen = ({ navigation }) => {
    const {logout} = React.useContext(AuthContext);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionProfile}>
              <Avatar
                source={Images.template_user}
                badgeActive={true}
              />
              <Text style={styles.name}>Madeline Klein</Text>
              <Text style={styles.desc}>Grinning since July 2022</Text>
            </View>
            <View style={styles.chartHeader}>
              <Text style={styles.textPrimary}>Your Dental Health</Text>
              <Text style={styles.textSecondary}>2021-2022</Text>
            </View>
            <Image            
                source={Images.template_graph}
                style={styles.graph}
                resizeMode={'contain'}
            />
            <View style={styles.sectionDentists}>
              <Text style={[styles.textPrimary, styles.labelIndent]}>Your Dentist</Text>
              <DentistCard/>
            </View>
            <View style={styles.sectionAppoints}>
              <Text style={[styles.textGray, styles.labelIndent]}>Coming Up</Text>
              <AppointmentCard
                title='Appointment: Bi-annual Check Up'
                description='You have a reservation with Patricia for 8/07/2021'
              />
            </View>
            <View            
              style={{
                marginHorizontal: 10,
                marginBottom: 15,
              }}
            >
              <Button
                title="Log out"
                color={Colors.primaryColor}
                onPress={() => {
                  logout();
                }}
              />
            </View>
        </ScrollView>
    );
};

export default ConsumerProfileScreen;