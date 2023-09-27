import React, { useState } from 'react';
import './BMICalculator.css';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);

    const calculateBMI = () => {
        const weightKg = parseFloat(weight);
        const heightM = parseFloat(height);
        if (weightKg > 0 && heightM > 0) {
            const bmiValue = weightKg / (heightM * heightM);
            setBMI(bmiValue.toFixed(2));
        }
    };

    return (
        <div className='bmi-calculator'>
            <h1>BMI Calculator</h1>
            <div>
                <label htmlFor='weight'>Weight (kg):</label>
                <input
                    type='text'
                    id='weight'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    />
                <label htmlFor='height'>Height (m):</label>
                <input
                    type='text'
                    id='height'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    />
            </div>
            <button onClick={calculateBMI}>Calculate BMI</button>
            {bmi && (
                <div className='bmi-result'>
                    <p>Your BMI is {bmi}</p>
                    <p>You are categorized as {interpretBMI(parseFloat(bmi))}</p>
                </div>
            )}
        </div>
    );
}

function interpretBMI(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal Weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese'
}

export default BMICalculator