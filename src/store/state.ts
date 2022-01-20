import { Question, User } from "./types";

export interface RootState {
  user: User | undefined;
  questions: Question[];
  title: string;
  unsubscribe?: () => void;
}
