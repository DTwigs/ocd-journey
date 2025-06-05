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

export type ReminderTime = {
  hours: number; // 24 hour time
  minutes: number;
};
