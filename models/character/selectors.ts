import { LEVEL_DENOMINATOR } from "@/constants/Level";

type GetLevelReturnType = {
  calculatedLevel: number;
  levelPercent: number;
};

export const getLevelProgress = (
  charLevel: number = 1,
  totalResists: number = 0,
): GetLevelReturnType => {
  const level: number = getCurrentLevel(totalResists);
  const expNeeded: number = charLevel * LEVEL_DENOMINATOR;
  const pastLevelExp = sumLevels(charLevel - 1) * LEVEL_DENOMINATOR;
  const currentLevelsResists: number = totalResists - pastLevelExp;

  return {
    calculatedLevel: level,
    levelPercent: Math.ceil((currentLevelsResists / expNeeded) * 100),
  };
};

const sumLevels = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  return n === 1 ? 1 : n + sumLevels(n - 1);
};

const getCurrentLevel = (totalResists: number = 0): number => {
  const fives = Math.floor(totalResists / LEVEL_DENOMINATOR);
  let currentLevel = 1;

  if (fives < 1) {
    return currentLevel;
  }

  while (true) {
    currentLevel += 1;
    if (sumLevels(currentLevel) > fives) {
      break;
    }
  }

  return currentLevel;
};
