"use client";
import { DeleteNoteList } from "@/api/note_list/api"
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setLoading(true)
    const fetchData = async() => {
      const response = await DeleteNoteList(id);
      if (response.status === 200) {
        router.push('/');
      } else {
        setError(response.error || response.messages || "Failed to fetch notes");
        router.push('/');
      }
      setLoading(false);
    } 
    fetchData();
  }, []);
  return (
    <>
      { loading && (<p>Loading...</p>) }
    </>
  )
}