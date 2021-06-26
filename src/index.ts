import { User } from "./domain/User";
import { create } from "./domain/UseCase";

const user = create.execute({
  firstName: "annalise",
  lastName: "d",
  email: "jdjhjd",
  password: "sjsjs"
});

document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
${user}
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
</div>
`;
