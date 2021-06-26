import { UserRepo } from "../core/DynamoRepo";
import { User } from "./User";

export const userRepo = new UserRepo();

class CreateUserUseCase {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async execute(req: any) {
    console.log("fxn executing");
    const { firstName, lastName, email, password } = req;

    const user = User.create({
      email,
      password,
      firstName,
      lastName
    });
    console.log(user);

    try {
      const saveUser = await this.userRepo.save(user);
      console.log("saveUser in use case", saveUser);
      return saveUser;
    } catch (err) {
      console.log("err in use case", err);
    }

    return user;
  }
}
export const create = new CreateUserUseCase(userRepo);
