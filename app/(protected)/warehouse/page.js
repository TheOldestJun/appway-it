'use client';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PendingApps, AllApps, NewApps } from '@/components/warehouse';

export default function Warehouse() {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <Tabs defaultValue="newApplications" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="newApplications">Нові заявки</TabsTrigger>
        <TabsTrigger value="pendingApplications">Очікується поставка</TabsTrigger>
        <TabsTrigger value="allApplications">
          Статус виконання заявок
        </TabsTrigger>
      </TabsList>
      <TabsContent value="newApplications">
        <div className="mx-20 my-10">
          <NewApps />
        </div>
      </TabsContent>
      <TabsContent value="pendingApplications">
        <div className="mx-20 my-10">
          <PendingApps />
        </div>
      </TabsContent>
      <TabsContent value="allApplications">
        <div className="mx-20 my-10">
          <AllApps />
        </div>
      </TabsContent>
    </Tabs>
  );
}
