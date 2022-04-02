import { City, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { State } from "../../models/State";
import {
  delState,
  getCityById,
  getCityByName,
  getCitiesAll,
  postCity,
  putState,
} from "../service/City";

const prisma = new PrismaClient();

export default {
  // * POST
  async handlePost(req: Request, res: Response) {
    try {
      const { name, stateId }: City = req.body;

      // Verifica se o name não esta nulo
      if (!name)
        return res.status(400).send("Preencha o campo nome corretamente!");

      const tempData = {
        name: name,
        stateId: stateId,
        id: undefined
      }
      // verifica se o cidade já foi criado anteriormente
      const tempCity = await getCityByName(tempData);

      // Se já foi retorna um error
      if (tempCity) return res.status(422).send("Cidade já existente");

      // Caso contrário cria o cidade
      const insertCity = {
        name: name,
        stateId: Number(stateId),
        id: undefined,
      };

      const data = await postCity(insertCity);
      return res.json({
        successMessage: "Cidade cadastrada com sucesso!",
        city: data,
      });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  // * GET
  async handleGetAll(req: Request, res: Response) {
    try {
      const tempCities = await getCitiesAll();

      // Nenhum estado encontrado
      if (!tempCities) return res.status(404).send("Nenhum estado encontrado!");

      return res.json({ cities: tempCities });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async handleGetById(req: Request, res: Response) {
    try {
      // Pega o id dos params
      const { id } = req.params;

      // Verifica se o id não esta nulo
      if (!id)
        return res.status(400).send("Id não indetificado!");

      // Busa o state
      const tempCityById = await getCityById(Number(id));

      // Nenhum estado encontrado
      if (!tempCityById)
        return res.status(404).send("Nenhuma cidade encontrada!");

      return res.json({ City: tempCityById });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  // * Put
  async handlePut(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Verifica se possui ID e name
      if (!name)
        return res.status(400).send("Preencha o campo de nome corretamente!");
      if (!id) return res.status(400).send("Id não encontrado!");

      // Verifica se existe algum estado com aquele ID
      const tempStateById = await getCityById(Number(id));

      // Caso não exista
      if (!tempStateById)
        return res.status(404).send("Nenhum estado encontrado!");

      const tempDates = {
        id: Number(id),
        name,
      };
      // Caso exista
      const data = await putState(tempDates);

      return res.json({
        successMessage: "Estado editado com sucesso!",
        state: data,
      });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro interno!");
    }
  },

  async handleDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send("Id não encontrado!");

      // Verifica se existe algum estado com aquele ID
      const tempStateById = await getCityById(Number(id));

      // Caso não exista
      if (!tempStateById)
        return res.status(404).send("Nenhum estado encontrado!");

      // Caso exista
      await delState(Number(id));

      return res.json({
        successMessage: "Estado deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro interno!");
    }
  },
};
