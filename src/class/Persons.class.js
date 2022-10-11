import { SUBSCRIPTION } from "./Subscription.enum";

export default class Persons {
  id= 0;
  name = "";
  age = 0;
  birthdate = "";
  phone = "";
  signupdate = "";
  subscription = SUBSCRIPTION.INACTIVE;

  constructor(id,name, age, birthdate, phone, signupdate, subscription) {
    this.id= id;
    this.name = name;
    this.age = age;
    this.birthdate = birthdate;
    this.phone = phone;
    this.signupdate = signupdate;
    this.subscription = subscription;
  }
}
