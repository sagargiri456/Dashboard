import prisma from '@/lib/db';
// import { title } from 'process'
import React from 'react';

const page = async () => {
  // const data = await prisma.notification.create({
  //   data:{
  //     title:'Dashboard',
  //     desc:'Client'
  //   }
  // })
  // console.log(data);
  return <div>This is the admin page.</div>;
};

export default page;
