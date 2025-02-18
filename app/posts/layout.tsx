import Heading from "@/components/heading";
export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Heading>Posts page</Heading>
      {children}
    </div>

  );
}
