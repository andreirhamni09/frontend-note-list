"use client";

import { ArrowBigLeft, Save } from 'lucide-react';
import PageLayout from '@/components/layout/layout';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { GetTaskById, UpdateNoteTask } from '@/api/note_task/api'; // Ambil data dari API
import { parseISO, format } from "date-fns";

interface ErrorDataJson {
  name_task: string;
  task_start_at: string;
  task_end_at: string;
}

export default function EditNoteTaskForm({ id_note_task }: { id_note_task: string }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name_task: '',
    task_start_at: '',
    task_end_at: ''
  });

  const [loading, setLoading] = useState(false);
  const [apiErrorMessages, setApiErrorMessages] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const convertToDatetimeLocal = (datetimeStr: string) => {
    return datetimeStr ? datetimeStr.slice(0, 16).replace(' ', 'T') : '';
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const response = await GetTaskById(id_note_task);
      console.log(response);

      if (response.status === 200) {
        setForm({
          name_task: response.data?.name_task || '',
          task_start_at: convertToDatetimeLocal(response.data?.task_start_at),
          task_end_at: convertToDatetimeLocal(response.data?.task_end_at),
        });
      } else {
        setApiErrorMessages(response.error || response.messages || 'Failed to fetch data');
      }

      setLoading(false);
    };

    fetchNotes();
  }, [id_note_task]);

  const BackPages = () => {
    router.back();
  };

  
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState<Partial<ErrorDataJson>>({});
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    setError({});
    setApiErrorMessages('');
    const data    = {
        name_task: form.name_task,
        task_start_at: format(parseISO(form.task_start_at), "yyyy-MM-dd HH:mm:ss"),
        task_end_at: format(parseISO(form.task_end_at), "yyyy-MM-dd HH:mm:ss")
    };

    const response = await UpdateNoteTask(id_note_task, data);

    if (response.status === 200) {
        router.back(); // redirect ke dashboard setelah berhasil
    } else if (response.status === 422) {
        setError(response.error); // validasi dari backend
        setForm({
            name_task: response.data?.name_task || '',
          task_start_at: convertToDatetimeLocal(response.data?.task_start_at),
          task_end_at: convertToDatetimeLocal(response.data?.task_end_at),
        });
    } else {
        setApiErrorMessages(response.error || response.messages || "Update failed");
    }
    setLoadingUpdate(false);
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <PageLayout>
      <div className="container">
        <div className="container-main flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
          <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <CardHeader className="flex flex-col items-center justify-center">
              <CardTitle className="text-2xl">Update Note Task</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit}>
              {apiErrorMessages && (
                <p className="text-red-600 mb-4 text-sm">{apiErrorMessages}</p>
              )}

              <div className="mb-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name_task" className='font-bold'>Nama Task</Label>
                  <Input
                    type="text"
                    name="name_task"
                    value={form.name_task}
                    onChange={handleChangeInput}
                    placeholder="Nama Task"
                    required
                  />
                  {error.name_task && (
                    <p className="text-sm text-red-500 mt-1">{error.name_task}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="task_start_at" className='font-bold'>Waktu Mulai</Label>
                  <Input
                    type="datetime-local"
                    name="task_start_at"
                    value={form.task_start_at}
                    onChange={handleChangeInput}
                    required
                  />
                  {error.task_start_at && (
                    <p className="text-sm text-red-500 mt-1">{error.task_start_at}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="task_end_at" className='font-bold'>Deadline</Label>
                  <Input
                    type="datetime-local"
                    name="task_end_at"
                    value={form.task_end_at}
                    onChange={handleChangeInput}
                    required
                  />
                  {error.task_end_at && (
                    <p className="text-sm text-red-500 mt-1">{error.task_end_at}</p>
                  )}
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center gap-2">
                <Button
                  type="button"
                  className="w-1/2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-800 flex items-center justify-center gap-1"
                  onClick={BackPages}
                >
                  <ArrowBigLeft /> Back
                </Button>
                
                
                <Button
                  type="submit"
                  className="w-1/2 text-white py-2 rounded flex items-center justify-center gap-1"
                >
                  <Save /> {loadingUpdate ? 'Update Note Task...' : 'Simpan'}
                </Button>
              </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
