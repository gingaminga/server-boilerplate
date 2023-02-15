import BaseRepository from "@databases/rdb/repositories/base.repository";
import Status from "@databases/rdb/entities/status.entity";
import { StatusDTO } from "@dto/status.dto";
import { Service } from "typedi";

@Service()
export default class StatusRepository extends BaseRepository<Status> {
  constructor() {
    super();
    this.setTarget(Status);
  }

  get queryBuilder() {
    return this.getQueryBuilder("status");
  }

  /**
   * @description 상태 추가 또는 업데이트하기
   * @param status 상태값
   */
  addOrModifyStatus(status: number) {
    return this.queryBuilder
      .insert()
      .into(Status, ["id", "status"])
      .values({ id: 1, status })
      .orUpdate(["status"], ["id"])
      .execute();
  }

  /**
   * @description 상태 가져오기
   */
  getStatus() {
    return this.queryBuilder.select("status as status").where("id = 1").getRawOne<StatusDTO>();
  }
}
