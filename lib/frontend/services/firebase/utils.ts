import { DataSnapshot } from 'firebase/database';
export const converSnapShotIntoArray = (snapshot: DataSnapshot): string[] => {
  if (snapshot.exists()) {
    const result = [] as string[];
    snapshot.forEach((element) => {
      result.push(element.val());
    });
    return result;
  }
  return [];
};
