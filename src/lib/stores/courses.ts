type Course = {
	title: string;
	background: string;
	lessons: Lesson[];
};

type Lesson = {
	title: string;
	sections: Section[];
};

type BasicSection = {
	type: 'Explanation' | 'Question' | 'Visualization';
	title: string;
	index: number;
};

type ExplainSection = BasicSection & {
	text: string;
};

type QuestionSection = BasicSection & {
	choices: string[];
	answer: number;
	explanation: string;
};

type Section = ExplainSection | QuestionSection;
