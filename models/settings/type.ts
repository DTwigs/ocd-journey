export type Factors = {
  factor1: {
    name: string;
  };
  factor2: {
    name: string;
  };
};

export type Settings = {
  factors: Factors;
  darkMode?: boolean;
  isOnboarding: boolean;
};
