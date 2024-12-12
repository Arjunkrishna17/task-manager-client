export interface collectionUserInput {
  name: string;
  descriptiion: string;
  columns?: string[];
}

export interface collectionDetails extends collectionUserInput {
  collection_id: string;
  createdAt: Date;
}
