
import PageLayout from '@/components/layout/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { MoveLeft, Trash } from 'lucide-react';
import { AddNoteTask } from '@/api/note_task/api';
import { format, parseISO } from "date-fns";

interface Row {
    name_task: string;
    task_start_at: string;
    task_end_at: string;
};
export default function AddTaskForm({id_note_list} : {id_note_list: string}) {
    const router = useRouter();
    const BackPages = () => {
        const url = '/note_task/tabel/'+id_note_list;
        router.push(url);
    }
    const [rows, setRows] = useState<Row[]>([
        { name_task: '', task_start_at: '', task_end_at: '' },
    ]);

    const handleChange = (index: number, field: keyof Row, value: string) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
        // Hapus error field yang sedang diubah
        setErrors(prev => {
            const newErrors = { ...prev };
            if (newErrors[index]) {
                delete newErrors[index][field];
                if (Object.keys(newErrors[index]).length === 0) {
                    delete newErrors[index];
                }
            }
            return newErrors;
        });
    };

    const handleAddRow = () => {
        setRows([...rows, { name_task: '', task_start_at: '', task_end_at: '' }]);
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<number, Partial<Row>>>({});
    const [apiErrorMessages, setApiErrorMessages]    = useState("");    
    const [generalError, setGeneralError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const name_task     = rows.map((row) => row.name_task);
        const task_start_at = rows.map((row) => format(parseISO(row.task_start_at), "yyyy-MM-dd HH:mm:ss"));
        const task_end_at   = rows.map((row) => format(parseISO(row.task_end_at), "yyyy-MM-dd HH:mm:ss"));
        const data = {
            id_note_lists   : id_note_list,
            name_task       : name_task,
            task_start_at   : task_start_at,
            task_end_at     : task_end_at
        };
        const res  = await AddNoteTask(data);
        if(res.status === 200) {
            BackPages();
        } else if(res.status === 422){
            const rawErrors = res.error;
            const formattedErrors: Record<number, Partial<Row>> = {};

            for (const key in rawErrors) {
                if (key.includes('.')) {
                    const [field, indexStr] = key.split('.');
                    const index = parseInt(indexStr);
                    if (!formattedErrors[index]) {
                        formattedErrors[index] = {};
                    }
                    formattedErrors[index][field as keyof Row] = rawErrors[key][0];
                }
            }

            setErrors(formattedErrors);

            if (rawErrors.name_task) {
                setGeneralError(rawErrors.name_task[0]);
            } else if (rawErrors.task_array) {
                setGeneralError(rawErrors.task_array[0]);
            }
        } else if(res.status === 500) {
            setApiErrorMessages(res.messages);
        }
        setLoading(false);
    };
    
    const handleDeleteRow = (index: number) => {
        const updated = rows.filter((_, i) => i !== index);
        setRows(updated);
        // Update juga error
        setErrors(prev => {
            const newErrors: typeof prev = {};
            Object.keys(prev).forEach((key) => {
                const i = parseInt(key);
                if (i < index) {
                    newErrors[i] = prev[i];
                } else if (i > index) {
                    newErrors[i - 1] = prev[i];
                }
            });
            return newErrors;
        });
    };
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen w-full">
                <div className="flex justify-between items-center mb-6">
                    <Button className="bg-black text-white mr-4" onClick={BackPages}>
                        <MoveLeft /> Kembali
                    </Button>
                    <h1 className="text-3xl font-bold">
                        Add Task 
                    </h1>
                </div>
                <div className="container-main">
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Mulai</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Action</TableHead>                            
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Input
                                        value={row.name_task}
                                        onChange={(e) => handleChange(index, 'name_task', e.target.value)}
                                        placeholder="name_task"
                                        required
                                        />
                                        {generalError && (
                                            <p className="text-sm text-red-500 mb-2">{generalError}</p>
                                        )}
                                        {errors[index]?.name_task && (
                                            <p className="text-sm text-red-500 mt-1">{errors[index].name_task}</p>
                                        )}
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Input
                                        type="datetime-local"
                                        value={row.task_start_at}
                                        onChange={(e) => handleChange(index, 'task_start_at', e.target.value)}
                                        required
                                        />
                                        {errors[index]?.task_start_at && (
                                            <p className="text-sm text-red-500 mt-1">{errors[index].task_start_at}</p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                        type="datetime-local"
                                        value={row.task_end_at}
                                        onChange={(e) => handleChange(index, 'task_end_at', e.target.value)}
                                        required
                                        />
                                        
                                        {errors[index]?.task_end_at && (
                                            <p className="text-sm text-red-500 mt-1">{errors[index].task_end_at}</p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" variant="destructive" onClick={() => handleDeleteRow(index)}>
                                            <Trash/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>

                        <div className="flex gap-2">
                            <Button type="button" onClick={handleAddRow}>+ Tambah Baris</Button>
                            <Button type="submit">{loading ? 'Adding Note Task...' : 'Simpan'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
}