import { LoginForm } from "@/components/login-form";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <Logo theme={"dark"} isText={true} />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
