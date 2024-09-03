import { doc, collection } from 'firebase/firestore';
import { DataBase } from './firebase';

export function getCourseColl() {
	return collection(DataBase, 'courses');
}

export function getCourseDoc(docId: string) {
	return doc(getCourseColl(), docId);
}

export function getLessonsColl(courseId: string) {
	return collection(getCourseDoc(courseId), 'Lessons');
}

export function getLessonsDoc(courseId: string, lessonId: string) {
	return doc(getLessonsColl(courseId), lessonId);
}

export function getSectionsColl(courseId: string, lessonId: string) {
	return collection(getLessonsDoc(courseId, lessonId), 'sections');
}

export function getSectionsDoc(courseId: string, lessonId: string, sectionId: string) {
	return doc(getSectionsColl(courseId, lessonId), sectionId);
}
