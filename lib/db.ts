import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

function createPrismaClient() {
    try {
        const client = new PrismaClient({
            log: process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
        });


        client.$connect()
            .then(() => {
                console.log('Successfully connected to the database');
            })
            .catch((error) => {
                console.error('Failed to connect to the database:', error);
            });

        return client;
    } catch (error) {
        console.error('Error initializing Prisma client:', error);
        if (process.env.NODE_ENV === 'production') {
            throw error;
        }
        return new PrismaClient();
    }
}

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;