import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-row mx-auto mt-10 pt-5 px-4 w-full">
      {children}
    </main>
  );
};

export default AppLayout;