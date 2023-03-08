export class CheckStatusRequestParamDTO {
  isHTML: boolean;

  constructor(html: boolean) {
    this.isHTML = html;
  }
}
