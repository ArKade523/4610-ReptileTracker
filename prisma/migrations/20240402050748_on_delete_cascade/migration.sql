-- DropForeignKey
ALTER TABLE "Feeding" DROP CONSTRAINT "Feeding_reptile_id_fkey";

-- DropForeignKey
ALTER TABLE "HusbandryRecord" DROP CONSTRAINT "HusbandryRecord_reptile_id_fkey";

-- DropForeignKey
ALTER TABLE "Reptile" DROP CONSTRAINT "Reptile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_reptile_id_fkey";

-- AddForeignKey
ALTER TABLE "Reptile" ADD CONSTRAINT "Reptile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeding" ADD CONSTRAINT "Feeding_reptile_id_fkey" FOREIGN KEY ("reptile_id") REFERENCES "Reptile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HusbandryRecord" ADD CONSTRAINT "HusbandryRecord_reptile_id_fkey" FOREIGN KEY ("reptile_id") REFERENCES "Reptile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_reptile_id_fkey" FOREIGN KEY ("reptile_id") REFERENCES "Reptile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
