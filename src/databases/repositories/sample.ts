import { IRepository } from "@customTypes/repository";
import Sample from "@databases/entities/sample";
import BaseRepository from "@databases/repositories/base";
import { Service } from "typedi";

@Service()
export default class SampleRepository extends BaseRepository implements IRepository<Sample> {
  getInstance() {
    return this.getRepository(Sample);
  }

  getQueryBuilder(alias?: string) {
    return this.getInstance().createQueryBuilder(alias);
  }
}
