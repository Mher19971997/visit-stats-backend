import { Injectable, Logger } from '@nestjs/common';
import { Transaction as CommonTransaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { InjectConnection } from '@nestjs/sequelize';
import { CommonStore } from './CommonStore';

@Injectable()
export class V1_InitialScripts extends CommonStore {
    private readonly logger = new Logger(V1_InitialScripts.name);

    constructor(@InjectConnection() private connection: Sequelize) {
        super();
    }

    async up(): Promise<void> {
        const transaction = await this.connection.transaction({
            autocommit: false,
            type: CommonTransaction.TYPES.IMMEDIATE,
            isolationLevel: CommonTransaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
        });
        try {
            await this.connection.query(
                `
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

CREATE TABLE "public"."countries_analytics" (
    "uuid" uuid DEFAULT "public".uuid_generate_v4() NOT NULL,
    "country" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "deletedAt" timestamp without time zone
);
COMMENT ON TABLE "public"."countries_analytics" IS 'Global Countries analytics list';

    `,
                { transaction },
            );
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}
