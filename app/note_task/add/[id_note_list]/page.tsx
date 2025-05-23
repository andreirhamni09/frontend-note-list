"use client";
import AddTaskForm from "@/components/note_task/add";
import { useParams } from "next/navigation";
export default function Page() {
  const params    = useParams();
  const id_note_list = params?.id_note_list as string;
  return (
    <AddTaskForm id_note_list={id_note_list}/>
  )
}
