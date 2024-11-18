interface Values {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided invalid value');
  }
};

export const calculateBmi = (h: number, w: number): string => {
  const bmi: number = w / ((h / 100) ** 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi < 30) {
    return'Overweight';
  } else if (bmi >= 30) {
    return'Obese';
  } else {
    throw new Error('Could not calculate BMI with given values');
  }
};
if (require.main === module) {
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
}