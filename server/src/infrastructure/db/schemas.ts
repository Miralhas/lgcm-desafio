import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  timestamp
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
  sampleId: uuid('sample_id').notNull().references(() => samples.id, { onDelete: "cascade" }),
});

export const reports = pgTable("reports", {
  sampleId: uuid('id').primaryKey().references(() => samples.id, { onDelete: "cascade" }),
  summary: text("summary").notNull(),
  statistics: jsonb("statistics").$type<{ pathogenic: number; benign: number; vus: number }>().notNull(),
  notes: text("notes").notNull(),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
});


export const relations = defineRelations({ variants, samples, reports }, (r) => ({
  variants: {
    sample: r.one.samples({
      from: r.variants.sampleId,
      to: r.samples.id
    }),
  },
  samples: {
    variants: r.many.variants(),
  },

  reports: {
    sample: r.one.samples({
      from: r.reports.sampleId,
      to: r.samples.id,
    }),
  },
}));