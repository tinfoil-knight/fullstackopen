/*
* @param {number} weight : in Kg
* @param {number} height : in cm
* @returns {string} situational descriptor
*/
const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = (weight / Math.pow(height, 2)) * 10000;

    if (bmi <= 16) {
        return "Severely underweight";
    }
    if (bmi > 16 && bmi <= 18.5) {
        return "Underweight";
    }
    if (bmi > 18.5 && bmi <= 25) {
        return "Normal (healthy weight)";
    }
    if (bmi > 25 && bmi <= 30) {
        return "Overweight";
    }
    if (bmi > 30 && bmi <= 35) {
        return "Moderately obese";
    }
    if (bmi > 35) {
        return "Severely obese";
    }

    return "Error";
};

// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])

// console.log(calculateBmi(height, weight))


export default calculateBmi;