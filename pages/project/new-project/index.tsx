import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddProjectPage from "@/components/Project/add-project/AddProjectPage";

function App() {
  return (
    <ProtectedRoute>
      <AddProjectPage />
    </ProtectedRoute>
  );
}

export default App;
