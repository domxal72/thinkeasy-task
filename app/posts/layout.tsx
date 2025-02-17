
export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Posts page</h1>
      {children}
    </div>

  );
}
