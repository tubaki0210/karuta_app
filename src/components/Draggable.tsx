// // App.tsx
// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   DndContext,
//   useDraggable,
//   DragEndEvent,
//   UniqueIdentifier,
// } from "@dnd-kit/core";
// import DroppableZone from "@/components/DroppableZone";
// import useGetCards from "@/hooks/useGetCards";
// import { Card } from "@/type/types";
// import ShimonokuCard from "@/components/ShimonokuCard";

// // DraggableItem: ドラッグする要素のコンポーネント
// interface DraggableItemProps {
//   card: Card;
//   isLocked: boolean;
//   onCardClick: (card: Card) => void;
// }
// function DraggableItem({ card, isLocked, onCardClick }: DraggableItemProps) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: `card-${card.id}`, // 一意のID
//     disabled: isLocked,
//   });

//   // transformはドラッグ中のみ適用される
//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined;

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className="draggable w-full h-full flex items-center justify-center cursor-grab text-[15px]"
//       onClick={() => {
//         if (isLocked) {
//           onCardClick(card);
//         }
//       }}
//     >
//       <ShimonokuCard card={card} isVisible={true} />
//     </div>
//   );
// }

// // Main Component
// // 25個のゾーンIDを作成
// const zoneIds = Array.from({ length: 36 }, (_, i) => (i + 1).toString());
// // 初期位置用の特別なID
// const INITIAL_ZONE_ID = "initial-zone";

// export default function App() {
//   // アイテムがどのゾーンにあるかを管理するstate
//   const [parent, setParent] = useState<UniqueIdentifier>(INITIAL_ZONE_ID);

//   // { 'card-1': 'init-1', 'card-2': 'init-2', ... } のような形式
//   const [cardPositions, setCardPositions] = useState<
//     Record<string, UniqueIdentifier>
//   >({});
//   const [isLocked, setIsLocked] = useState(false);

//   const { cards, isLoading, error } = useGetCards();
//   const hands = useMemo(() => cards?.slice(0, 10), [cards]);
//   // データが読み込まれたら、カードの初期位置を設定する
//   useEffect(() => {
//     if (hands) {
//       const initialPositions: Record<string, UniqueIdentifier> = {};
//       hands.forEach((hand) => {
//         const cardId = `card-${hand.id}`;
//         const initialZoneId = `init-${hand.id}`;
//         initialPositions[cardId] = initialZoneId;
//       });
//       setCardPositions(initialPositions);
//     }
//   }, [hands]); // handsが変更されたときに一度だけ実行

//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event;

//     // ドロップ先がない、または同じ場所なら何もしない
//     if (!over || active.id === over.id) {
//       return;
//     }

//     // ドロップ先が初期ゾーンの場合のチェック
//     // const isOverInitialZone = over.id.toString().startsWith("init-");
//     // if (isOverInitialZone) {
//     //   // ドラッグされたカードに対応する正しい初期ゾーンIDを生成
//     //   const cardIdNumber = active.id.toString().split("-")[1];
//     //   const correctInitialZoneId = `init-${cardIdNumber}`;

//     //   // もしドロップ先が、そのカードの正しい初期ゾーンでなければ、移動をキャンセル
//     //     if (over.id !== correctInitialZoneId) {
//     //       return;
//     //     }
//     // }

//     setCardPositions((prev) => {
//       const newPositions = { ...prev };
//       const activeId = active.id as string;
//       const overId = over.id;

//       // ドロップ先のゾーンに既に存在しているカードを探す
//       const cardInOverZone = Object.keys(newPositions).find(
//         (key) => newPositions[key] === overId
//       );

//       // ドラッグされたカードの元のゾーンを取得
//       const originalZoneOfActiveCard = newPositions[activeId];

//       // ドラッグされたカードの位置をドロップ先のゾーンIDで更新
//       newPositions[activeId] = overId;

//       // もしドロップ先が他のカードで占有されていた場合、
//       // そのカードをドラッグされたカードの元の位置に移動させる（スワップ）
//       if (cardInOverZone) {
//         newPositions[cardInOverZone] = originalZoneOfActiveCard;
//       }

//       return newPositions;
//     });
//   }

//   // ★★★ 変更点：カードがクリックされたときの処理 ★★★
//   const handleCardClick = (clickedCard: Card) => {
//     // ここでクリックされたカードに対する任意の処理を実行できる
//     console.log("Clicked card:", clickedCard);
//     alert(`クリックされたカード: ${clickedCard.kamino_ku_kana}`);
//   };

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       <div className="p-7 mx-auto space-y-8">
//         <button
//           className="px-4 py-1 bg-green-300 text-white"
//           onClick={() => setIsLocked((prev) => !prev)}
//         >
//           配置を確定する
//         </button>
//         {/* 1. 初期位置用のドロップゾーン */}
//         <div className="grid grid-cols-10 gap-2">
//           {hands?.map((hand) => {
//             const initialZoneId = `init-${hand.id}`;

//             // ★★★ 変更点：この初期ゾーンにどのカードがあるかを探す ★★★
//             const cardInInitialZoneId = Object.keys(cardPositions).find(
//               (key) => cardPositions[key] === initialZoneId
//             );
//             const cardObject = cardInInitialZoneId
//               ? hands?.find((h) => `card-${h.id}` === cardInInitialZoneId)
//               : null;

//             return (
//               <div
//                 key={initialZoneId}
//                 className="w-[100px] h-[150px] p-0.5 border border-blue-300"
//               >
//                 <DroppableZone id={initialZoneId}>
//                   {/* このゾーンにカードオブジェクトがあれば表示 */}
//                   {cardObject ? (
//                     <DraggableItem
//                       card={cardObject}
//                       isLocked={isLocked}
//                       onCardClick={handleCardClick}
//                     />
//                   ) : (
//                     "ここにドロップして戻す"
//                   )}
//                 </DroppableZone>
//               </div>
//             );
//           })}
//         </div>

//         {/* 2. 25個のドロップゾーン */}
//         <div className="grid grid-cols-12 gap-3">
//           {zoneIds.map((zoneId) => {
//             // このゾーンにどのカードがあるかを探す (IDを取得)
//             const cardInZoneId = Object.keys(cardPositions).find(
//               (key) => cardPositions[key] === zoneId
//             );

//             // 見つかったカードIDに対応するカードオブジェクトをhandsから探す
//             const cardObject = cardInZoneId
//               ? hands?.find((h) => `card-${h.id}` === cardInZoneId)
//               : null;

//             return (
//               <div className="w-[100px] h-[150px] p-1" key={zoneId}>
//                 <DroppableZone id={zoneId}>
//                   {/* このゾーンにカードオブジェクトがあれば表示 */}
//                   {cardObject ? (
//                     <DraggableItem
//                       card={cardObject}
//                       isLocked={isLocked}
//                       onCardClick={handleCardClick}
//                     />
//                   ) : null}
//                 </DroppableZone>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </DndContext>
//   );
// }
