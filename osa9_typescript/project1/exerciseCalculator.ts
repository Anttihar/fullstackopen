interface ExerciseValues {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  feedback: string
}

const calculateExercises = (args: number[]): ExerciseValues => {
  const trainingDays: number[] = args.filter(a => a !== 0)
  const sum: number = args.reduce((a, value) => a + value, 0)
  const average: number = sum / 7
  const rating = (): number => {
    if (average < 1.5) {
      return 1
    } else if (average < 1.8) {
      return 2
    } else if (average >= 1.7) {
      return 3
    }
  }
  const feedback = () => {
    if (rating() === 1) {
      return "You didnt reach your goal. Get back to work!"
    } else if (rating() === 2) {
      return "Good job! You reached your target."
    } else if (rating() === 3) {
      return "Awesome! You exceeded your goal by far"
    }
  }
  return {
    periodLength: args.length,
    trainingDays: trainingDays.length,
    target: 1.5,
    average: average,
    success: average < 1.5 ? false : true,
    rating: rating(),
    feedback: feedback()
  }
}

console.log(calculateExercises([1, 8, 0, 2, 0, 1, 4]))