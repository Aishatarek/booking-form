import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-public-key-here');

const PaymentForm = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Visa');
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);
    const stripe = useStripe();
    const elements = useElements();

    const handleRadioChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
        setIsAccordionOpen(false);
    };

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (selectedPaymentMethod === 'Visa') {
            const card = elements.getElement(CardElement);

            const { token, error } = await stripe.createToken(card);

            if (error) {
                console.error(error);
            } else {
                console.log('Received Stripe token:', token);
            }
        }

        if (selectedPaymentMethod === 'SEPA') {
            const iban = document.getElementById('iban').value;
            const accountHolderName = document.getElementById('accountHolderName').value;

            console.log('IBAN:', iban, 'Account Holder:', accountHolderName);
        }
    };

    return (
        <div className="payment-form">
            <div className="accordion">
                <label className='accordion-title'>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Visa"
                        checked={selectedPaymentMethod === 'Visa'}
                        onChange={handleRadioChange}
                    />
                    <img src="images/visa-mastercard-american-express-png-6.png" alt="visa" />
                </label>

                {selectedPaymentMethod === 'Visa' && (
                    <div className="accordion-content">

                        <div className="visa-form">
                            <input id="accountHolderName" type="text" placeholder="Card Holder" className='form-control' />
                            <CardElement className='form-control card-number' />
                        </div>
                    </div>
                )}
                <label className='accordion-title'>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="SEPA"
                        checked={selectedPaymentMethod === 'SEPA'}
                        onChange={handleRadioChange}
                    />
                    <img src="images/pngegg.png" alt="sepa" />
                </label>

                    {selectedPaymentMethod === 'SEPA' && (
                        <div className="accordion-content">

                        <div className="sepa-form">
                            <input id="iban" type="text" placeholder=" IBAN" className='form-control' />
                            <input id="accountHolderName" type="text" placeholder="Account holder " className='form-control' />
                        </div>
                        </div>

                    )}
            </div>

        </div>
    );
};

const StripePaymentForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripePaymentForm;
