export interface User {
  id: string;
  name: string;
  avatar: string;
}

export type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export interface Question {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}
