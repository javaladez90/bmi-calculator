import React, { useState } from 'react';
import './BMICalculator.css';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [unit, setUnit] = useState('kg-m');

    const handleUnitChange = (e) => {
       setUnit(e.target.value);
       let weightValue = weight;
       let heightValue = height;

       if (e.target.value === 'kg-m') {
        //convert from lbs to kg
        weightValue = weight / 2.20462;
        //convert from inches to meters
        heightValue = height / 39.3701;
       } else if (e.target.value === 'lbs-inches') {
        //convert from kg to lbs
        weightValue = weight * 2.20462;
        //convert from meters to inches
        heightValue = height * 39.3701;
       }

       setWeight(weightValue);
       setHeight(heightValue);
    };

    const calculateBMI = () => {
        const weightKg = unit === 'kg-m' ? parseFloat(weight) : parseFloat(weight) * 0.453592 ;
        const heightM = unit === 'm' ? parseFloat(height) : parseFloat(height) * 0.0254;
        if (weightKg > 0 && heightM > 0) {
            const bmiValue = weightKg / (heightM * heightM);
            setBMI(bmiValue.toFixed(2));
        }
    };
}

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


function interpretBMI(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal Weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese'
}

export default BMICalculator