'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import baseApi from '../../../services/baseApi';
import api from '../../../services/api';
export default function DocumentTypesPage() {
    const router = useRouter();
  const [name, setName] = useState('');
  const [documentTypes, setDocumentTypes] =
    useState([]);

  const fetchDocumentTypes = async () => {
    try {
      const token =
        localStorage.getItem('token');

      const response =
        await baseApi.get(
          '/document-types',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setDocumentTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 useEffect(() => {
  const checkAdmin = async () => {
    try {
      const token =
        localStorage.getItem('token');

      if (!token) {
        router.push('/');
        return;
      }

      const response =
        await api.get('/me', {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      if (
        response.data.role !==
        'ADMIN'
      ) {
        router.push('/dashboard');
        return;
      }

      fetchDocumentTypes();
    } catch (error) {
      console.error(error);
      router.push('/');
    }
  };

  checkAdmin();
}, [router]);

  const handleAdd = async () => {
    try {
      const token =
        localStorage.getItem('token');

      await baseApi.post(
        '/document-types',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName('');
      fetchDocumentTypes();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          'Failed'
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const token =
        localStorage.getItem('token');

      await baseApi.delete(
        `/document-types/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDocumentTypes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Manage Document Types
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Document Type"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded-lg flex-1"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {documentTypes.map((type) => (
          <div
            key={type.id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <span>{type.name}</span>

            <button
              onClick={() =>
                handleDelete(type.id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}