"use client";

import { ArrowBigLeft, Save } from 'lucide-react';
import PageLayout from '@/components/layout/layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetNoteListById, UpdateNoteList } from '@/api/note_list/api';

interface ErrorDataJson {
  title_note_lists: string,
  deskripsi_note_lists: string,
}

export default function EditNoteListForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Partial<ErrorDataJson>>({});
  const [apiErrorMessages, setApiErrorMessages] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState({
    title_note_lists: '',
    deskripsi_note_lists: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchNotes = async () => {
      setLoading(true);
      const response = await GetNoteListById(id);

      if (response.status === 200) {
        setForm({
          title_note_lists: response.data?.title_note_lists || '',
          deskripsi_note_lists: response.data?.deskripsi_note_lists || '',
        });
        setError({});
      } else {
        setApiErrorMessages(response.error || response.messages || 'Failed to fetch data');
      }

      setLoading(false);
    };

    fetchNotes();
  }, [id]);

  const BackToDashboard = () => {
    router.push('/');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    setApiErrorMessages('');
    const data    = {
        id_note_lists           : id,
        title_note_lists        : form.title_note_lists,
        deskripsi_note_lists    : form.deskripsi_note_lists,
    };

    const response = await UpdateNoteList(data);

    if (response.status === 200) {
        router.push('/'); // redirect ke dashboard setelah berhasil
    } else if (response.status === 422) {
        setError(response.error); // validasi dari backend
        setForm({
          title_note_lists: response.data?.title_note_lists || '',
          deskripsi_note_lists: response.data?.deskripsi_note_lists || '',
        });
    } else {
      setApiErrorMessages(response.error || response.messages || "Update failed");
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="container-main flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
          <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <CardHeader className="flex flex-col items-center justify-center">
              <CardTitle className="text-2xl">Edit Note List</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Title Note List"
                    className="w-full px-4 py-2 border rounded"
                    id="title_note_lists"
                    value={form.title_note_lists}
                    onChange={handleChangeInput}
                    name="title_note_lists"
                  />
                  {error.title_note_lists && (
                    <p className="text-sm text-red-500 mt-1">{error.title_note_lists}</p>
                  )}
                </div>
                <div className="mb-4">
                  <Textarea
                    placeholder="Deskripsi Note List"
                    className="w-full px-4 py-2 border rounded"
                    id="deskripsi_note_lists"
                    value={form.deskripsi_note_lists}
                    onChange={handleChangeTextArea}
                    name="deskripsi_note_lists"
                  />
                  {error.deskripsi_note_lists && (
                    <p className="text-sm text-red-500 mt-1">{error.deskripsi_note_lists}</p>
                  )}
                </div>
                <div className="mb-6 flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    className="w-1/2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-800 flex items-center justify-center gap-1"
                    onClick={BackToDashboard}
                  >
                    <ArrowBigLeft />Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-1"
                    disabled={loading}
                  >
                    <Save /> {loading ? 'Saving...' : 'Update'}
                  </Button>
                </div>
                {apiErrorMessages && (
                  <p className="text-sm text-red-500 mt-1">{apiErrorMessages}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
