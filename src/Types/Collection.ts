export interface collectionUserInput {
  name: string;
  description: string;
  columns?: string[];
}

export interface collectionDetails extends collectionUserInput {
  collection_id: string;
  createdAt: Date;
}

export interface createCollectionPayload {
  title: string;
  description: string;
}
