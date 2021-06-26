import { IHandle } from "../../core/IHandle";
import { UserCreatedEvent } from "./UserCreatedEvent";
import { DomainEvents } from "../../core/DomainEvents";

export const assignInitialUsername = () => {
  console.log("🎈🎈🎈🎈🎈assigning initial username");
  return "annalise";
};

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
  name: string;
  constructor(name: string) {
    this.name = name;
    this.setupSubscriptions();
    this.hi();
  }

  hi() {
    console.log(`✨✨✨✨✨✨✨Hi! My name is ${this.name}.`);
  }

  setupSubscriptions(): void {
    console.log("in user created setup subsriptions");
    DomainEvents.register(
      this.onUserCreatedEvent.bind(this) as any,
      UserCreatedEvent.name
    );
  }

  private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
    const { user } = event;
    console.log("in user created event", user);
  }
}

new AfterUserCreated("an");
