import uuid from 'uuid/v1';



export class User {
  id: string;

  constructor(
    public name: string,
    public avatarSrc: string
  ) {
    this.id = uuid();
  }
}
