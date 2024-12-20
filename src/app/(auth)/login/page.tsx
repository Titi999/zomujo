import { LoginSlide } from '@/assets/images';
import AuthenticationFrame from '@/app/(auth)/_components/authenticationFrame';
import { LoginForm } from '@/app/(auth)/_components/loginForm';

function Login() {
  return (
    <AuthenticationFrame imageSlide={LoginSlide} imageAlt="Login">
      <LoginForm />
    </AuthenticationFrame>
  );
}

export default Login;
