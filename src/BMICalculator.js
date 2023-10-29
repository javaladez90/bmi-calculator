import React, { useState } from 'react';
import './BMICalculator.css';
import ProteinPrices from './components/ProteinPrices';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [heightFeet, setHeightFeet] = useState('1');
    const [heightInches, setHeightInches] = useState('1');
    const [heightMeters, setHeightMeters] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [bmi, setBMI] = useState(null);
    const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleHeightFeetChange = (e) => {
        setHeightFeet(e.target.value);
    };

    const handleHeightInchesChange = (e) => {
        setHeightInches(e.target.value);
    };

    const handleHeightMetersChange = (e) => {
        setHeightMeters(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const calculateBMI = () => {
        let weightKg = parseFloat(weight);
        let heightM = 0;

        if (unit === 'metric') {
            heightM = parseFloat(heightMeters);
        } else if (unit === 'imperial') {
            heightM = (parseFloat(heightFeet) * 0.3048) + (parseFloat(heightInches) * 0.0254);
            weightKg = weightKg * 0.453592;
        }

        if (weightKg > 0 && heightM > 0) {
            const bmiValue = weightKg / (heightM * heightM);
            setBMI(bmiValue.toFixed(2));
        }
    };

    function interpretBMI(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 24.9) return 'Normal Weight';
        if (bmi < 29.9) return 'Overweight';
        return 'Obese';
    }

    return (
        <div className='bmi-calculator'>
            <h1>BMI Calculator</h1>
            <div>
                <label>Choose units:</label>
                <div>
                    <label>
                        <input
                            type='radio'
                            name='unit'
                            value='metric'
                            checked={unit === 'metric'}
                            onChange={handleUnitChange}
                        />
                        Metric
                    </label>
                    <label>
                        <input
                            type='radio'
                            name='unit'
                            value='imperial'
                            checked={unit === 'imperial'}
                            onChange={handleUnitChange}
                        />
                        Imperial
                        </label>
                </div>
            </div>
            <div>
                <label htmlFor='weight'>Weight:</label>
                <input
                    type='text'
                    id='weight'
                    value={weight}
                    onChange={handleWeightChange}
                    placeholder={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
                />
            </div>
            <div>
                <label>Height:</label>
                {unit === 'metric' ? (
                    <input
                        type='text'
                        value={heightMeters}
                        onChange={handleHeightMetersChange}
                        placeholder='Height (m)'
                    />
                ) : (
                    <div>
                        <select value={heightFeet} onChange={handleHeightFeetChange}>
                            {Array.from({ length: 7 }, (_, i) => (
                                <option key={i} value={(i + 1).toString()}>
                                    {i + 1} ft
                                </option>
                            ))}
                        </select>
                        <select value={heightInches} onChange={handleHeightInchesChange}>
                            {Array.from({ length: 11 }, (_, i) => (
                                <option key={i} value={(i + 1).toString()}>
                                    {i + 1} in
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor='age'>Age:</label>
                <input type='number' id='age' value={age} onChange={handleAgeChange} />
            </div>
            <div>
                <label htmlFor='gender'>Gender:</label>
                <select value={gender} onChange={handleGenderChange}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
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

export default BMICalculator;


