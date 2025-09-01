import { useDroppable } from "@dnd-kit/core";
import React from "react";
// DroppableZone: ドロップ先の枠のコンポーネント
interface DroppableZoneProps {
  id: string;
  children: React.ReactNode;
}
const DroppableZone = ({ id, children }: DroppableZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id, // それぞれの枠に一意のID
  });

  const style = {
    backgroundColor: isOver ? "lightgreen" : "#eee", // ドラッグ中に対象枠の色を変更
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable w-full h-full">
      {children}
    </div>
  );
};
export default DroppableZone;
