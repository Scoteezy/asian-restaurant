
import { getUserAction } from "@/server/actions/user.actions";
import { redirect } from "next/navigation";

import { UserAdditional } from "@/components/features/profile";
import { UserInfo } from "@/components/features/profile/UserInfo";

export default async function ProfilePage() {
  const user = await getUserAction()

  if(!user.success || !user.data) {
    redirect('/')
  }

  return (
    <div className="wrapper h-screen">
      <div className="flex gap-4">
        <UserInfo prefetchedUser={user.data}/>
        <UserAdditional prefetchedUser={user.data}/>
      </div>
    </div>
  );
}
