import { PrismaClient } from "@prisma/client";
import { User } from "../../models/User";
const prisma = new PrismaClient();

// * SERVICES

// * GET

// get by email
export async function getUserByEmail(email: string) {
  try {
    //   faz uma pesquisa na tabela de usuário, verificando se já possui
    //   Algum usuário com aquele email
    const tempUser = await prisma.user.findUnique({ where: { email } });
    return { user: tempUser };
  } catch (error) {
    return { errorMessage: "Erro" };
  }
}

// * POST

// Post user
// export async function post({
//   address,
//   birthday,
//   email,
//   name,
//   password,
//   status,
//   whatsappNumber,
// }: User) {
//   try {
//     await prisma.user.create({
//       data: {
//         address,
//         birthday,
//         email,
//         name,
//         password,
//         status,
//         whatsappNumber,
//       },
//     });

//     return {postStatus: 200};
//   } catch (error) {
//     return { errorMessage: "Erro2" };
//   }
// }
