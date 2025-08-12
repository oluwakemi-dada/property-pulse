import { Property } from '@/types';

export const serializeProperty = (leanDocument: any): Property => {
  return {
    ...leanDocument,
    _id: leanDocument._id.toString(),
    owner: leanDocument.owner.toString(),
    createdAt:
      leanDocument.createdAt instanceof Date
        ? leanDocument.createdAt.toISOString()
        : leanDocument.createdAt,
    updatedAt:
      leanDocument.updatedAt instanceof Date
        ? leanDocument.updatedAt.toISOString()
        : leanDocument.updatedAt,
  };
};

export const serializeProperties = (leanDocuments: any[]): Property[] => {
  return leanDocuments.map(serializeProperty);
};
