import { Navbar } from "@/components/Navbar/navbar";
import { OptionBar } from "@/components/OptionBar/OptionBar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <OptionBar />
        <div>settings</div>
      </>
    </ProtectedRoute>
  );
}
