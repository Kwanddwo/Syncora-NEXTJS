import { SignUpForm } from "@/app/(auth)/sign-up/sign-up";
import Logo from "@/components/Logo";

export default function SignUp() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <Logo theme={"dark"} isText={true} />
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
