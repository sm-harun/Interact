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

export type QuestionSection = BasicSection & {
	choices: string[];
	answer: number;
	explanation: string;
};

export type PickSection = BasicSection & {
  choices: string[];
  answers: string[];
}

export type ListSection = BasicSection & {
  list: string[],
}

export type VisualSection = BasicSection & {
  course: string;
}

export type Section = ExplainSection | QuestionSection;
