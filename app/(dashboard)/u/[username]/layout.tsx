import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React from "react";
import NavBar from "../../../../components/dashboard/navbar";
import Sidebar from "../../../../components/dashboard/sidebar";
import Container from "../../../../components/dashboard/container";

interface Props {
  params: { username: string };
  children: React.ReactNode;
}
const CreatorLayout = async ({ params, children }: Props) => {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");

  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
