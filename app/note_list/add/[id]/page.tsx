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

export default function Page() {
  return (
    <PageLayout>
        <div className="container">
            <div className="container-main flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
                <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <CardHeader className="flex flex-col items-center justify-center">
                        <CardTitle className="text-2xl">Add Note List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="mb-4">
                                <Input  
                                    type="text" 
                                    placeholder="Title Note List"
                                    className="w-full px-4 py-2 border rounded" 
                                    id="title_note_lists"
                                    name="title_note_lists"
                                />
                            </div>
                            <div className="mb-4">
                                <Textarea 
                                    placeholder="Deskripsi Note List" 
                                    className="w-full px-4 py-2 border rounded"
                                    id="deskripsi_note_lists"
                                    name="deskripsi_note_lists"
                                />
                            </div>
                            <div className="mb-6 flex items-center justify-center gap-2">
                                <button type="submit" className="w-1/2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-800 flex items-center justify-center gap-1">
                                    Back <ArrowBigLeft />
                                </button>
                                <button type="submit" className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-1">
                                    Add <Plus />
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </PageLayout>
  )
}
