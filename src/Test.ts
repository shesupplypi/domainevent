import { DomainEvents } from "./core/DomainEvents";
import { UniqueEntityID } from "./core/UniqueEntityID";
// function Sprinkle(name: string) {
//   return function (target: Object, key: string | symbol) {
//     let val = key
//     console.log(key.valueOf.arguments)
//     const getValue = () => {
//       console.log(val)
//       return val
//     }
//     // Object.values(target, key, {
//     //   get: getValue
//     // })
//   }
// }

// function enumerable(isEnumerable: string) {
//   return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
//       console.log(isEnumerable)
//     return descriptor
//   }
// }

// function propertyDecorator() {
//   return function (target: Object, propertyKey: string) {
//     console.log('hi', target, propertyKey)
//     console.log('Object', Object.getOwnPropertyDescriptor(target )
//   }
// }

// function propertyDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
//   console.log(target, propertyKey, parameterIndex)
//   let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
//   existingRequiredParameters.push(parameterIndex)
//   Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey)
//   console.log(existingRequiredParameters)
//   const thing = Reflect.get(target, propertyKey)
//   console.log(thing)
// }

// function other(name: string) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     target[requiredMetadataKey] = target[propertyKey]
//     target[requiredMetadataKey].set(propertyKey, name)
//   }
// }

// function propertyDecorator<T extends { new (...args: any[]): {} }>(Base: T) {
//   return class extends Base {
//     constructor(...args: any[]) {
//       super(...args)
//       const subMethods = Base.prototype[requiredMetadataKey]
//       console.log(subMethods)
//       if (subMethods) {
//         subMethods.forEach((name: any) => console.log(name))
//       }
//     }
//   }
const dispatchEventsCallback = (args: any) => {
  console.log('ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️inside dispatch events callback')
  console.log("args in dispatch events callback", args);
  const aggregateId = new UniqueEntityID(args);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
};

export function Entity() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = (...args: any) => {
      const id = args[0]
      dispatchEventsCallback(id)
      console.log("id in entity decorator", id);
      console.log("args in entity decorator", args);
    console.log("descriptor in entity decorator", descriptor);
    return descriptor;
  };
}

// class User {
//   //   @propertyDecorator({ name: this.User.cat })
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   @Entity()
//   getName(user: any) {
//     console.log(this.name);
//   }
// }

// const user = new User("annalise");
// user.getName({ name: "Poorshad", email: "p.shaddel@gmail.com", id: 123 });
