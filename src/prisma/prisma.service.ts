import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	// eslint-disable-next-line no-unused-vars
	constructor(private config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.get("DATABASE_URL"),
				},
			},
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
