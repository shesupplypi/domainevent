import { IDomainEvent } from "../../core/IDomainEvent";
import { UniqueEntityID } from "../../core/UniqueEntityID";
import { User } from "../User";

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
