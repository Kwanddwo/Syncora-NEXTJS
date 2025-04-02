"use client";

import { useQuery } from "@tanstack/react-query";
import { Task } from "@/lib/types";
import { getTasksByUserId } from "@/app/_api/tasks"; // Consider centralizing API calls

export function useTasksByUserId(userId: string) {
  return useQuery<Task[], Error>({
    queryKey: ["tasks", { userId }], // More specific query key
    queryFn: () => getTasksByUserId(userId),
    enabled: !!userId, // Only fetch when userId exists
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    // onError: (error) => {
    //   console.error("Error fetching tasks:", error);
    //   // Consider adding error notification here
    // },
  });
}
