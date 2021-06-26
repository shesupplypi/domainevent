import { Entity } from "../Test";
const fetch = require("node-fetch");

// interface IDynamoRepo<T> {
//   get(table: string, keyName: string, keyValue: string): Promise<T>
//   save(table: string, model: T, optionalParams?: any): Promise<T>
// }

export abstract class DynamoRepo {
  private _client: any;
  public constructors() {
    this._client = "dynamo";
  }

  public async saveThing(user: any): Promise<any> {
    const { id } = user;
    console.log("id in db abstract class", id);
    const callDB = await fetch("https://swapi.dev/api/people/2");
    console.log("callDB", callDB);
    if (callDB.status === 200) {
      console.log("200 status invoking decorator");
      this.invokeDecorator(id);
      return user;
    }
  }

  @Entity()
  public async invokeDecorator(id: any) {
    console.log("✨✨✨✨✨✨ id in invoke decorator", id);
  }
}

export class UserRepo extends DynamoRepo {
  async save(id: any) {
    console.log("inside save method user repo");
    const user = { id: id.getValue().id.value, ...id.getValue().props };
    console.log("value in save in user repo", user);
    const saveDB = await this.saveThing(user);
    return saveDB;
  }
}
