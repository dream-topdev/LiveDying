import React, { useContext, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { CardField, createToken } from '@stripe/stripe-react-native';
import IconButton from '../../components/IconButton';
import Images from '../../utils/Images';
import API from '../../services/API';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from 'react-query';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { styles } from './styles';
import { scale, scaleVertical } from '../../utils/scale';
import Colors from '../../utils/Colors';
import OutlineButton from '../../components/OutlineButton';
import { AuthContext } from '../../AuthProvider';

const PaymentScreen = ({ navigation }) => {
    const { userProfile, fetchProfile } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const userid = userProfile.result.id;
    const email = userProfile.result.email;
    const [isValidCard, setIsValidCard] = useState(false);
    const { mutate: fetchPaymentIntentClientSecret, isLoading } = useMutation(API.fetchPaymentIntentClientSecret, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: "Puchased successfully."
            })
            setLoading(false);
            fetchProfile(userid);
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: 'Failed purchase.'
            })
        }
    })
    const handlePayPress = async () => {
        if (isValidCard) {
            setLoading(true);
            const token = await createToken({ type: 'Card' });
            const params = {
                body: {
                    userid,
                    token: token.token.id,
                    currency: 'usd',
                    description: `Test payment is from ${email}`,
                }
            }
            console.log('aaaaa', params);
            console.log(token)
            fetchPaymentIntentClientSecret(params);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: 'Enter valid card information.'
            })
        }
    };
    return (
        < View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.notetext}>{'Payment'}</Text>
                <Image
                    source={Images.ic_logo}
                    style={styles.logo}
                    resizeMode={'contain'}
                />
            </View>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.payMessage}>
                        <Text style={styles.payMessageContent}>
                            {'Please pay $0.99 to share to your friends and see other\'s infomation.'}
                        </Text>
                    </View>
                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: Colors.primaryBackColor,
                            fontSize: scale(20),
                            textColor: Colors.black,
                        }}
                        style={{
                            justifyContent: 'center',
                            width: '100%',
                            height: scaleVertical(50),
                            marginTop: scale(50),
                        }}
                        onCardChange={(cardDetails) => {
                            console.log('cardDetails', cardDetails);
                            cardDetails.complete ? setIsValidCard(true) : setIsValidCard(false);
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.loginWrapper}>
                <OutlineButton
                    title="Pay"
                    loading={isLoading && loading}
                    onPress={handlePayPress}
                />
            </View>
        </View >
    )
}
export default PaymentScreen;