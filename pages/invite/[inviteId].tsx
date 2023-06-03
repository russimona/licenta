import React from "react";
import { useRouter } from "next/router";
import { InviteNewMemberForm } from "@/components/inviteNewMember/inviteNewMemberForm";

function App() {
  const router = useRouter();
  const { inviteId } = router.query;
  return (
    <div>
      <InviteNewMemberForm />
    </div>
  );
}

export default App;
