import { LoginSlide } from '@/assets/images';
import AuthenticationFrame, { ImagePosition } from '@/app/(auth)/_components/authenticationFrame';
import LoginForm from '../_components/loginForm';
import { JSX } from 'react';

function Login(): JSX.Element {
  return (
    <AuthenticationFrame
      imageSlide={LoginSlide}
      imageAlt="Login"
      imagePosition={ImagePosition.Left}
    >
      <LoginForm />
    </AuthenticationFrame>
  );
}

export default Login;
