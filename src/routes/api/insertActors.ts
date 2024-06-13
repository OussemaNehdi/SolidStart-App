import { Database } from '~/types';
import { Kysely, PostgresDialect } from 'kysely';
import pkg from 'pg';
import { APIEvent } from "@solidjs/start/server";
const { Pool } = pkg;

const dialect = new PostgresDialect({
    pool: new Pool({
      database: 'newDataBase',
      host: 'ep-yellow-pine-a5talan4.us-east-2.aws.neon.tech',
      user: 'mySimple_owner',
      port: 5432,
      max: 10, 
      ssl: true,
      password: 'yqNDIKY4Lve8',
      
    }),
  });

const db = new Kysely<Database>({
    dialect,
});

export async function POST(event: APIEvent) {
    try {
        const body = await event.request.json();
        const actors = body.actors;
  
    
        if (!actors) {
          return new Response('Invalid input', { status: 400 });
        }
    
        for (let i = 0; i < actors.length; i++) {
            await db.insertInto('actor').values({ person: actors[i].name, eye_color: actors[i].eye_color }).execute();
        }
    
        return new Response(JSON.stringify({ message: "everything inserted successfully" }), { status: 200 });
      } catch (error) {
        console.error('Error inserting stuff:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}