import { Loader2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { getAllUsersAction } from "@/server/actions/user.actions";
import { getUserAction } from "@/server/actions/user.actions";

import UsersTable from "@/components/features/admin/UsersTable";

export default async function UsersPage() {
  const users = await getAllUsersAction();
  const adminUser = await getUserAction()

  if(!users.success || !adminUser.success || !users.data || !adminUser.data) {
    toast({
      title: "Ошибка при получении данных",
      description: "Попробуйте позже",
    })
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <UsersTable adminUser={adminUser.data}
        users={users.data}
      />
    </div>
  )
}

