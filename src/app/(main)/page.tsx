
import { getUserAction } from "@/server/actions/user.actions";

import { Menu } from "@/components/features/menu";
import { SubHeader } from "@/components/layout/subheader";

export default  async function Home() {
  const user = await getUserAction()

  return (
    <>
      <SubHeader user={user.data} />
      <Menu />
    </>
  );
}

