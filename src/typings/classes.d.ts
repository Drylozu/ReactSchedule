interface Lesson {
    name: string;
    url: string;
}

type Lessons = Record<string, Lesson>;