'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { AppStatus, ToApprove } from '@/components/directors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Directors() {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <>
      <Tabs defaultValue="newApplications" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="newApplications">
            Заявки на погодження
          </TabsTrigger>
          <TabsTrigger value="allApplications">
            Статус виконання заявок
          </TabsTrigger>
        </TabsList>
        <TabsContent value="newApplications">
          <div className="mx-20 my-10">
            <ToApprove />
          </div>
        </TabsContent>
        <TabsContent value="allApplications">
          <div className="mx-20 my-10">
            <AppStatus />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
