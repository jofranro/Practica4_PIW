import { NextPage } from "next";
import Character from "@/components/Character";


const Page: NextPage<{ id: string }> = ({ id }) => {
  return (
    <>
      <Character />
    </>
  );
};

export default Page;