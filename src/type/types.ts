export interface Card {
  id: number;
  uta_num: number;
  author: string;
  kamino_ku_kana: string;
  shimono_ku_kana: string;
  kimariji_kana: string;
  kimariji_len: number;
  group_name: string | null;
  tomofuda_info: string | null;
}

export interface User {
  id: string;
  email: string;
  password: string;
  nickname: string | null;
}

export interface UserFront {
  id: string;
  email: string;
  nickname?: string | null;
}

export interface WearkCard {
  id: number;
  user_id: number;
  card_id: number;
}

export interface QuizDataProps {
  question: Card;
  options: Card[];
}
