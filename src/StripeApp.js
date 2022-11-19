import { StatusBar, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
const API_URL = "http://localhost:3000"
const StripeApp = (props) => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayement, loading } = useConfirmPayment();
    const fetchPayementIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/ 
        create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };

    }




    const handlePayPress = async () => {
        if (!cardDetails?.complete || !email) {
            Alert.alert(" Please enter Complete card details and Email")
            return;
        }
        const billingDetails = {
            email: email
        }
        try {
            const { clientSecret, error } = await
                fetchPayementIntentClientSecret();
            if (error) {
                console.log("Unable to process payement")
            } else {
                const { paymentIntent, error } = await confirmPayement(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });
            } if (error) {
                alert(`Payment Confirmation error ${error.message}`)
            } else if (paymentIntent) {
                alert("Payment successful ", paymentIntent)
                console.log("Payment successful", paymentIntent)
            }

        } catch (e) {

        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize='none'
                placeholder='E-mail'
                keyboardType='email-adress'
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}

            />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails)
                }

                }

            />
            <Button onPress={handlePayPress} title="Pay" disable={loading} />
        </View>
    )
}
export default StripeApp
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        justifyContent: "center",
    },
    input: {
        backgroundColor: "#efefefef",
        borderColor: "#000000",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,

    },
    card: {
        backgroundColor: "#efefefef",

    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    }
})