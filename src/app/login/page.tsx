'use client';
import { useFormState } from 'react-dom';

import { login, signup } from './actions';

export default function LoginPage() {
  const [state, formAction] = useFormState(login, { message: [] });
  const [signupState, signupAction] = useFormState(signup, { message: [] });

  return (
    <form className='p-8 grid gap-2'>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button formAction={formAction}>Log in</button>
      <button formAction={signupAction}>Sign up</button>
      {state.message.map((msg) => (
        <p key={msg} className='text-red-400'>
          {msg}
        </p>
      ))}
      {signupState.message.map((msg) => (
        <p key={msg} className='text-red-400'>
          {msg}
        </p>
      ))}
    </form>
  );
}
