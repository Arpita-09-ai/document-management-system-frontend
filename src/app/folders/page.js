'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import baseApi from '../../services/baseApi';

export default function FoldersPage() {
  const [myFolders,setMyFolders] =useState([]);
  const [role, setRole] =
  useState('');
  const [name, setName] = useState('');
  const [type, setType] =
    useState('GENERAL');

  
const fetchFolders = async () => {
    try {
      const token =
        localStorage.getItem('token');

      const response =
  await baseApi.get(
    '/folders/my-folders',
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

setMyFolders(response.data);

      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
     setRole(
    localStorage.getItem(
      'role'
    ) || ''
  );

    fetchFolders();
  }, []);

  const createFolder = async () => {
    try {
      const token =
        localStorage.getItem('token');

      await baseApi.post(
        '/folders',
        {
          name,
          type,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setName('');
      setType('GENERAL');

      fetchFolders();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto flex gap-6">
<div className="w-72 bg-white rounded-2xl shadow-lg p-6 h-fit">

  <h2 className="text-xl font-bold text-blue-900 mb-6">
    Folders
  </h2>

  <div className="space-y-3">

    <Link href="/folders/general">
      <div className="p-3 rounded-lg hover:bg-slate-100 text-slate-900 placeholder:text-slate-500 cursor-pointer">
        📁 General Folders
      </div>
    </Link>

    <Link href="/folders/confidential">
      <div className="p-3 rounded-lg hover:bg-slate-100 text-slate-900 placeholder:text-slate-500 cursor-pointer">
        🔒 Confidential Folders
      </div>
    </Link>

    <Link href="/folders/my-requests">
      <div className="p-3 rounded-lg hover:bg-slate-100 text-slate-900 placeholder:text-slate-500 cursor-pointer">
        📨 My Requests
      </div>
    </Link>

    <Link href="/folders/manage-requests">
      <div className="p-3 rounded-lg hover:bg-slate-100 text-slate-900 placeholder:text-slate-500 cursor-pointer">
        ✅ Manage Requests
      </div>
    </Link>
{role === 'ADMIN' && (
  <>
    

    <Link href="/admin/document-types">
      <div className="p-3 rounded-lg hover:bg-slate-100 text-slate-900 cursor-pointer">
        📄 Document Types
      </div>
    </Link>

    <Link href="/announcements">
      <div className="p-3 rounded-lg hover:bg-slate-100 text-slate-900 cursor-pointer">
        📢 Announcements
      </div>
    </Link>

    
  </>
)}
  </div>

</div>
<div className="flex-1">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Folders
        </h1>

        {/* Create Folder */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

  <h2 className="text-xl font-bold mb-4 text-slate-900">
    Create Folder
  </h2>

  <input
    type="text"
    placeholder="Folder Name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
    className="w-full border p-3 rounded-lg mb-4 text-slate-900"
  />

  <select
    value={type}
    onChange={(e) =>
      setType(e.target.value)
    }
    className="w-full border p-3 rounded-lg mb-4 text-slate-900"
  >
    <option value="GENERAL">
      GENERAL
    </option>

    <option value="CONFIDENTIAL">
      CONFIDENTIAL
    </option>
  </select>

  <button
    onClick={createFolder}
    className="bg-blue-700 text-white px-6 py-3 rounded-lg"
  >
    Create Folder
  </button>

</div>
            <div className="bg-white rounded-2xl shadow-lg p-6">

  <h2 className="text-xl font-bold text-blue-900 mb-4">
    My Folders
  </h2>

  {myFolders.length === 0 ? (
  <p className="text-slate-500">
    No folders found
  </p>
) : (
    <div className="space-y-3">

      {myFolders.map(
  (folder) => (
    <Link
      key={folder.id}
      href={`/folders/${folder.id}`}
    >
      <div className="border rounded-lg p-4 hover:bg-slate-50">

        <p className="font-semibold text-slate-900">
          {folder.name}
        </p>

        <div className="flex gap-2 mt-2">

  <span className="text-sm text-slate-500">
    {folder.type}
  </span>

  {folder.permissions?.length > 0 && (
    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
      Access Granted
    </span>
  )}

</div>

      </div>
    </Link>
  )
)}
 </div>
  )}
</div>
        
        </div>

      </div>

    </div>
  );
}