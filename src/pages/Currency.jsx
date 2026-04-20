import { useState } from "react";

function Currency() {
    const [amount, setAmount] = useState("");
    const [converted, setConverted] = useState(null);

    const convertCurrency = async () => {
        const res = await fetch(
            `https://api.exchangerate-api.com/v4/latest/INR`
        );
        const data = await res.json();

        const rate = data.rates.USD; // INR → USD
        setConverted((amount * rate).toFixed(2));
    };

    return (
        <div className="container">
            <div className="card">
                <h2>💱 Currency Converter</h2>
                <p style={{ marginBottom: '20px', color: '#667eea', fontWeight: '500' }}>INR → USD</p>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <input
                        type="number"
                        placeholder="Enter amount in INR"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button onClick={convertCurrency}>🔄 Convert</button>
                </div>

                {converted && (
                    <div className="stats-box">
                        <p>
                            <strong>₹ {parseFloat(amount).toFixed(2)} INR equals</strong>
                        </p>
                        <p style={{ fontSize: '24px', fontWeight: '700', color: '#667eea', margin: '12px 0' }}>
                            ${converted} USD
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Currency;