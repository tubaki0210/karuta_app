export interface Card {
  id: number;
  uta_num: number;
  kamino_ku_kana: string;
  shimono_ku_kana: string;
  kimariji_kana: string;
  kimariji_len: number;
  group_name: string | null;
  tomofuda_info: string | null;
}

// export interface KarutaFieldCard {
//   id: number;
//   uta_num: number;
//   kamino_ku_kana: string;
//   shimono_ku_kana: string;
//   kimariji_kana: string;
//   kimariji_len: number;
//   group_name: string | null;
//   tomofuda_info: string | null;
//   is_visible: boolean;
// }

export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string | null;
}

export interface UserFront {
  id: number;
  email: string;
  nickname: string | null;
}

export interface WearkCard {
  id: number;
  user_id: number;
  card_id: number;
}
