import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Results, { ResultsSkeleton } from "./_components/results";

interface Props {
  searchParams: {
    term?: string;
  };
}
const SearchPage = ({ searchParams }: Props) => {
  if (!searchParams.term) redirect("/");

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
