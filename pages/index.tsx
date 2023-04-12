import { getTest } from "@/redux/testSlice/slice";
import { useAppDispatch } from "@/core/store";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  const data = {
    email: "string",
  };

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getTest(data));
  // }, []);

  return (
    <>
      <Head>
        <title>WorkEase</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Apuca-te de Treaba Simona!!</div>
      <div>OKKK!!</div>
    </>
  );
}
