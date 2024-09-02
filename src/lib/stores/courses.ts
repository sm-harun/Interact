type Course = {
	title: string;
	background: string;
	lessons: Lesson[];
};

type Lesson = {
	title: string;
	sections: (Section | choiceSection)[];
};

type Section = {
	type: string;
	text: string;
};

type choiceSection = Section & {
	choices: string[];
	answer: number;
	explanation: string;
};
