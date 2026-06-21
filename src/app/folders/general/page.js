'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import baseApi from '../../../services/baseApi';

export default function GeneralFoldersPage() {
  const [folders, setFolders] =
    useState([]);

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
    '/folders/general',
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setFolders(
  response.data
);
        } catch (error) {
          console.error(error);
        }
      };

    fetchFolders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

          <h1 className="text-3xl font-bold text-blue-900">
            General Folders
          </h1>

          <p className="text-slate-500 mt-2">
            Department folders
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {folders.map(
            (folder) => (
              <Link
                key={folder.id}
                href={`/folders/${folder.id}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl cursor-pointer">

                  <h3 className="text-xl font-bold text-blue-900">
                    {folder.name}
                  </h3>
<p className="text-slate-500 text-sm">
  Department:
  {folder.department?.name}
</p>
                  <p className="text-slate-500 mt-2">
                    {folder.type}
                  </p>

                </div>
              </Link>
            )
          )}

        </div>

      </div>

    </div>
  );

}