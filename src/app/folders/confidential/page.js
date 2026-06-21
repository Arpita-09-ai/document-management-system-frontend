'use client';

import { useEffect, useState } from 'react';
import baseApi from '../../../services/baseApi';
import Link from 'next/link';
export default function ConfidentialFoldersPage() {
  const [folders, setFolders] =
    useState([]);
const [isAdmin, setIsAdmin] =
  useState(false);
  useEffect(() => {
    const fetchFolders =
      async () => {
        try {
          const token =
            localStorage.getItem(
              'token'
            );

         const response =
  await baseApi.get(
    '/folders/confidential',
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

          setFolders(
  response.data.folders
);

setIsAdmin(
  response.data.isAdmin
);
        } catch (error) {
          console.error(error);
        }
      };

    fetchFolders();
  }, []);

  const requestAccess =
    async (folderId) => {
      try {
        const token =
          localStorage.getItem(
            'token'
          );

        const response =
          await baseApi.post(
            `/folders/${folderId}/request-access`,
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        alert(
          response.data.message
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            Confidential Folders
          </h1>

          <div className="space-y-4">

            {folders.map(
              (folder) => (
                <Link
  key={folder.id}
  href={`/folders/${folder.id}`}
>
  <div className="border rounded-xl p-4 cursor-pointer hover:bg-slate-50">
                  <h3 className="font-bold text-slate-900">
                    {folder.name}
                  </h3>
<p className="text-slate-500 text-sm">
  Department:
  {folder.department?.name}
</p>
                  <p className="text-slate-500 text-sm">
                    Confidential Folder
                  </p>

                  {!isAdmin && (
  <button
    onClick={(e) =>{
      e.preventDefault();
      requestAccess(folder.id);
    }}
    className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg"
  >
    Request Access
  </button>
)}
                </div>
                </Link>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}