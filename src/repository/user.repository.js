import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function create(
  first_name ,
  last_name,
  email,
  phone,
  password,
  ){
  return prisma.user.create({
    data:{
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      password: password
    }
  });
}

export async function login(email){
  return prisma.user.findUnique({
    where: {
      email : email
    }
  });
}

export async function findById(id){
  return prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

export async function update(
  id,
  data
  ){
  return prisma.user.update({
    where: {
      id
    },
    data
  });
}