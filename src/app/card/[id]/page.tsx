import CardPageRow from "@/components/CardPageRow";
import { FetchCardByIdSupa, FetchCardSupa } from "@/lib/FetchCard";

export const generateStaticParams = async () => {
  const cards = await FetchCardSupa({});
  return cards.map((card) => ({
    id: String(card.uta_num),
  }));
};

interface CardsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CardPage = async ({ params }: CardsPageProps) => {
  const { id } = await params;
  const card = await FetchCardByIdSupa(parseInt(id, 10));
  return (
    <div className="container flex justify-center items-center min-h-screen  mx-auto py-25">
      <div className="w-full bg-white py-15 px-20 rounded-3xl shadow-2xl flex flex-col gap-y-15">
        <h1 className="text-3xl text-center font-bold">歌情報</h1>
        <CardPageRow label="歌番号" content={`${card.uta_num}番`} />
        <CardPageRow label="作者" content={card.author} />
        <CardPageRow
          label="歌"
          content={`${card.kamino_ku_kana}　/　${card.shimono_ku_kana}`}
        />
        <CardPageRow label="決まり字" content={card.kimariji_kana} />
        <CardPageRow label="グループ分け" content={card.group_name} />
        <CardPageRow label="友札" content={card.tomofuda_info} />
      </div>
    </div>
  );
};

export default CardPage;
