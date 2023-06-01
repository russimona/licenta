import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProjectPage from "@/components/Project/ProjectPage";

function App() {
  return (
    <ProtectedRoute>
      <ProjectPage />
    </ProtectedRoute>
  );
}

export default App;
