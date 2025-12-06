import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { cookies } from "next/headers";

import { ClientTime } from "./client-time";

async function CachedPart({ test }: { test: string }) {
  "use cache";
  
  cacheLife({ stale: 5, revalidate: 25, expire: 10000 });
  const revalidateStateDate = new Date();
  console.log("revalidate start time:", revalidateStateDate.toISOString());
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const revalidateEndDate = new Date();
  console.log("revalidate end time:", revalidateEndDate.toISOString());

  return (
    <>
      Test cookie: {test}
      <br />
      Revalidate start time:
      {revalidateStateDate.toISOString()}
      <br />
      Revalidate end time:
      {revalidateEndDate.toISOString()}
      <br />
      Client time:
      <ClientTime />
    </>
  )
}

async function Container() {
  const cookiesStore = await cookies();

  return (
    <CachedPart test={cookiesStore.get("test")?.value ?? ""} />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container />
    </Suspense>
  );
}
