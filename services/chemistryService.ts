import { ProblemData, Isotope } from '../types';

const ELEMENT_NAMES = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Theta", "Omega"];

export const generateProblemData = (elementNameBase: string, idPrefix: string): ProblemData => {
  // Randomly choose 2 or 3 isotopes
  const numIsotopes = Math.random() > 0.5 ? 2 : 3;
  
  // Base mass number (e.g., between 10 and 200)
  const baseMass = Math.floor(Math.random() * 190) + 10;
  
  const isotopes: Isotope[] = [];
  let remainingPercent = 100;
  let weightedSum = 0;

  for (let i = 0; i < numIsotopes; i++) {
    // Generate Abundance
    let percent: number;
    if (i === numIsotopes - 1) {
      // Last isotope gets the remainder to ensure sum is 100%
      percent = Math.round(remainingPercent * 100) / 100;
    } else {
      // Random chunk of remaining, but leave some room
      const max = remainingPercent - (numIsotopes - i - 1) * 10; 
      const min = 10;
      const rawPercent = (Math.random() * (max - min) + min).toFixed(2);
      percent = parseFloat(rawPercent);
      remainingPercent -= percent;
    }

    // Generate Precise Mass (Mass Number + small random deviation)
    // Mass number increases by 1 or 2 for each isotope
    const massNum = baseMass + (i * (Math.random() > 0.7 ? 2 : 1));
    const deviation = (Math.random() * 0.2) - 0.1; // +/- 0.1
    const preciseMass = (massNum + deviation).toFixed(3);
    
    isotopes.push({
      name: `Element ${elementNameBase}-${massNum}`,
      mass: preciseMass,
      percent: percent.toFixed(2),
      massNum: massNum
    });

    weightedSum += parseFloat(preciseMass) * (percent / 100);
  }

  return {
    id: `problem-${idPrefix}`,
    elementName: `Element ${elementNameBase}`,
    isotopes: isotopes,
    correctAnswer: weightedSum.toFixed(3)
  };
};

export const generateProblemSet = (count: number = 4): ProblemData[] => {
  // Select random names without replacement
  const shuffledNames = [...ELEMENT_NAMES].sort(() => 0.5 - Math.random()).slice(0, count);
  
  return shuffledNames.map((name, index) => generateProblemData(name, index.toString()));
};

export const checkAnswer = (input: string, correctAnswer: string): 'correct' | 'missing_unit' | 'incorrect' => {
  const inputStr = input.trim();
  const inputVal = parseFloat(inputStr);
  const correctVal = parseFloat(correctAnswer);

  if (inputStr === "" || isNaN(inputVal)) {
    return 'incorrect';
  }

  const hasUnit = inputStr.toLowerCase().includes("amu");
  const tolerance = 0.005;

  if (Math.abs(inputVal - correctVal) <= tolerance) {
    return hasUnit ? 'correct' : 'missing_unit';
  }

  return 'incorrect';
};