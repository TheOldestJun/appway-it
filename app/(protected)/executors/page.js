'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { NewApps, AllApps } from '@/components/executors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Executors() {
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
          <TabsTrigger value="newApplications">Нові заявки</TabsTrigger>
          <TabsTrigger value="allApplications">
            Статус виконання заявок
          </TabsTrigger>
        </TabsList>
        <TabsContent value="newApplications">
          <div className="mx-20 my-10">
            <NewApps />
          </div>
        </TabsContent>
        <TabsContent value="allApplications">
          <div className="mx-20 my-10">
            <AllApps />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
