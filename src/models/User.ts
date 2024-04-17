export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}

export interface UserDB {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  species: string;
  breed: string;
  age: number;
  gender: string;
  bio: string;
  profile_picture: string;
  created_at: string;
}

export interface UserModel {
  userId: string;
  name: string;
  email: string;
  role: USER_ROLES;
  species: string;
  breed: string;
  age: number;
  gender: string;
  bio: string;
  profilePicture: string;
  createdAt: string;
}

export class User {
  constructor(
    private userId: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private species: string,
    private breed: string,
    private age: number,
    private gender: string,
    private bio: string,
    private profilePicture: string,
    private createdAt: string
  ) {}

  public getId(): string {
    return this.userId;
  }
  public setId(value: string): void {
    this.userId = value;
  }
  public getName(): string {
    return this.name;
  }
  public setname(value: string): void {
    this.name = value;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(value: string): void {
    this.email = value;
  }
  public getPassaword(): string {
    return this.password;
  }
  public getRole(): USER_ROLES {
    return this.role;
  }
  public setRole(value: USER_ROLES): void {
    this.role = value;
  }
  public getSpecies(): string {
    return this.species;
  }
  public setSpecies(value: string): void {
    this.species = value;
  }
  public getBreed(): string {
    return this.breed;
  }
  public setBreed(value: string): void {
    this.breed = value;
  }
  public getAge(): number {
    return this.age;
  }
  public setAge(value: number): void {
    this.age = value;
  }
  public getGender(): string {
    return this.gender;
  }
  public setGender(value: string): void {
    this.gender = value;
  }
  public getBio(): string {
    return this.bio;
  }
  public setBio(value: string): void {
    this.bio = value;
  }
  public getProfilePicture(): string {
    return this.profilePicture;
  }
  public setProfilePictureo(value: string): void {
    this.profilePicture = value;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public toDBModel(): UserDB {
    return {
      user_id: this.userId,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      species: this.species,
      breed: this.breed,
      age: this.age,
      gender: this.gender,
      bio: this.bio,
      profile_picture: this.profilePicture,
      created_at: this.createdAt,
    };
  }

  public toBusinessModel(): UserModel {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      species: this.species,
      role: this.role,
      breed: this.breed,
      age: this.age,
      gender: this.gender,
      bio: this.bio,
      profilePicture: this.profilePicture,
      createdAt: this.createdAt,
    };
  }
}
