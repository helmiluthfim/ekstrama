import TopicsList from "@/components/TopicList";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div>
      <Link className="bg-white p-2" href={"/addTopic"}>
        Add Topic
      </Link>
      <TopicsList />
    </div>
  );
}
