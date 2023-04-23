import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <div>settings</div>
      </>
    </ProtectedRoute>
  );
}
