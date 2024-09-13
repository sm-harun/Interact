export type Course = {
	title: string;
	background: string;
	lessons: Lesson[];
};

export type Lesson = {
	title: string;
	sections: Section[];
};

export type BasicSection = {
	type: 'Explanation' | 'Question' | 'Pick' | 'Visual' | 'List' | 'Attention';
	title: string;
	index: number;
};

export type ExplainSection = BasicSection & {
	text: string;
};

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
