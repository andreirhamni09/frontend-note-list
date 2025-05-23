"use client"
import { ArrowBigLeft, Plus } from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AddNoteList } from '@/api/note_list/api';


interface AddData {
    title_note_lists        : string,
    deskripsi_note_lists    : string,
}

export default function AddNoteListForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        title_note_lists        : '',
        deskripsi_note_lists    : '',
    });

    const BackToDashboard = () => {
        router.push('/');
    }

    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<AddData>();
    const [apiErrorMessages, setApiErrorMessages]    = useState("");    
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const data    = {
            title_note_lists        : form.title_note_lists,
            deskripsi_note_lists    : form.deskripsi_note_lists,
        };
        const res  = await AddNoteList(data);
        if(res.status === 200) {
            router.push('/')
        } else if(res.status === 422){
            setError(res.error)
            setForm(prev => ({
                ...prev,
                email_user: res.data?.title_note_lists || '',
                password_user: res.data?.deskripsi_note_lists || ''
            }));
        } else if(res.status === 500) {
            setApiErrorMessages(res.messages);
        }
        setLoading(false);
    };

    return (
        <PageLayout>
            <div className="container">
                <div className="container-main flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
                    <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                        <CardHeader className="flex flex-col items-center justify-center">
                            <CardTitle className="text-2xl">Add Note List</CardTitle>
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
                                    {error?.title_note_lists && (
                                        <p className="text-sm text-red-500 mt-1">{error?.title_note_lists[0]}</p>
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
                                    {error?.deskripsi_note_lists && (
                                        <p className="text-sm text-red-500 mt-1">{error?.deskripsi_note_lists[0]}</p>
                                    )}
                                </div>
                                <div className="mb-6 flex items-center justify-center gap-2">
                                    <Button 
                                        type='button'
                                        className="w-1/2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-800 flex items-center justify-center gap-1"
                                        onClick={BackToDashboard}
                                    >
                                        <ArrowBigLeft />Back
                                    </Button>
                                    <Button type="submit" className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-1" disabled={loading}>
                                        <Plus /> {loading ? 'Adding Note List...' : 'Add'}
                                    </Button>
                                </div>
                                { apiErrorMessages && <p className="text-sm text-red-500 mt-1">{apiErrorMessages}</p> }
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    )
}
