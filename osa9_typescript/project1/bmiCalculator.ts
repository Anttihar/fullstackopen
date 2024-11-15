interface Values {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided invalid value')
  }
}

const calculateBmi = (h: number, w: number) => {
  const bmi: number = w / ((h / 100) ** 2)
  if (bmi < 18.5) {
    console.log('Underweight')
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log('Normal range')
  } else if (bmi >= 25 && bmi < 30) {
    console.log('Overweight')
  } else if (bmi >= 30) {
    console.log('Obese')
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  calculateBmi(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}