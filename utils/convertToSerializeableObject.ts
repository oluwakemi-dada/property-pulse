/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";

export function convertToSerializeableObject(doc: any): any {
  if (!doc || typeof doc !== "object") return doc;

  if (Array.isArray(doc)) {
    return doc.map(convertToSerializeableObject);
  }

  const newDoc: any = {};
  for (const key of Object.keys(doc)) {
    const value = doc[key];

    if (value === null || value === undefined) {
      newDoc[key] = value;
    } 
    else if (value instanceof ObjectId) {
      newDoc[key] = value.toString();
    } 
    else if (value instanceof Date) {
      newDoc[key] = value.toISOString(); // ✅ Fix: handle Date
    }
    else if (Array.isArray(value)) {
      newDoc[key] = value.map(convertToSerializeableObject);
    } 
    else if (typeof value === "object") {
      newDoc[key] = convertToSerializeableObject(value);
    } 
    else {
      newDoc[key] = value;
    }
  }

  return newDoc;
}



