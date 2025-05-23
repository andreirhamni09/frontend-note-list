"use client"
import { useState, useEffect } from 'react'
import { GetNoteListAll } from '@/api/note_list/api';
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
import { useRouter } from 'next/navigation';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

interface NoteListData {
    id_note_lists           : number,
    id_user                 : number,
    nama_user               : string,
    title_note_lists        : string,
    deskripsi_note_lists    : string,
    created_at              : string,
    updated_at              : string
}

export default function DashboardPages() {
    const router = useRouter();

    const EditPages = (id_note_list:number) => {
        const url = '/note_list/edit/' + id_note_list;
        router.push(url); 
    }

    const TaskPages = (id_note_list:number) => {
        const url = '/note_task/tabel/' + id_note_list;
        router.push(url); 
    }

    const AddPage = () => {
        router.push('/note_list/add');
    }

    const DeleteNoteList = (id_note_list:number) => {
        const url = '/note_list/delete/' + id_note_list;
        router.push(url); 
    }

    const [notes, setNotes] = useState<NoteListData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });

  useEffect(() => {
    const fetchNotes = async () => {
        setLoading(true);
        const response = await GetNoteListAll(currentPage);

        if (response.status === 200) {
            setNotes(response.data);
            setPagination(response.paginate); // simpan info paginasi
        } else {
            setError(response.error || response.messages || "Failed to fetch notes");
        }
        setLoading(false);
    };
    fetchNotes();
  }, [currentPage]);
  if (loading) return <p>Loading...</p>;
  return (
    <PageLayout>
        <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Note List</h1>
                <div className="ml-auto">
                    <Button className="bg-black text-white" onClick={AddPage}>
                    <Plus/> Add
                    </Button>
                </div>
            </div>
            <div className="container-main">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mb-4 w-full">
                    
                    {(notes?.length === 0 || notes == null)  ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{error}</CardTitle>
                        <CardDescription></CardDescription>
                        </CardHeader>
                    </Card>
                    ):(
                        <>
                        {notes.map((note) => (
                        <Card className="flex flex-col justify-between" key={note.id_note_lists}>
                            <CardHeader>
                                <CardTitle>{note.title_note_lists}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap justify-end">
                                    <p className="text-md font-bold mb-2">{note.deskripsi_note_lists}</p>
                                </div>
                                <div className="flex flex-wrap justify-end">
                                    <p className="text-xs text-gray-500 mb-2">
                                        Dibuat Tanggal : {format(parseISO(note.created_at), "HH:mm:ss dd-MM-yyyy")}
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-end">
                                    {note.updated_at && (
                                        <p className="text-xs text-gray-500 mb-2">
                                            Diubah Tanggal : {format(parseISO(note.updated_at), "HH:mm:ss dd-MM-yyyy")}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-wrap gap-2 justify-end">
                                <Button 
                                    className="bg-black text-white w-full sm:w-auto"
                                    onClick={() => TaskPages(note.id_note_lists)}     
                                >
                                    <List /> Task
                                </Button>
                                <Button 
                                    className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                                    onClick={() => EditPages(note.id_note_lists)} 
                                >
                                    <Pencil /> Edit
                                </Button>
                                <Button 
                                    className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                                    onClick={() => DeleteNoteList(note.id_note_lists)} 
                                    >
                                    <Trash /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                        ))}
                        </>
                    )}
                </div>
            </div>       
            <footer className='mt-1 flex justify-center'>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            />
                            </PaginationItem>

                            {[...Array(pagination.last_page)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <PaginationItem key={pageNum}>
                                <PaginationLink
                                    href="#"
                                    isActive={pageNum === currentPage}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </PaginationLink>
                                </PaginationItem>
                            );
                            })}

                            <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                currentPage < pagination.last_page && setCurrentPage(currentPage + 1)
                                }
                            />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
            </footer>     
        </div>
    </PageLayout>
  )
}
