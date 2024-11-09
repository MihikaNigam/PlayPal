export interface Game {
  _id?: string;
  title: string,
  imageUrl: string,
  genre: string,
  releaseDate: Date,
  publisher?: string;
  description?: string;
}
