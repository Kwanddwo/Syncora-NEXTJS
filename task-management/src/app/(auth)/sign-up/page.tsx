import { SignUpForm } from "@/app/(auth)/sign-up/sign-up";

export default function SignUp() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
                    <img src="logo.png" alt="logo" width={150} height={100} className="mb-4" />
                    <SignUpForm />
                </div>
            </div>
        </>

    );
}
