import { getAllUsersAction } from "@/server/actions/user.actions";
import { getUserAction } from "@/server/actions/user.actions";

import UsersTable from "@/components/features/admin/UsersTable";

export default async function UsersPage() {
  const users = await getAllUsersAction();
  const adminUser = await getUserAction()

  return (
    <div>
      <UsersTable adminUser={adminUser!}
        users={users}
      />
    </div>
  )
}

