"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
interface ImpersonateUserProps {
  userId: string;
}

export default function ImpersonateUser({ userId }: ImpersonateUserProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleImpersonateUser = async () => {
    try {
      await authClient.admin.impersonateUser({
        userId: userId,
      });
      router.push("/");
      toast({
        title: "Impersonated user",
        description: "You are now impersonating this user",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to impersonate user:", error);
    }
  };

  return (
    <Button onClick={handleImpersonateUser} variant="outline" size="sm">
      Impersonate
    </Button>
  );
}