"use client";

import { deletePost } from "@/actions/posts";
import { useEffect, useRef, useState, useTransition } from "react";
import { PostType } from "../../types/posts";
import { LineSkeleton, PictureSkeleton } from "../skeletons/skeleton";
import { formatDate } from "@/lib/serialize";
import { UserType } from "@/app/[locale]/users/types";
import PostButton from "@/app/[locale]/components/post-buttons";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PostCard({
  post,
  userId,
}: {
  post: PostType;
  userId: string;
}) {
  const [likes, setLikes] = useState(post.likes || []);
  const [loading, setLoading] = useState(false);
  const postOwner = post.userId === userId;
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [postUser, setPostUser] = useState<UserType | null>(null);
  const [userLoading, setuserLoading] = useState(true);
  const [comments, setComments] = useState(post.comments ?? []);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [authors, setAuthors] = useState<{ [key: string]: UserType }>({});
  const postTranslation = useTranslations("post");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${post.userId}`);
        if (res.ok) {
          const data = await res.json();
          setPostUser(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setuserLoading(false);
      }
    };

    fetchUser();
  }, [post.userId]);
  const handleLike = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post._id}/like`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        if (data.liked) {
          setLikes([...likes, data.userId]);
        } else {
          setLikes(likes.filter((l) => l !== data.userId));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);

    try {
      const res = await fetch(`/api/posts/${post._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      const data = await res.json();
      if (data.success) {
        setComments([...comments, data.comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCommentLoading(false);
    }
  };
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const newAuthors: { [key: string]: UserType } = {};

        await Promise.all(
          comments.map(async (comment) => {
            const res = await fetch(`/api/users/${comment.user_id}`);
            if (res.ok) {
              const data = await res.json();
              newAuthors[comment._id] = data;
            }
          })
        );

        setAuthors(newAuthors);
      } catch (err) {
        console.error(err);
      }
    };

    if (comments.length) fetchAuthors();
  }, [comments]);

  return (
    <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-all bg-white w-[75%] mx-auto dark:bg-gray-800">
      <div className="flex gap-x-5 relative">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold shadow-inner overflow-hidden dark:bg-gray-600">
          {userLoading ? (
            <PictureSkeleton />
          ) : (
            <Link href={`/profile/${postUser?._id}`}>
              <img
                src={postUser?.profile_picture || "/user-picture.webp"}
                alt="Profile Picture"
                className="object-cover w-full h-full"
              />
            </Link>
          )}
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-2 dark:text-gray-300">
            {post.createdAt ? formatDate(post.createdAt) : <LineSkeleton />}
          </p>
          {postUser ? (
            <Link href={`/profile/${postUser._id}`}>
              <h2 className="text-lg font-semibold text-gray-700 leading-tight dark:text-gray-200">
                {`${postUser.first_name} ${postUser.last_name}`}
              </h2>
            </Link>
          ) : (
            <LineSkeleton />
          )}
          <div className="text-gray-700 text-base mb-4 dark:text-gray-300">
            {post.content ? post.content : <LineSkeleton />}
            {post?.mediaUrl &&
              (post.mediaType === "video" ? (
                <video
                  controls
                  className="mt-8 rounded-lg w-100 h-100 object-cover"
                >
                  <source src={post.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="Post Image"
                  className="mt-8 rounded-lg w-100 h-100 object-cover"
                />
              ))}
          </div>
        </div>

        {postOwner && (
          <div className="absolute top-0 right-0">
            <button
              className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200 dark:text-gray-300 hover:dark:text-blue-400 dark:hover:dark:text-blue-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ⋮
            </button>
            {menuOpen && (
              <div
                ref={dropdownRef}
                className="cursor-pointer absolute right-0 mt-2 w-36 bg-white border shadow-md rounded-md overflow-hidden z-50 dark:bg-gray-700"
              >
                <PostButton label={postTranslation("updatePost")} post={post} />
                <form action={deletePost}>
                  <input
                    type="hidden"
                    name="postId"
                    value={post._id.toString()}
                  />
                  <button className="w-full flex gap-x-5 text-left px-5 py-2 hover:bg-gray-100 text-red-500 dark:hover:bg-gray-600 dark:text-red-400">
                    {postTranslation("delete")}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`px-4 py-1 rounded-full font-medium transition ${
            likes.includes(userId ?? "")
              ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          }`}
        >
          {likes.includes(userId ?? "")
            ? `❤️ ${postTranslation("unlike")}`
            : `🤍 ${postTranslation("like")}`}
        </button>
        <span className="text-gray-600 font-medium dark:text-gray-400">
          {likes.length}{" "}
          {likes.length === 1
            ? `${postTranslation("Like")}`
            : `${postTranslation("likes")}`}
        </span>
      </div>

      <form
        onSubmit={handleAddComment}
        className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap"
      >
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={`${postTranslation("writeComment")}`}
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
        />
        <div className="flex justify-end w-full sm:w-auto">
          <button
            type="submit"
            disabled={commentLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600"
          >
            {postTranslation("comment")}
          </button>
        </div>
      </form>

      <div className="mt-4 space-y-3">
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {postTranslation("noComment")}
          </p>
        )}

        {comments.map((c) => {
          const author = authors[c._id];
          return (
            <div
              key={c._id}
              className="flex items-start gap-3 border rounded-lg p-3 bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-blue-100 dark:bg-gray-600">
                {author ? (
                  <Link href={`/profile/${author._id}`}>
                    <img
                      src={author.profile_picture || "/user-picture.webp"}
                      alt={`${author.first_name} ${author.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ) : (
                  <PictureSkeleton />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {author ? (
                    <Link href={`/profile/${author._id}`}>
                      {`${author.first_name} ${author.last_name}`}
                    </Link>
                  ) : (
                    <LineSkeleton />
                  )}
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {c.content}
                </p>
                <p className="text-xs text-gray-400 mt-1 dark:text-gray-400">
                  {formatDate(c.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
