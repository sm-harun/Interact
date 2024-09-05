import { doc, collection, setDoc, deleteDoc, getDoc, DocumentReference } from 'firebase/firestore';
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

export async function renameDocument(oldDocRef: DocumentReference, newDocName: string) {
	try {
		// Get the data from the old document
		const oldDocSnapshot = await getDoc(oldDocRef);

		if (!oldDocSnapshot.exists()) {
			throw new Error('Document does not exist.');
		}

		// Create ref for the new doc
		const newDocRef = doc(DataBase, oldDocRef.parent.path, newDocName);

		// Set the old data to the new doc
		await setDoc(newDocRef, oldDocSnapshot.data());

		// Delete old doc.
		await deleteDoc(oldDocRef);

		console.log(`Document renamed successfully from ${oldDocRef.id} to ${newDocName}`);
	} catch (error) {
		console.error('Error renaming document:', error);
	}
}
