import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { dbDiariesType } from "../types";
import { serializeDiary } from "@/lib/serialize";
import DiaryCard from "@/app/shared/ui/cards/diary-card";

type Params = {
  params: { id: string };
};
export default async function DiaryDetails(props: Params) {
  const { params } = await props;
  const { id } = await params;
  const diariesCollection = await getCollection("diaries");
  const rawDiary = (await diariesCollection?.findOne({
    _id: new ObjectId(id),
  })) as dbDiariesType;
  const diary = serializeDiary(rawDiary);
  if (!diary) {
    return <div>Diary not found</div>;
  }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <DiaryCard detailsPage={true} diary={diary} />
    </section>
  );
}
