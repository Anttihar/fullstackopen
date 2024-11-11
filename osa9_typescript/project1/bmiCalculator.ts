const calculateBmi = (a: number, b: number): string => {
  const bmi: number = b / ((a / 100) ** 2)
  console.log(bmi)
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Norman range'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30) {
    return 'Obese'
  }
} 

console.log(calculateBmi(185, 0))