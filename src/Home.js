import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Col, Row } from "react-bootstrap";
import StripeContainer from "./PaymentForm";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next'; 
const BookingForm = () => {
    const { t } = useTranslation(); 

    const [formData, setFormData] = useState({
        loginPhone: "",
        contactPhone: "",
        email: "",
        name: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        sessions: 8,
        paymentMethod: "Visa",
        cardHolder: "",
        cardNumber: "",
    });

    const [totalPrice, setTotalPrice] = useState(227.2);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [payInAdvance, setPayInAdvance] = useState(false);

    const regularPricePerSession = 9.6;
    const discountPricePerSession = 8.04;
    const setupFee = 0;

    const calculatePrice = (sessions, payInAdvance) => {
        const discount = sessions * (regularPricePerSession - discountPricePerSession);
        let total = discountPricePerSession * sessions + setupFee;

        if (payInAdvance) {
            total = total * 0.96;
        }

        return { discount, total };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "sessions") {
            const { discount, total } = calculatePrice(Number(value), payInAdvance);
            setTotalPrice(total.toFixed(2));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.email ||
            !formData.name ||
            !formData.address ||
            !formData.postalCode ||
            !formData.city ||
            !formData.country ||
            !acceptTerms
        ) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Please fill in all required fields and accept the terms and conditions.",
            });
            return;
        }

        if (!acceptTerms) {
            Swal.fire({
                icon: "error",
                text: "You must accept the terms and conditions to proceed.",
            });
            return;
        }

        try {
            const response = await axios.post("https://wordpress/endpoint", formData);
            console.log(response.data);
            Swal.fire({
                icon: "success",
                title: "Booking Successful",
                text: "Your booking has been placed successfully!",
            });
        } catch (error) {
            console.error("Error submitting the order:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an error submitting your booking. Please try again.",
            });
        }
    };

    const { discount, total } = calculatePrice(formData.sessions, payInAdvance);

    return (
        <>
            <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
            <Row>
                <Col md={6} className="payment-sec">
                    <div className="form-title">
                        <h2>{t('registration')}</h2>
                        <p>{t('platform')}</p>
                    </div>
                    {/* Contact Info */}
                    <div className="form-section">
                        <label>{t('loginPhone')}</label>
                        <PhoneInput
                            country={"us"}
                            inputClass="form-control"
                            placeholder="phone"
                            containerStyle={{ marginBottom: '15px' }}
                        />
                        <label>{t('contactPhone')}</label>
                        <PhoneInput
                            country={"us"}
                            inputClass="form-control"
                            placeholder="phone"
                            containerStyle={{ marginBottom: '15px' }}
                        />
                        <label>{t('email')}</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <label>{t('name')}</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Billing Address */}
                    <div className="form-section">
                        <label>{t('billingAddress')}</label>
                        <div className="d-flex justify-content-between">
                            <input
                                className="form-control address-input"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                className="form-control nr-input"
                                type="text"
                                placeholder="Nr"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between more-address">
                            <div>
                                <label>{t('postalCode')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>{t('city')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>{t('country')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="form-section">
                        <label>{t('sessions')}</label>
                        <select
                            name="sessions"
                            value={formData.sessions}
                            onChange={handleInputChange}
                        >
                            {[8, 12, 16, 20].map((option) => (
                                <option key={option} value={option}>
                                    {option} {t('sessions')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-section">
                        <label>{t('payInAdvance')}</label>
                        <StripeContainer />
                    </div>
                    <label>100% secure payment. All data is encrypted.</label>
                </Col>
                <Col md={6}>
                    <div className="order-overview">
                        <div>
                            <h3>Order Overview</h3>
                            <div className="duration-div">
                                <div className="d-flex">
                                    <div>
                                        <input type="radio" name="duration" id="six-month" />
                                        <label htmlFor="six-month">6 months</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="duration" id="month-nine" />
                                        <label htmlFor="month-nine">9 months</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="duration" id="month-12" />
                                        <label htmlFor="month-12">12 months</label>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <input type="radio" name="duration" id="month-18" />
                                        <label htmlFor="month-18">18 months</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="duration" id="month-24" />
                                        <label htmlFor="month-24">24 months</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="duration" id="month-36" />
                                        <label htmlFor="month-36">36 months</label>
                                    </div>
                                </div>
                            </div>

                            <div className="discount-toggle">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={payInAdvance}
                                        onChange={() => {
                                            setPayInAdvance(!payInAdvance);
                                            const { discount, total } = calculatePrice(
                                                formData.sessions,
                                                !payInAdvance
                                            );
                                            setTotalPrice(total.toFixed(2));
                                        }}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <p>{t('payInAdvance')}</p>
                            </div>
                            <div className="pricing-total">
                                <p>
                                    <strong>Number of Sessions P.M.:</strong> {formData.sessions}
                                </p>
                                <p>
                                    <strong>Regular Price:</strong>{" "}
                                    <del>{(30 * formData.sessions).toFixed(2)}€</del>
                                </p>
                                <p>
                                    <strong>Your Price:</strong> {(24 * formData.sessions).toFixed(2)}€
                                </p>
                                <p className="discount">
                                    <strong>{t('discount')}:</strong>{" "}
                                    <span>-{discount.toFixed(2)}€</span>
                                </p>
                                <div className="divider"></div>
                                <p>
                                    <strong>Setup Fee:</strong>
                                    <span className="final">{10}€ </span>
                                </p>
                                <p>
                                    <strong>{t('totalPrice')}:</strong>
                                    <span className="final">{total.toFixed(2)}€</span>
                                </p>
                            </div>

                            <div className="accept-terms">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                />
                                <label htmlFor="terms">
                                    {t('acceptTerms')}
                                    <Link to="/terms"> {t('terms')} </Link> {t("andund")}
                                    <Link to="/right-of-withdrawal"> {t('withdrawal')} </Link>  {t('acceptTerms2')}
                                    
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={!acceptTerms}
                                className="submit-btn"
                            >
                                {t('submit')}
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </form>
            </div>
        </>
    );
};

export default BookingForm;
