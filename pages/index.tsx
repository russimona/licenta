import { ModalAddNewCompany } from "@/components/Modal/ModalCreateCompany/ModalCreateCompany";
import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppSelector } from "@/core/store";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const companyId = useAppSelector((state) => state.loggedUser.user.companyId);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(companyId ? false : true);
  }, [companyId]);
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
        </Head>
        <Navbar />
        <ModalAddNewCompany isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </ProtectedRoute>
  );
}
