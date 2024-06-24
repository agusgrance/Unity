// React
import { Suspense } from "react";

// Components
import Container from "@/components/browse/container";
import NavBar from "@/components/browse/navbar";
import SideBar, { SideBarSkeleton } from "@/components/browse/sideBar";

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
