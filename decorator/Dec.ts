const dispatchEventsCallback = (args: any) => {
  const { id } = args[0];
  console.log(id);
};

export function Entity() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = (...args: any[]) => {
      console.log(args);
      return dispatchEventsCallback(args);
    };
    console.log(descriptor);
    return descriptor;
  };
}

class User {
  //   @propertyDecorator({ name: this.User.cat })
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @Entity()
  getName(user: any) {
    console.log(this.name);
  }
}

const user = new User("annalise");
user.getName({ name: "Poorshad", email: "p.shaddel@gmail.com", id: 123 });
