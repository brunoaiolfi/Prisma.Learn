import { City, PrismaClient, State } from "@prisma/client";
const prisma = new PrismaClient();

// * FUNÇÕES DE POST

// POST City
export async function postCity({ name, stateId }: City) {
  try {
    // Cria a cidade
    const data: City = await prisma.city.create({
      data: {
        name,
        stateId
      },
    });

    // E retorna a cidade criada
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//  * Funções Get

// get All

export async function getCitiesAll() {
  try {
    // coleta todos os estado
    const tempCities = await prisma.city.findMany();

    // E retorna o que achou
    return tempCities;
  } catch (error) {
    throw new Error(error);
  }
}

// Get city by name
export async function getCityByName({name, stateId}: City) {
  try {
    // coleta o cidade pelo nome
    const tempCity = await prisma.city.findFirst({ where: { name: name, stateId: stateId } });

    // E retorna o que achou
    return tempCity;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCityById(id: number) {
  try {
    // coleta o estado pelo id
    const tempCity = await prisma.city.findUnique({ where: { id: id } });

    // E retorna o que achou
    return tempCity;

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
export async function delState(id: number) {
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
