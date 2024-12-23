import { auth } from "@/server/auth";
import { HeaderClient } from "./HeaderClient";


const HeaderServer = async () => {
  const session = await auth();
  const prefetchedUser = session?.user;

  return <HeaderClient prefetchedUser={prefetchedUser} />;
}   

export  {HeaderServer};
