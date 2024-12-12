'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  AllApplications,
  NewApplication,
  Rejected,
} from '@/components/applications';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Applicants() {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <>
      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="applications">Поточні заявки</TabsTrigger>
          <TabsTrigger value="new">Нова заявка</TabsTrigger>
          <TabsTrigger value="rejected">Відхилені заявки</TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          <div className="mx-20 my-10">
            <AllApplications />
          </div>
        </TabsContent>
        <TabsContent value="new">
          <div className="mx-20 my-10">
            <NewApplication />
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="mx-20 my-10">
            <Rejected />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
