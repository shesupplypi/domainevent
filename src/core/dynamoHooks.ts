import { UniqueEntityID } from "./UniqueEntityID";
import { DomainEvents } from "./DomainEvents";

// export const dispatchEventsCallback =
//   (id: UniqueEntityID) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
//     Object.defineProperty(target, propertyKey, { id } as any)
//     DomainEvents.dispatchEventsForAggregate(id)
//   }

// function dispatchEventsCallback(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//   console.log('param decorator notNull function invoked ')
//   DomainEvents.dispatchEventsForAggregate(propertyKey.id as UniqueEntityID)
// }

export const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
};
