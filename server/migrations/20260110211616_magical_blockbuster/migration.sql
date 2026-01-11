CREATE TYPE "classification" AS ENUM('pathogenic', 'benign', 'vus');
CREATE TABLE "samples" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(256) NOT NULL
);

CREATE TABLE "variants" (
	"id" varchar PRIMARY KEY,
	"gene" varchar NOT NULL,
	"classification" "classification" NOT NULL,
	"sample_id" uuid NOT NULL
);

ALTER TABLE "variants" ADD CONSTRAINT "variants_sample_id_samples_id_fkey" FOREIGN KEY ("sample_id") REFERENCES "samples"("id");