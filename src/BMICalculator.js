import React, { useState } from 'react';
import './BMICalculator.css';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [weightUnit, setWeightUnit] = useState('kg');
    const [heightUnit, setHeightUnit] = useState('m')
    

    const handleWeightChange = (e) => {
       setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleWeightUnitChange = (e) => {
        const newUnit = e.target.value;
        setWeightUnit(newUnit);
    };

    const handleHeightUnitChange = (e) => {
        const newUnit = e.target.value;
        setHeightUnit(newUnit);
    };
       
    const calculateBMI = () => {
        let weightKg = parseFloat(weight);
        let heightM = parseFloat(height);

        if (weightUnit === 'lbs') {
            //convert lbs to kg
            weightKg = weightKg * 0.453592
        }

        if (heightUnit === 'inches') {
            //convert inches to meters
            heightM = heightM * 0.0254;
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
        return 'Obese'
    }


    return (
        <div className='bmi-calculator'>
            <h1>BMI Calculator</h1>
            <div>
                <label htmlFor='weight'>Weight:</label>
                <input
                    type='text'
                    id='weight'
                    value={weight}
                    onChange={handleWeightChange}
                    />
                    <select className='weightUnit' value={weightUnit} onChange={handleWeightUnitChange}>
                        <option value='kg'>kg</option>
                        <option value='lbs'>lbs</option>
                    </select>
                <label htmlFor='height'>Height:</label>
                <input
                    type='text'
                    id='height'
                    value={height}
                    onChange={handleHeightChange}
                    />
                    <select className='heightUnit' value={heightUnit} onChange={handleHeightUnitChange}>
                        <option value='m'>m</option>
                        <option value='inches'>inches</option>
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