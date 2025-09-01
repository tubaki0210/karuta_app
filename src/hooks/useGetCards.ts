"use client";
import { Card } from "@/type/types";
import useSWR from "swr";

const useGetCards = () => {
  const cardfetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.cards);

  const {
    data: cards,
    isLoading,
    error,
  } = useSWR<Card[]>("/api/cards", cardfetcher);
  return {
    cards,
    isLoading,
    error,
  };
};

export default useGetCards;
