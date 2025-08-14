import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Write Note',
        href: '/write-note',
    },
];

export default function Dashboard() {

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        mensagem: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDeafult();
        console.log("Dados enviados", formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Write Note" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div>
                            <label>E-mail:</label>
                            <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div>
                            <label>Mensagem:</label>
                            <textarea
                            name="mensagem"
                            value={formData.mensagem}
                            onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
