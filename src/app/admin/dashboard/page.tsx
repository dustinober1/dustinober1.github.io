'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/admin/messages');
            if (res.status === 401) {
                router.push('/admin'); // Redirect to login
                return;
            }
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (err) {
            console.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(messages.filter(msg => msg.id !== id));
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            alert('Error deleting message');
        }
    };

    const logout = async () => {
        // In a real app we'd hit an API to clear cookie, 
        // but for now we can just redirect or rely on client-side cleanup if needed.
        // Ideally we should have a /api/admin/logout endpoint.
        document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin');
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                    Logout
                </button>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

                {messages.length === 0 ? (
                    <p className="text-gray-400">No messages found.</p>
                ) : (
                    <div className="grid gap-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{msg.subject || 'No Subject'}</h3>
                                        <div className="text-sm text-gray-400 mt-1">
                                            From: <span className="text-blue-400">{msg.name}</span> &lt;{msg.email}&gt;
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {new Date(msg.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteMessage(msg.id)}
                                        className="text-gray-500 hover:text-red-500 p-2 transition-colors"
                                        title="Delete Message"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed bg-gray-900/50 p-4 rounded border border-gray-700/50">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
