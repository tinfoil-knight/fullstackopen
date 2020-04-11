interface Report {
    periodLength: number,
    trainingDays: number
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const ratingDescriptor = (rating: number): string => {
    switch (rating) {
        case 1:
            return "You need a lot of improvement"
            break;
        case 2:
            return "Not bad but can be better"
            break;
        case 3:
            return "You are doing great"
            break;
        default:
            return "Error in rating"
    }
}



const calculateExercises = (hours: number[], target: number): Report => {
    const targetHours = target * hours.length
    const noZeroDays = hours.filter(el => el !== 0)
    const totalHours = hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const rawScore = (totalHours) / (targetHours)
    const rating = (rawScore <= 1) ? Math.floor(rawScore * (3 - 1 + 1)) + 1 : 3

    const report = {
        periodLength: hours.length,
        trainingDays: noZeroDays.length,
        success: (hours.length === noZeroDays.length) && (totalHours >= targetHours),
        rating: rating,
        ratingDescription: ratingDescriptor(rating),
        target: target,
        average: Math.round((totalHours / hours.length) * 100) / 100
    }
    return report
}