import prisma from '@/prisma';
import ClientAdmin from './clientPage';

const getRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};

export default async function Admin() {
  const roles = await getRoles();
  return <ClientAdmin roles={roles} />;
}
