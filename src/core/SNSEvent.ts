import { UniqueEntityID } from "./UniqueEntityID";
import { IDomainEvent } from "./IDomainEvent";
// import { injectable, inject } from "inversify";
// import { TYPES } from "./types";

// @injectable()
export class SNSEvent implements IDomainEvent {
  private id: UniqueEntityID;
  public dateTimeOccurred: Date;
  public topic: any;

  constructor(id: UniqueEntityID) {
    this.id = id;
    this.topic = "sample topic";
    this.dateTimeOccurred = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.id;
  }

  publishTopic(event: string, data: string): any {
    console.log("🔔🔔🔔🔔🔔🔔publishing agg in SNS Event");
    const params = {
      Message: JSON.stringify(data),
      TopicArn: event
    };
    return this.topic.publish(params).promise();
  }
}
