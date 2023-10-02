import React, { useState } from 'react';
import './BMICalculator.css';

//implement the functions in react needed to build the web application
//these functions will gather the variables needed to use our calculator
function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [bmi, setBMI] = useState(null);
    const [weightUnit, setWeightUnit] = useState('kg');
    const [heightUnit, setHeightUnit] = useState('m')
    
//first we 
    const handleWeightChange = (e) => {
       setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
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

    const weightPlaceholder = weightUnit === 'kg' ? 'Weight (kg)' : 'Weight (lbs)';
    const heightPlaceholder = heightUnit === 'm' ? 'Height (m)' : 'Height (inches)';

    //Function to see how many calories would be needed daily based on BMI

   

    return (
        <div className='bmi-calculator'>
            <h1>BMI Calculator</h1>
            <div>
                <p>Choose units:</p>
                <label>
                    <input
                        type='radio'
                        name='unit'
                        value='metric'
                        checked={weightUnit === 'kg' && heightUnit === 'm'}
                        onChange={() => {
                            setWeightUnit('kg');
                            setHeightUnit('m');
                        }}
                    />
                    Metric (kg/m)
                </label>
                <label>
                    <input
                        type='radio'
                        name='unit'
                        value='imperial'
                        checked={weightUnit === 'lbs' && heightUnit === 'inches'}
                        onChange={() => {
                            setWeightUnit('lbs');
                            setHeightUnit('inches');
                        }}
                    />
                    Imperial (lbs/inches)
                </label>
            </div>
            <div>
                <br></br>
                <label htmlFor='weight'>Weight:</label>
                <input
                    type='text'
                    id='weight'
                    value={weight}
                    onChange={handleWeightChange}
                    placeholder={weightPlaceholder}
                    />
                </div>
                <div>
                <label htmlFor='height'>Height:</label>
                <input
                    type='text'
                    id='height'
                    value={height}
                    onChange={handleHeightChange}
                    placeholder={heightPlaceholder}
                    />
            </div>
            <div> 
                <label htmlFor='age'>Age:</label>
                <select id='age' value={age} onChange={handleAgeChange}>
                    {Array.from({ length: 82 }, (_, index) => (
                        <option key={index} value={index + 18}>
                            {index + 18}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='gender'>Gender:</label>
                <select id='gender' value={gender} onChange={handleGenderChange}>
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