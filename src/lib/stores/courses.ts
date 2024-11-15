import { SchemaType } from "@google/generative-ai";

export type Course = {
  title: string;
  background: string;
  lessons: Lesson[];
};

export type Lesson = {
  title: string;
  index: number,
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

// This will be used from prompting Gemini
export const questionTypeSchema = {
  description: 'Schema for a choice question',
  type: SchemaType.OBJECT,
  properties: {
    type: {
      type: SchemaType.STRING,
      description: "The type of the object is Choice Question",
      enum: ['Question'],
      nullable: false
    },
    title: {
      type: SchemaType.STRING,
      description: 'The question being asked',
      nullable: false
    },
    choices: {
      type: SchemaType.ARRAY,
      description: 'Array of incorrect answers to the question which contains one right answer',
      items: {
        type: SchemaType.STRING,
        description: 'A possible answer',
        nullable: false
      },
      nullable: false
    },
    answer: {
      type: SchemaType.NUMBER,
      description: 'The index of the correct answer in the choices array',
      nullable: false
    },
    explanation: {
      type: SchemaType.STRING,
      description: 'Explanation for the correct answer',
      nullable: false
    },
    skip: {
      type: SchemaType.BOOLEAN,
      description: 'Indicates if the question can be skipped',
      nullable: false
    },
    index: {
      type: SchemaType.NUMBER,
      description: 'Just a random number',
      nullable: false
    }
  },
  required: ['type', 'title', 'choices', 'answer', 'explanation', 'skip', 'index']
};

export const trueFalseSchema = {
  description: "Schema for a True/False question type",
  type: SchemaType.OBJECT,
  properties: {
    type: {
      type: SchemaType.STRING,
      description: "The type of the object, always 'Question'",
      enum: ["TrueFalse"],
      nullable: false,
    },
    title: {
      type: SchemaType.STRING,
      description: "The title of the question set",
      nullable: false,
    },
    questions: {
      type: SchemaType.ARRAY,
      description: "Array of individual true/false questions",
      items: {
        type: SchemaType.STRING,
        description: "An individual true/false question",
        nullable: false,
      },
      nullable: false,
    },
    answers: {
      type: SchemaType.ARRAY,
      description: "Array of answers, represented as 0 (False) or 1 (True), corresponding to a questions of the same index on the questions array",
      items: {
        type: SchemaType.NUMBER,
        description: "Answer for the corresponding question: 0 for False, 1 for True, corresponding to a question of the same index on the questions array",
        nullable: false,
      },
      nullable: false,
    },
    skip: {
      type: SchemaType.BOOLEAN,
      description: "Indicates if the question set can be skipped",
      nullable: false,
    },
    index: {
      type: SchemaType.NUMBER,
      description: "The index of the question set",
      nullable: false,
    },
  },
  required: ["type", "title", "skip", "index", "questions", "answers"],
};

export const pickSchema = {
  description: "Schema for a pick question type",
  type: SchemaType.OBJECT,
  properties: {
    type: {
      type: SchemaType.STRING,
      description: "The type of the object, always 'Question'",
      enum: ["Pick"],
      nullable: false,
    },
    title: {
      type: SchemaType.STRING,
      description: "The text of the question, describing what to pick",
      nullable: false,
    },
    skip: {
      type: SchemaType.BOOLEAN,
      description: "Indicates if the question can be skipped",
      nullable: false,
    },
    index: {
      type: SchemaType.NUMBER,
      description: "The index of the question",
      nullable: false,
    },
    choices: {
      type: SchemaType.ARRAY,
      description: "Array of possible choices for the question",
      items: {
        type: SchemaType.STRING,
        description: "A single choice option",
        nullable: false,
      },
      nullable: false,
    },
    answers: {
      type: SchemaType.ARRAY,
      description:
        "Array of words that are part of the choices array and represent correct answers",
      items: {
        type: SchemaType.STRING,
        description: "A correct answer from the choices array",
        nullable: false,
      },
      nullable: false,
    },
  },
  required: ["type", "title", "skip", "index", "choices", "answers"],
};
