"use client";
import { useParams } from "next/navigation";
import TabelTask from "@/components/note_task/tabel";
export default function Page() {
    const params    = useParams();
    const id_note_list = params?.id_note_list as string;
    return (
        <TabelTask id_note_list={id_note_list}/>
    );
}