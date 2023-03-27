interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
  // return (
  //   <div className="mx-auto flex flex-col space-y-4">
  //     <div className="container">
  //       <main className="flex w-full flex-1 flex-col overflow-hidden">
  //         {children}
  //       </main>
  //     </div>
  //   </div>
  // );
}
