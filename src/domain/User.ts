import { AggregateRoot } from "../core/AggregateRoot";
import { SNSEvent } from "../core/SNSEvent";
import { Guard } from "../core/Guard";
import { Result } from "../core/Result";
import { UniqueEntityID } from "../core/UniqueEntityID";
import { UserCreatedEvent } from "./event/UserCreatedEvent";

export class User extends AggregateRoot<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get profilePicture(): string {
    return this.props.profilePicture;
  }

  get googleId(): number {
    return this.props.googleId;
  }

  get facebookId(): number {
    return this.props.facebookId;
  }

  get username(): string {
    return this.props.username;
  }

  // Notice that there aren't setters for everything?
  // There are only setters for things that it makes sense
  // for there for be setters for, like `username`.

  set username(value: string) {
    this.props.username = value;
  }

  // The constructor is private so that it forces you to use the
  // `create` Factory method. There's no way to circumvent
  // validation rules that way.

  private constructor(props: any, id?: UniqueEntityID) {
    super(props, id);
  }

  private static isRegisteringWithGoogle(props: any): boolean {
    return !!props.googleId === true;
  }

  private static isRegisteringWithFacebook(props: any): boolean {
    return !!props.facebookId === true;
  }

  public static create(props: any, id?: UniqueEntityID): Result<User> {
    // Here are things that cannot be null
    const guardedProps = [
      { argument: props.firstName, argumentName: "firstName" },
      { argument: props.lastName, argumentName: "lastName" },
      { argument: props.email, argumentName: "email" }
    ];

    if (
      !this.isRegisteringWithGoogle(props) &&
      !this.isRegisteringWithFacebook(props)
    ) {
      // If we're not registering w/ a social provider, we also
      // need `password`.

      guardedProps.push({ argument: props.password, argumentName: "password" });
    }

    // Utility that checks if anything is missing
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    } else {
      // Create the user object and set any default values
      const user = new User(
        {
          ...props,
          username: props.username ? props.username : ""
        },
        id
      );
      console.log("user in user", user);

      // If the id wasn't provided, it means that we're creating a new
      // user, so we should create a UserCreatedEvent.

      const idWasProvided = !!id;

      if (!idWasProvided) {
        // Method from the AggregateRoot parent class. We'll look
        // closer at this.
        // user.addDomainEvent(new SNSEvent(user.id));
        user.addDomainEvent(new UserCreatedEvent(user));
      }

      return Result.ok<User>(user);
    }
  }
}
