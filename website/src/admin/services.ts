// Write-side Firebase access for the back-office only (keeps auth/storage out of the public bundle).
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getApp, getDb } from '../lib/firebase';
import type { AboutContent, Gig, MusicLink } from '../lib/types';

const auth = () => getAuth(getApp()!);
const db = () => getDb()!;
const storage = () => getStorage(getApp()!);

export const watchUser = (cb: (u: User | null) => void) => onAuthStateChanged(auth(), cb);
export const login = (email: string, password: string) => signInWithEmailAndPassword(auth(), email, password);
export const logout = () => signOut(auth());

// Shrinks phone photos to max 1600px JPEG before upload (fast site, cheap storage).
async function compress(file: File, maxSide = 1600, quality = 0.85): Promise<Blob> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file;
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((res, rej) => canvas.toBlob(b => (b ? res(b) : rej(new Error('compress failed'))), 'image/jpeg', quality));
}

export async function uploadImage(folder: 'gigs' | 'about', file: File) {
  const blob = await compress(file);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const r = ref(storage(), path);
  await uploadBytes(r, blob, { contentType: 'image/jpeg' });
  return { imageUrl: await getDownloadURL(r), imagePath: path };
}

export async function removeImage(path?: string) {
  if (!path) return;
  try { await deleteObject(ref(storage(), path)); } catch (e) { console.warn('image delete skipped', e); }
}

export async function createGig(data: Omit<Gig, 'id'>) {
  await addDoc(collection(db(), 'gigs'), { ...data, createdAt: serverTimestamp() });
}
export async function updateGig(id: string, data: Partial<Gig>) {
  const { id: _omit, ...rest } = data; void _omit;
  await updateDoc(doc(db(), 'gigs', id), { ...rest, updatedAt: serverTimestamp() });
}
export async function deleteGig(gig: Gig) {
  await deleteDoc(doc(db(), 'gigs', gig.id));
  await removeImage(gig.imagePath);
}

export const saveLinks = (items: MusicLink[]) => setDoc(doc(db(), 'site', 'links'), { items });
export const saveAbout = (about: AboutContent) => setDoc(doc(db(), 'site', 'about'), about);
