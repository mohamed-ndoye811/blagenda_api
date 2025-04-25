import { Exclude, Expose } from "class-transformer";

export class User {
	@Expose()
	id: string;

	@Expose()
	email: string;

	@Exclude()
	password: string;

	@Expose()
	hashedRt: string;
}
