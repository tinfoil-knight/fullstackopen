interface Report {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const ratingDescriptor = (rating: number): string => {
    switch (rating) {
        case 1:
            return "You need a lot of improvement";
        case 2:
            return "Not bad but can be better";
        case 3:
            return "You are doing great";
        default:
            return "Error in rating";
    }
};


const parseInput = (hours: number[], target: number): boolean => {
    if (isNaN(target)) {
        throw new Error('\'target\' value is not a number');
    }
    if (hours.map(el => Number(isNaN(el))).reduce((a, b) => a + b, 0)) {
        throw new Error('number of exercise hours has non-numerical values');
    }
    return true;
};

const calculateExercises = (hours: number[], target: number): Report => {
    try {
        if (parseInput(hours, target)) {
            console.log("Input is okay! Proceeding...");
        }
    }
    catch (error) {
        console.log(error.message);
    }


    const targetHours: number = target * hours.length;
    const noZeroDays: number[] = hours.filter(el => el !== 0);
    const totalHours: number = hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const rawScore: number = (totalHours) / (targetHours);
    const rating: number = (rawScore <= 1) ? Math.floor(rawScore * (3 - 1 + 1)) + 1 : 3;

    const report: Report = {
        periodLength: hours.length,
        trainingDays: noZeroDays.length,
        success: (hours.length === noZeroDays.length) && (totalHours >= targetHours),
        rating: rating,
        ratingDescription: ratingDescriptor(rating),
        target: target,
        average: Math.round((totalHours / hours.length) * 100) / 100
    };
    return report;


};

// const target = Number(process.argv[2]);
// const hours: number[] = process.argv.slice(3).map(el => Number(el));

// console.log(calculateExercises(hours, target));

export default calculateExercises;

