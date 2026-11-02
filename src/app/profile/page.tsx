import type { Metadata } from "next";
import ProfileCard from "@/app/components/ProfileCard";

export const metadata: Metadata = { title: "BookNook | My Profile" };

export default function ProfilePage() {
  return <ProfileCard />;
}
