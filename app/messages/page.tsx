import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase"; 
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import ChatClient from "./ChatClient";
import { authOptions } from "@/lib/auth";

export default async function Messages() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");
  
  // 1. Fetch Current User from Firestore
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", session.user.email), limit(1));
  const userSnap = await getDocs(q);

  if (userSnap.empty) redirect("/login");
  
  // FIX: Select the first document in the array
const userDoc = userSnap.docs[0];

if (!userDoc) {
  throw new Error("User document not found");
}

const currentUser = {
  id: userDoc.id,
  ...userDoc.data(),
};

  // 2. Fetch All Users
  const allUsersSnap = await getDocs(collection(db, "users"));
  const users = allUsersSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((user: any) => user.id !== currentUser.id);

  return <ChatClient currentUser={currentUser} allUsers={users} />;
}