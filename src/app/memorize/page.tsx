import Memorizepage from "@/components/MemorizePage";
import {
  // FetchCard,
  FetchCardSupa,
  // FetchWeakCard,
  FetchWeakCardSupa,
} from "@/lib/FetchCard";
import { getSession } from "@/lib/session"; // 作成した関数をインポート

const MemorizePage = async () => {
  // サーバーサイドでセッション情報を取得
  const session = await getSession();

  // セッションが存在する場合
  if (session && session.user) {
    // userオブジェクトからidを取り出す
    const userId = session.user.id;

    // userオブジェクトからemailを取り出す
    const userEmail = session.user.email;

    // 以下、ユーザーIDに基づいてデータをフェッチする処理
    const allCardsData = FetchCardSupa({});
    const weakCardsData = FetchWeakCardSupa(userId);

    const [allCards, weakCards] = await Promise.all([
      allCardsData,
      weakCardsData,
    ]);
    return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
  } else {
    // セッションが存在しない場合、ログインページにリダイレクトするなど
    const allCardsData = FetchCardSupa({});
    const [allCards] = await Promise.all([allCardsData]);
    return <Memorizepage initCards={allCards} initWeakCards={[]} />;
  }
};

export default MemorizePage;
