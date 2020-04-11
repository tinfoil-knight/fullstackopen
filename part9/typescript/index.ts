import express from 'express';
import bodyParser from 'body-parser';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

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

app.post('/exercises', (req, res) => {
    const body = req.body;
    if (!body.daily_exercises || !body.target) {
        res.json({ "error": "parameters missing" });
    }
    try {
        res.json(calculateExercises(body.daily_exercises, body.target));
    }
    catch (error) {
        console.log(error.message);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});