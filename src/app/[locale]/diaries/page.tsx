import { getCollection } from "@/lib/db";
import DiaryCard from "../shared/ui/cards/diary-card";
import { dbDiariesType } from "./types";
import { serializeDiary } from "@/lib/serialize";
import DiariesButton from "../components/diaries-button";

export default async function DiariesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../../../locales/${locale}/default.json`))
    .default;
  const diariesCollection = await getCollection("diaries");
  const rawDiaries = (await diariesCollection
    ?.find()
    .sort({ createdAt: -1 })
    .toArray()) as dbDiariesType[];
  const diaries = rawDiaries?.map((diary: dbDiariesType) =>
    serializeDiary(diary)
  );
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {messages.diaries.myDiaries}
        </h1>

        <DiariesButton variant="submit" label={messages.diaries.addDiary} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diaries?.map(
          (diary) =>
            diary && (
              <DiaryCard key={diary._id} diary={diary} messages={messages} />
            )
        )}
      </div>

      {diaries?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          {messages?.diaries?.empty}
        </p>
      )}
    </section>
  );
}
