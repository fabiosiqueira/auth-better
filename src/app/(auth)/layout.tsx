import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <div className="h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;