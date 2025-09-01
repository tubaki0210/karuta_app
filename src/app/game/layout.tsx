// レイアウトコンポーネントの定義
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // childrenの型を定義
}) {
  return <div className="bg-green-100">{children}</div>;
}
