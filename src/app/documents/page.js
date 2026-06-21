'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import baseApi from '../../services/baseApi';

export default function DocumentsPage() {
    
  const searchParams =
    useSearchParams();

  const query =
    searchParams.get('q');
const router = useRouter();

const [search,
setSearch] =
  useState(query || '');
  const [documents,
    setDocuments] =
    useState([]);

  useEffect(() => {
    const searchDocuments =
      async () => {
        try {
          const token =
            localStorage.getItem(
              'token'
            );

          const response =
            await baseApi.get(
              `/documents/search?q=${query}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setDocuments(
            response.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    if (query) {
      searchDocuments();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-blue-900">
            Search Results
          </h1>

          <p className="text-slate-500 mt-2">
            Search: {query}
          </p>

        </div>
<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

  <h2 className="text-xl font-bold text-blue-900 mb-4">
    Search Documents
  </h2>

  <div className="flex gap-3">

    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      placeholder="Search by title, tags or OCR text..."
      className="flex-1 border-2 border-slate-400 rounded-lg px-4 py-3 text-slate-900"
    />

    <button
      onClick={() =>
        router.push(
          `/documents?q=${search}`
        )
      }
      className="bg-blue-700 text-white px-5 rounded-lg"
    >
      <Search size={20} />
    </button>

  </div>

</div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

          {documents.length === 0 ? (
            <p className="text-slate-500">
              No documents found
            </p>
          ) : (
            documents.map(
              (document) => (
                <div
  key={document.id}
  onClick={() =>
    router.push(
      `/folders/${document.folder.id}`
    )
  }
  className="border-b py-4 cursor-pointer hover:bg-slate-50"
>
                  <p className="font-semibold text-slate-900">
                    {document.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {document.documentType}
                  </p>

                  <p className="text-sm text-slate-500">
                    Tags:
                    {document.tags}
                  </p>

                  <p className="text-sm text-slate-500">
  Folder: {document.folder?.name}
</p>

<p className="text-sm text-slate-500">
  Uploaded By: {document.uploadedBy?.name}
</p>

<button
  onClick={() =>
    router.push(
      `/folders/${document.folder.id}`
    )
  }
  className="mt-2 bg-blue-700 text-white px-3 py-1 rounded"
>
  Open Folder
</button>
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}