export type Course = {
	title: string;
	background: string;
	lessons: Lesson[];
};

export type Lesson = {
	title: string;
  index:  number,
  dictionary: string[],
	sections: Section[];
};

export type BasicSection = {
	type: 'Explanation' | 'Question' | 'Pick' | 'Visual' | 'List' | 'Attention' | 'Equation';
	title: string;
  skip: boolean;
	index: number;
};

export type EquationSectionType = BasicSection & {
  equations: string[];
}

export type ExplainSection = BasicSection & {
	text: string;
};

export type TrueOrFalse = BasicSection & {
  questions: string[];
  answers: number[];
}

export type QuestionSectionType = BasicSection & {
	choices: string[];
	answer: number;
	explanation: string;
};

export type PickSectionType = BasicSection & {
  choices: string[];
  answers: string[];
}

export type ListSectionType = BasicSection & {
  list: string[],
}

export type VisualSection = BasicSection & {
  course: string;
}

export type Section = ExplainSection | QuestionSectionType | VisualSection | ListSectionType | PickSectionType | QuestionSection | TrueOrFalse | EquationSectionType;
