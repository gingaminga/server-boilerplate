import Sample from "@databases/entities/sample";
import RelationDatabaseService from "@services/rdb";
import Container from "typedi";

const rdbService = Container.get(RelationDatabaseService);

const SampleRepository = rdbService.getRepository(Sample).extend({
  findValue1(value: string) {
    return this.createQueryBuilder("sample")
      .where("sample.value1 = :value1", {
        value1: value,
      })
      .getMany();
  },
});

export default SampleRepository;
