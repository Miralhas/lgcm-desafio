import {
  pgEnum,
  pgTable,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';
import { defineRelations } from 'drizzle-orm';

export const classificationEnum = ['pathogenic', 'benign', 'vus'] as const

export const classificationPgEnum = pgEnum('classification', classificationEnum);

export const samples = pgTable("samples", {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
});

export const variants = pgTable("variants", {
  id: varchar('id').primaryKey(),
  gene: varchar("gene").notNull(),
  classification: classificationPgEnum().notNull(),
  sampleId: uuid('sample_id').notNull(),
});

export const relations = defineRelations({ variants, samples }, (r) => ({
  variants: {
    sample: r.one.samples({
      from: r.variants.sampleId,
      to: r.samples.id
    }),
  },
  samples: {
    variants: r.many.variants()
  }
}));