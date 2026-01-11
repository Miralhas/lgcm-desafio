CREATE TABLE "reports" (
	"id" uuid,
	"summary" text NOT NULL,
	"statistics" jsonb NOT NULL,
	"notes" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);

ALTER TABLE "reports" ADD CONSTRAINT "reports_id_samples_id_fkey" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE CASCADE;
ALTER TABLE "variants" DROP CONSTRAINT "variants_sample_id_samples_id_fkey", ADD CONSTRAINT "variants_sample_id_samples_id_fkey" FOREIGN KEY ("sample_id") REFERENCES "samples"("id") ON DELETE CASCADE;