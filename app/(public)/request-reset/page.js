'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Page() {
  const [email, setEmail] = useState('');
  const handleSubmit = async () => {
    try {
      const result = await axios.post('/api/auth/password/request', {
        email: email,
      });
      if (result.status == 200) {
        toast.success('Лист для відновлення паролю надіслано');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex justify-center py-40 align-middle sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-lg border border-gray-400 bg-white px-4">
        <div className="my-2 text-center text-2xl font-bold">
          Введіть вашу електронну пошту
        </div>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-4 w-full"
        />
        <Button type="submit" className="mb-4 w-full" onClick={handleSubmit}>
          Надіслати листа для відновлення паролю
        </Button>
      </div>
    </div>
  );
}
