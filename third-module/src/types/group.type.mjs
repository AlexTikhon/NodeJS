export class Group {
  constructor(groupBody) {
    this.id = Math.round(Math.random() * 10000);
    this.name = groupBody.name;
    this.permissions = groupBody.permissions;
  }
}
