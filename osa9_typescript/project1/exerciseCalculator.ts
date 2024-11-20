interface ExerciseValues {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  feedback: string
}

interface Arguments {
  values: number[],
  target: number
}

const parseArgs = (args: string[]): Arguments => {
  const target = Number(args[2]);
  if (isNaN(target) || target < 0) {
    throw new Error('Invalid target value');
  }
  const values: number[] = args.map(Number).slice(3);
  if (values.find(v => isNaN(v)) === undefined) {
    return { values, target };
  } else {
    throw new Error('Provided invalid value.');
  }
};

export const calculateExercises = (args: number[], target: number): ExerciseValues => {
  const trainingDays: number[] = args.filter(a => a !== 0);
  const sum: number = args.reduce((a, value) => a + value, 0);
  const average: number = sum / args.length;
  const rating = (): number => {
    if (average < target) {
      return 1;
    } else if (average < target + 0.3) {
      return 2;
    } else if (average >= target + 0.3) {
      return 3;
    } else {
      throw new Error('Unable to calculate rating by given values');
    }
  };
  const feedback = (): string => {
    if (rating() === 1) {
      return "You did not reach your goal. Get back to work!";
    } else if (rating() === 2) {
      return "Good job! You reached your target.";
    } else if (rating() === 3) {
      return "Awesome! You exceeded your goal by far";
    } else {
      throw new Error('Unable to give feedback by given values');
    }
  };
  return {
    periodLength: args.length,
    trainingDays: trainingDays.length,
    target: target,
    average: average,
    success: average < target ? false : true,
    rating: rating(),
    feedback: feedback()
  };
};
if (require.main === module) {
  try {
    const { values, target } = parseArgs(process.argv);
    console.log(calculateExercises(values, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}