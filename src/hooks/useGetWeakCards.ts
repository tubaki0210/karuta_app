import { Card, UserFront } from "@/type/types";
import useSWR from "swr";

const weakcardfetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.weak_cards);

const useGetWeakCards = (user: UserFront) => {
  const { data: weak_cards, mutate: WeakMutate } = useSWR<Card[]>(
    user ? `/api/cards/user/${user.id}` : null,
    weakcardfetcher
  );

  return {
    weak_cards,
    WeakMutate,
  };
};

export default useGetWeakCards;
