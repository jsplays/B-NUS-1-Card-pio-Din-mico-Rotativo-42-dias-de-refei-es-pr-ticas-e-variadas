export type MealType = 'cafe' | 'lancheManha' | 'almoco' | 'lancheTarde' | 'jantar';

export interface Meal {
  title: string;
  category: string;
}

export interface DayPlan {
  day: number;
  week: number;
  cafe: string;
  lancheManha: string;
  almoco: string;
  lancheTarde: string;
  jantar: string;
  completed?: boolean;
}

export interface WeekInfo {
  week: number;
  theme: string;
  objective: string;
  highlightTitle?: string;
  highlightItems?: string[];
  days: number[]; // e.g. [1, 2, 3, 4, 5, 6, 7]
}

export interface ShoppingCategory {
  id: string;
  name: string;
  items: string[];
}

export interface Recipe {
  id: string;
  title: string;
  time: string;
  ingredients: string[];
  instructions: string;
  category: string;
}

export interface ReflectionAnswers {
  q1: string; // Qual refeição ficou mais fácil de organizar?
  q2: string; // Qual alimento você passou a consumir mais?
  q3: string; // Qual preparo deseja repetir?
  q4: string; // O que dificultou sua rotina?
  q5: string; // Quais cinco hábitos você deseja manter?
  savedAt?: string;
}
