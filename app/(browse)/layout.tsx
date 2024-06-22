import { Suspense } from "react";
import Container from "./_components/Container";
import NavBar from "./_components/Navbar";
import SideBar, { SideBarSkeleton } from "./_components/SideBar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
