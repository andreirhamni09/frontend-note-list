
import PageLayout from '@/components/layout/layout';
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button';
import { CalendarCheck, CalendarX, MoveLeft, Pencil, PencilLine, Plus, Trash } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { useEffect, useState } from 'react';
import { GetNoteTaskAll, UpdateStatusNoteTask, DeleteNoteTask } from '@/api/note_task/api';
import { useRouter } from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";


interface NoteTaskData {
    id_note_list_task          : number,
    id_note_lists              : string,
    name_task                  : string,
    task_start_at              : string,
    task_end_at                : string,
    status_task                : string,
    created_at                 : string,
}

export default function TabelTask({id_note_list} : { id_note_list: string}) {
    const router = useRouter();
    const BackPages = () => {
        router.push('/');
    }
    
    const AddPages = () => {
        const url = '/note_task/add/' + id_note_list;
        router.push(url);
    }

    const EditPages = (id_note_task:number) => {
        const url = '/note_task/edit/' + id_note_task;
        router.push(url);
    } 

    const [notes, setNotes] = useState<NoteTaskData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const fetchNotes = async () => {
        setLoading(true);
        const response = await GetNoteTaskAll(id_note_list, currentPage);

        if (response.status === 200) {
            setNotes(response.data);
            setPagination(response.paginate);
        } else {
            setError(response.error || response.messages || "Failed to fetch notes");
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchNotes();
    }, [currentPage]);

    const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
    const UpdateStatus = async (id_note_task: number, status:string) => {
        setLoadingUpdateStatus(true);
        try {
            const response = await UpdateStatusNoteTask(id_note_task, status);
            // console.log(response)
            if (response.status === 200) {
            // Refresh data setelah update status
            fetchNotes(); 
            } else {
            setError(response.error || response.messages || "Gagal mengupdate status");
            }
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan saat mengupdate status.");
        }
        setLoadingUpdateStatus(false);
    };

    const [loadingDelete, setLoadingDelete] = useState(false);
    const DeleteTask = async (id_note_task: number) => {
        setLoadingDelete(true);
        try {
            const response = await DeleteNoteTask(id_note_task);
            // console.log(response)
            if (response.status === 200) {
            // Refresh data setelah update status
            fetchNotes(); 
            } else {
            setError(response.error || response.messages || "Gagal hapus task");
            }
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan saat hapus task.");
        }
        setLoadingDelete(false);
    };

    if (loading) return <p>Loading...</p>;
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen w-full">
                <div className="flex justify-between items-center mb-6">
                    <Button className="bg-black text-white mr-4" onClick={BackPages}>
                        <MoveLeft /> Kembali
                    </Button>
                    <h1 className="text-3xl font-bold">
                        Note Task
                    </h1>
                    <div className="ml-auto">
                        <Button 
                            className="bg-black text-white"
                            onClick={AddPages}
                        >
                            <Plus/> Add Task
                        </Button>
                    </div>
                </div>
                <div className="container-main">
                    <Table>
                        <TableCaption>Task Note List</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead className="w-[100px]">Nama Task</TableHead>
                                    <TableHead>Waktu Mulai</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className='text-center'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                        <TableBody>
                            
                            {(notes?.length === 0 || notes === null)  ? (                                
                                <TableRow>
                                    <TableCell colSpan={6} className='text-center'> 
                                        Belum Ada Task Yang Diinputkan
                                    </TableCell>
                                </TableRow>
                                ):(
                                <>
                                    {notes.map((note, index) => (
                                    <TableRow key={note.id_note_list_task}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {note.name_task}</TableCell>
                                        <TableCell>Jam : {format(parseISO(note.task_start_at), "HH:mm:ss")}, Tanggal : {format(parseISO(note.task_start_at), "dd-MM-yyyy")} </TableCell>
                                        <TableCell>Jam : {format(parseISO(note.task_end_at), "HH:mm:ss")}, Tanggal : {format(parseISO(note.task_end_at), "dd-MM-yyyy")} </TableCell>
                                        <TableCell className='text-center'>
                                            {(note.status_task === 'false') ? (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                        <span>
                                                            <CalendarX className="h-5 w-5 cursor-pointer"  />
                                                        </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>On Progress</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ) : (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                        <span>
                                                            <CalendarCheck className="h-5 w-5 cursor-pointer"  />
                                                        </span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Selesai</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </TableCell>
                                        <TableCell className='text-center'>
                                            {(note.status_task === 'false') ? (
                                                
                                                <Button 
                                                    className='bg-lime-500 hover:bg-lime-700 mr-1'
                                                    onClick={() => UpdateStatus(note.id_note_list_task, 'true')}
                                                    disabled={loadingUpdateStatus}
                                                >
                                                    <CalendarCheck />{loadingUpdateStatus ? 'Sedang Update Status...' : 'Update Status'}
                                                </Button>
                                            ) : (
                                                <Button 
                                                    className='bg-lime-500 hover:bg-lime-700 mr-1'
                                                    onClick={() => UpdateStatus(note.id_note_list_task, 'false')}
                                                    disabled={loadingUpdateStatus}
                                                >
                                                    <CalendarCheck />{loadingUpdateStatus ? 'Sedang Update Status...' : 'Update Status'}
                                                </Button>
                                            )}
                                            <Button 
                                                className='bg-blue-500 hover:bg-blue-700 mr-1'
                                                onClick={() => EditPages(note.id_note_list_task)}
                                            >
                                                <Pencil/>Update Data
                                            </Button>
                                            <Button 
                                                className='bg-red-500 hover:bg-red-700'
                                                onClick={() => DeleteTask(note.id_note_list_task)}
                                                disabled={loadingDelete}
                                                >
                                                <Trash/>{loadingDelete ? 'Sedang Melakukan Hapus Task...' : 'Hapus'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
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
    );
}