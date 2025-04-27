import React, { useState } from 'react';
import "../App.css";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentDateChange = (e) => {
    setPaymentDate(e.target.value);
  };

  return (
    <div className="container">
      <div className="card shadow-lg">
        <div className="card-header text-center text-white">
          <h2 className="service_taital">Payment Form</h2>
        </div>
        <div className="card-body">
          <form>
            {/* Payment Method */}
            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
              <select
                className="form-select"
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>

            {/* Payment Date */}
            <div className="mb-3">
              <label htmlFor="paymentDate" className="form-label">Payment Date</label>
              <input
                type="date"
                className="form-control"
                id="paymentDate"
                value={paymentDate}
                onChange={handlePaymentDateChange}
                required
              />
            </div>

            {/* Conditional Fields based on Payment Method */}
            {paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card' ? (
              <>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    placeholder="Enter Card Number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                  <input
                    type="month"
                    className="form-control"
                    id="expirationDate"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="Enter CVV"
                    required
                  />
                </div>
              </>
            ) : paymentMethod === 'Net Banking' ? (
              <>
                <div className="mb-3">
                  <label htmlFor="bankAccount" className="form-label">Bank Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankAccount"
                    placeholder="Enter Bank Account Number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ifscCode" className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ifscCode"
                    placeholder="Enter IFSC Code"
                    required
                  />
                </div>
              </>
            ) : null}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100 mt-4">Submit Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
