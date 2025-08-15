import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { PageProps } from '@inertiajs/core';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type WriteNoteForm = {
    title: string;
    note: string;
}

type Note = {
    id: number;
    title: string;
    note: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Write Note',
        href: '/write-note',
    },
];

interface Props extends PageProps {
    notes: Note[];
}

export default function WriteNote({ notes }: Props) {

    const { data, setData, post, processing, errors, reset } = useForm<Required<WriteNoteForm>>({
        title: '',
        note: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('write-note.store'), {
            onFinish: () => reset('title', 'note'),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Do you really want to delete this note?')) {
            router.delete(route('write-note.destroy', id));
        }
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Write Note" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex h-full flex-col gap-5">
                    <h1 className="text-xl font-bold">Write Note</h1>
                    <div className='grid grid-cols-2'>
                        <form method="POST" className='flex flex-col items-center gap-6 w-full' onSubmit={submit}>
                                <div className='grid gap-2 w-lg'>
                                    <Label>Note title</Label>
                                    <Input
                                        id='title'
                                        type='text'
                                        required
                                        placeholder='Ex. Market list'
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className='grid gap-2  w-lg'>
                                    <Label>Note field</Label>
                                    <Textarea
                                        id='note'
                                        required
                                        placeholder='Write what you want here...'
                                        value={data.note}
                                        onChange={(e) => setData('note', e.target.value)}
                                        disabled={processing}>
                                        </Textarea>
                                    <InputError message={errors.note} />
                                </div>
                            <Button type="submit" disabled={processing}>
                                Create note
                            </Button>
                        </form>
                        <div className='flex flex-col items-center gap-6 w-full'>
                            {notes.length === 0 ? (
                                <p>You have no notes yet.</p>
                            ) : (
                                <div>
                                    {notes.map((note) => (
                                        <div className='flex flex-col m-2 p-3 border rounded w-2xl' key={note.id}>
                                            <div>
                                                <h3 className='font-bold'>{note.title}</h3>
                                                <hr />
                                                <p>{note.note}</p>
                                            </div>
                                            <div className='mt-5 flex items-center justify-between'>
                                                <small>{new Date(note.created_at).toLocaleDateString()}</small>
                                                <Button type='submit' onClick={() => handleDelete(note.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
