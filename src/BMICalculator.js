import React, { useState } from 'react';
import './BMICalculator.css';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [unit, setUnit] = useState('kg-m');

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
        const weightValue = e.target.value === 'kg-m' ? weight * 2.20462 : weight / 2.20462;
        const heightValue = e.target.value === 'kg-m' ? height / 39.3701 : height * 39.3701;
        setWeight(weightValue);
        setHeight(heightValue);
    };

    const calculateBMI = () => {
        const weightKg = unit === 'lbs' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
        const heightM = unit === 'inches' ? parseFloat(height) * 0.0254 : parseFloat(height);
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
                    <select className='weightUnit' value={unit} onChange={handleUnitChange}>
                        <option value='kg-m'>kg</option>
                        <option value='lbs-inches'>lbs</option>
                    </select>
                <label htmlFor='height'>Height (m):</label>
                <input
                    type='text'
                    id='height'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    />
                    <select className='weightUnit' value={unit} onChange={handleUnitChange}>
                        <option value='kg-m'>m</option>
                        <option value='lbs-inches'>inches</option>
                    </select>
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