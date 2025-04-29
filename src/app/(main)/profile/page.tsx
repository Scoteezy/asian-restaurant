
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
    <div className="wrapper ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserInfo prefetchedUser={user.data}/>
        <UserAdditional prefetchedUser={user.data}/>
      </div>
    </div>
  );
}
