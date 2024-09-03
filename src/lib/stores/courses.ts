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
	type: 'Explanation' | 'Choice' | 'Visualization';
	title: string;
};

type ExplainSection = BasicSection & {
	text: string;
};

type ChoiceSection = BasicSection & {
	choices: string[];
	answer: number;
	explanation: string;
};

type Section = ExplainSection | ChoiceSection;
