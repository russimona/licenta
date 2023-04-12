import { LoginForm } from "@/components/loginForm";
import { useAppDispatch } from "@/core/store";

export default function Home() {
  const data = {
    email: "string",
  };

  return (
    <div>
      <LoginForm />
    </div>
  );
}
