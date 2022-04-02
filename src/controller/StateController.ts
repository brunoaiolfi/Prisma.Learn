import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { State } from "../../models/State";
import {
  delState,
  getStateById,
  getStateByName,
  getStatesAll,
  postState,
  putState,
} from "../service/State";

const prisma = new PrismaClient();

export default {
  // * POST
  async handlePost(req: Request, res: Response) {
    try {
      const { name }: State = req.body;

      // Verifica se o name não esta nulo
      if (!name)
        return res.status(400).send("Preencha o campo nome corretamente!");

      // verifica se o estado já foi criado anteriormente
      const tempStates = await getStateByName(name);

      // Se já foi retorna um error
      if (tempStates) return res.status(422).send("Estado já existente");

      // Caso contrário cria o estado
      const data = await postState(name);
      return res.json({
        successMessage: "Estado cadastrado com sucesso!",
        state: data,
      });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  // * GET
  async handleGetAll(req: Request, res: Response) {
    try {
      const tempStates = await getStatesAll();

      // Nenhum estado encontrado
      if (!tempStates) return res.status(404).send("Nenhum estado encontrado!");

      return res.json({ states: tempStates });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async handleGetById(req: Request, res: Response) {
    try {
      // Pega o id dos params
      const { id } = req.params;

      // Busa o state
      const tempStateById = await getStateById(Number(id));

      // Nenhum estado encontrado
      if (!tempStateById)
        return res.status(404).send("Nenhum estado encontrado!");

      return res.json({ state: tempStateById });
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
      const tempStateById = await getStateById(Number(id));

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
      const tempStateById = await getStateById(Number(id));

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
