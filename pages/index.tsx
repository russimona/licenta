import { ModalAddNewCompany } from "@/components/Modal/ModalCreateCompany/ModalCreateCompany";
import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const companyId = useAppSelector((state) => state.loggedUser.user.companyId);
  const companyIdState = useAppSelector((state) => state.loggedUser.status);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLoggedUserData());
  }, [dispatch]);

  useEffect(() => {
    if (companyIdState === ReduxThunkStatuses.FULFILLED) {
      setIsOpen(companyId ? false : true);
    }
  }, [companyId, companyIdState]);
  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>WorkEase</title>
          <meta
            name="description"
            title="WorkEase"
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
