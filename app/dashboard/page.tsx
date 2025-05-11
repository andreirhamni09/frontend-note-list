"use client"
import { useState, useEffect } from 'react'
import { GetNoteList } from '@/response/notes-list/GetNoteList/GetNoteList'
import { NoteListData } from '@/response/notes-list/GetNoteList/NoteListInterface';
import { format, parseISO } from "date-fns";
import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { List, Pencil, Plus, Trash } from 'lucide-react';
import PageLayout from '@/components/layout/layout';

export default function Dashboard() {
  const [noteList, setNoteList] = useState<NoteListData[]>([]);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetNoteList()
      .then((res) => {
        setNoteList(res.data);
        setMessages(res.messages)
        setError(res.error)
        setStatus(res.status);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <PageLayout>
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Note List</h1>
                <Button className="bg-black text-white">
                    <Plus/>Add
                </Button>
            </div>
            <div className="container-main">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {noteList?.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{messages}</CardTitle>
                        <CardDescription>{error}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Tambah Note List</Button>
                        </CardFooter>
                    </Card>
                    ):(
                        <>
                        {noteList.map((note) => (
                        <Card className="flex flex-col justify-between" key={note.id_note_lists}>
                            <CardHeader>
                                <CardTitle>{note.title_note_lists}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap justify-end">
                                <p className="text-sm mb-2">{note.deskripsi_note_lists}</p>
                                    <p className="text-xs text-gray-500 mb-4">
                                    Dibuat Tanggal : {format(parseISO(note.created_at), "HH:mm:ss dd-MM-yyyy")}
                                </p>
                            </CardContent>
                            <CardFooter className="flex flex-wrap gap-2 justify-end">
                                <Button className="bg-black text-white">
                                    <List /> Task
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    <Pencil /> Edit
                                </Button>
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                    <Trash /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                        ))}
                        </>
                    )}
                </div>
            </div>            
        </div>
    </PageLayout>
  )
}
