import { PrismaClient, State } from "@prisma/client";
const prisma = new PrismaClient();

// * FUNÇÕES DE POST

// POST STATE
export async function postState(name: string) {
  try {
    // Cria o estado
    const data: State = await prisma.state.create({
      data: {
        name,
      },
    });

    // E retorna o estado criado
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//  * Funções Get

// get All

export async function getStatesAll() {
  try {
    // coleta todos os estado

    const tempStates = await prisma.state.findMany();

    // E retorna o que achou
    return tempStates;
  } catch (error) {
    throw new Error(error);
  }
}

// Get state by name
export async function getStateByName(name: string) {
  try {
    // coleta o estado pelo nome
    const tempStates = await prisma.state.findFirst({ where: { name: name } });

    // E retorna o que achou
    return tempStates;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getStateById(id: number) {
  try {
    // coleta o estado pelo id
    const tempState = await prisma.state.findUnique({ where: { id: id } });

    // E retorna o que achou
    return tempState;
  } catch (error) {
    throw new Error(error);
  }
}
export async function putState({ id, name }: State) {
  try {
    const data = await prisma.state.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    // E retorna o que achou
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function delState(id : number) {
  try {
    const data = await prisma.state.delete({
      where: {
        id: id,
      },
    });

    // E retorna o que achou
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
