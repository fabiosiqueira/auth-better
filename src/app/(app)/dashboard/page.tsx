"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function DashboardPage() {

  const {
    data: session,
    isPending, //loading state
    error //error object
  } = authClient.useSession();

  if (isPending) return <>Loading..</>;
  if (!session) return redirect("/");

  const user = session.user;

  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold underline">Dashboard</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Date: {user.createdAt.toISOString()}</li>
        <li>Date: {user.createdAt.toUTCString()}</li>
      </ul>
      <div>
        {error && error.message}
      </div>
    </div>

  );
}
