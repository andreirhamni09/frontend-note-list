"use client";
import { useParams } from "next/navigation";
import EditNoteTaskForm from "@/components/note_task/edit";
export default function Page() {
    const params    = useParams();
    const id_note_task = params?.id_note_task as string;
    return (
        <EditNoteTaskForm id_note_task={id_note_task}/>
    );
}