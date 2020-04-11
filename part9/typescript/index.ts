import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(weight) || isNaN(height)) {
        res.json({ error: "malformatted parameters" });
    }
    else {
        try {
            res.send(calculateBmi(height, weight));
        }
        catch (error) {
            console.log(error);
        }

    }


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});