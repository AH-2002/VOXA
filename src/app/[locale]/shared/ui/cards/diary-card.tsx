import { diariesType } from "../../../diaries/types";
import { deleteDiary } from "@/actions/diaries";
import Link from "next/link";
import { LineSkeleton } from "../skeletons/skeleton";
import { formatDate } from "@/lib/serialize";
import { Button } from "@/app/[locale]/components/ui/button";
import DiariesButton from "@/app/[locale]/components/diaries-button";
export default function DiaryCard({
  diary,
  detailsPage,
}: {
  diary: diariesType;
  detailsPage?: boolean;
}) {
  return (
    <div
      key={diary._id}
      className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
            {diary.title ? diary.title : <LineSkeleton />}
          </h2>
        </div>
        <div className="flex justify-end">
          <p className="text-sm text-gray-500">
            {diary.createdAt ? formatDate(diary.createdAt) : <LineSkeleton />}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mt-3 line-clamp-2 dark:text-gray-300">
        {diary.content ? diary.content : <LineSkeleton />}
      </p>

      <div className="flex mt-4 justify-between w-full dark:text-gray-200 flex-wrap gap-4">
        {!detailsPage && (
          <Link href={`/diaries/${diary._id}`}>
            <Button variant="outline">Read More</Button>
          </Link>
        )}

        <DiariesButton variant="secondary" label="Update Diary" diary={diary} />
        <form action={deleteDiary}>
          <input type="hidden" name="diaryId" value={diary._id} />
          <Button type="submit" variant="destructive">
            Delete Diary
          </Button>
        </form>
      </div>
    </div>
  );
}
