import { LoginForm } from "@/components/loginForm";
import { SignUpForm } from "@/components/signupForm";
import { useAppDispatch } from "@/core/store";

export default function Home() {
  const data = {
    email: "string",
  };

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
