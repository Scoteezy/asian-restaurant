
import { UserAdditional } from "@/components/features/profile";
import { UserInfo } from "@/components/features/profile/UserInfo";
import { getUserAction } from "@/server/actions/user.actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getUserAction()
    if(!user) {
        redirect('/')
    }
    const prefetchedUser = user;
  return <div className="wrapper h-screen">
    <div className="flex gap-4">
      <UserInfo prefetchedUser={prefetchedUser}/>
      <UserAdditional prefetchedUser={prefetchedUser}/>
    </div>
  </div>;
}
