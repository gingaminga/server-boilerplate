import { Service } from "typedi";

@Service()
export default class SampleService {
  private num = 10;

  getNumber() {
    return this.num;
  }

  setNumber(num: number) {
    this.num = num;
  }
}
