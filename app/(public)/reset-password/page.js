'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Suspense } from 'react';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      toast.error('Паролі не збігаються');
      return;
    }
    try {
      const result = await axios.post('/api/auth/password/reset', {
        password: password,
        token: token,
      });
      if (result.status == 200) {
        toast.success('Пароль успішно змінено');
        setSuccess(true);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center py-40 align-middle sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-lg border border-gray-400 bg-white px-4">
        <div className="my-2 text-center text-2xl font-bold">
          Введіть новий пароль
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4 w-full"
          placeholder="Новий пароль"
        />
        <Input
          id="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          className="mb-4 w-full"
          placeholder="Підтвердьте  новий пароль"
        />
        <Button
          type="submit"
          className="mb-4 w-full"
          onClick={handleSubmit}
          disabled={success}
        >
          Зберегти новий пароль
        </Button>
        {success && (
          <div className="mb-4 text-center">
            <a href="/" className="text-sky-600">
              Перейти на сторінку авторизації
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
