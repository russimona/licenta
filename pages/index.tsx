import { ModalCongrats } from "@/components/Modal/ModalCreateCompany/ModalCreateCompany";
import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>WorkEase</title>
          <meta
            name="description"
            content="Streamline your work, simplify your life"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link rel="icon" href="/weLogo.png" /> */}
        </Head>
        <Navbar />
        <ModalCongrats isOpen={isOpen} setIsOpen={setIsOpen} />
        <div>Apuca-te de Treaba Simona!!</div>
        <div>OKKK!!</div>
      </>
    </ProtectedRoute>
  );
}
