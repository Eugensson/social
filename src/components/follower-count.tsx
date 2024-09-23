"use client";

import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

import useFollowerInfo from "@/hooks/use-follower-info";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export const FollowerCount:React.FC<FollowerCountProps> = ({ 
  userId,
  initialState,
}) => {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
