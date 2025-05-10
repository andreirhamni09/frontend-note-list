"use client"
import { useState, useEffect } from 'react'
import { GetNoteList } from '../response/notes-list/GetNoteList'
import { NoteListData } from '@/response/notes-list/NoteListInterface';
import { format, parseISO } from "date-fns";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash } from 'lucide-react';

export default function Home() {
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
    <div className="container mx-auto p-4">
      <div className="flex gap-4">
        <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Note List</h1></div>
        <div className="w-1/2 p-4">
          <div className='flex justify-end gap-2'>
            <Button variant="default">Add Note List<Plus/></Button>
          </div>
        </div>
      </div>
      {noteList.length === 0 ? (
        <div className="grid grid-cols-12 gap-4">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{messages}</CardTitle>
              <CardDescription>Belum Ada Note List Yang Diinputkan</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Tambah Note List</Button>
            </CardFooter>
          </Card>
        </div>
      ):(
        <>
          {noteList.map((note) => (
            <div className="grid grid-cols-3 gap-4">
              <Card className="w-[350px]" key={note.id_note_lists}>
                <CardHeader>
                  <CardTitle>{note.title_note_lists}</CardTitle>
                  <CardDescription>{note.deskripsi_note_lists}</CardDescription>
                  <CardDescription className="flex justify-end gap-2">
                    Dibuat Tanggal : 
                      {format(parseISO(note.created_at_note_list), "HH:mm:ss dd-MMMM-yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-1">
                  <Button variant="default">Add Task<Plus/></Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Edit<Pencil/></Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Delete<Trash/></Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
