import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function Donate() {
    const presetAmounts = [10, 25, 50, 100, 250, 500];
    const [amount, setAmount] = useState(presetAmounts[2]); // Default to 50
    const [customAmount, setCustomAmount] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAmountClick = (value) => {
        setAmount(value);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (value) {
            setAmount(Number(value));
        } else {
            setAmount(0); // Or a default value if custom is cleared
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would integrate a real payment gateway (e.g., Stripe, PayPal)
        // For this demo, we will just simulate a successful donation.
        console.log(`Processing donation of $${amount}`);
        setIsSuccess(true);
    };

    return (
        <>
            <Navbar />
            <div className="donate-page-container">
                <div className="donate-card">
                    {!isSuccess ? (
                        <>
                            <div className="donate-header">
                                <h1>Support Our Cause</h1>
                                <p>Your contribution helps us continue our mission and create lasting change. Every donation makes a difference.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="amount-selection">
                                    <h3>Choose an Amount</h3>
                                    <div className="preset-amounts">
                                        {presetAmounts.map(val => (
                                            <button 
                                                type="button" 
                                                key={val} 
                                                className={`amount-btn ${amount === val && !customAmount ? 'selected' : ''}`}
                                                onClick={() => handleAmountClick(val)}
                                            >
                                                ${val}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="custom-amount">
                                        <label htmlFor="customAmount">Or enter a custom amount</label>
                                        <div className="custom-amount-input">
                                            <span>$</span>
                                            <input 
                                                type="number" 
                                                id="customAmount" 
                                                placeholder="0.00" 
                                                value={customAmount} 
                                                onChange={handleCustomAmountChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="donor-info">
                                    <h3>Your Information</h3>
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input type="text" id="fullName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" required />
                                    </div>
                                </div>

                                <div className="payment-info">
                                    <h3>Payment Details (Demo)</h3>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input type="text" id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="expiryDate">Expiry Date</label>
                                            <input type="text" id="expiryDate" placeholder="MM / YY" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cvc">CVC</label>
                                            <input type="text" id="cvc" placeholder="123" required />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="donate-submit-btn">
                                    Donate ${amount > 0 ? amount : '0'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="donation-success">
                            <i className="fas fa-check-circle success-icon"></i>
                            <h2>Thank You!</h2>
                            <p>Your generous donation of <strong>${amount}</strong> has been received.</p>
                            <p>A confirmation receipt will be sent to your email shortly. Your support is invaluable to us.</p>
                            <button onClick={() => window.location.reload()} className="donate-submit-btn">Make Another Donation</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Donate;
