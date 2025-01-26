import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-row mx-auto max-w-4xl">
      {children}
    </main>
  );
};

export default AppLayout;