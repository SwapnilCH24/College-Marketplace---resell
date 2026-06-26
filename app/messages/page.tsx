import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ChatClient from "./ChatClient";
import { authOptions } from "@/lib/auth";

export default async function Messages() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");
  
  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!currentUser) redirect("/login");

  const users = await prisma.user.findMany({ 
    where: { id: { not: currentUser.id } },
    select: { id: true, name: true, department: true }
  });

  return <ChatClient currentUser={currentUser} allUsers={users} />;
}