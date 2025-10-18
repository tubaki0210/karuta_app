import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="flex justify-center items-center min-h-screen">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
