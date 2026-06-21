'use client';
import {Upload} from 'lucide-react';
import documentApi from '../../../services/documentApi';
import { useEffect, useState,useRef, } from 'react';
import { useParams } from 'next/navigation';
import baseApi from '../../../services/baseApi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function FolderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const alertedRef =
  useRef(false);
  const [replaceFile,
setReplaceFile] =
useState(null);
  const [renamingFolder,
  setRenamingFolder] =
  useState(false);
const [newFolderName,
  setNewFolderName] =
  useState('');
const [loading, setLoading] =
  useState(false);
  const [folder, setFolder] =
    useState(null);
const [title, setTitle] =
  useState('');

const [documentType, setDocumentType] =
  useState('');

const [tags, setTags] =
  useState('');

const [file, setFile] =
  useState(null);
const [folders, setFolders] =
  useState([]);
const [documentTypes,
setDocumentTypes] =
  useState([]);
  const handleUpload = async () => {
    
  try {
    setLoading(true);
    const token =
      localStorage.getItem('token');

    if (
      !title.trim() ||
      !documentType ||
      !file
    ) {
      alert(
        'Title, Document Type and File are required'
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      'document',
      file
    );

    formData.append(
      'title',
      title
    );

    formData.append(
      'documentType',
      documentType
    );

    formData.append(
      'tags',
      tags
    );

    formData.append(
      'folderId',
      params.id
    );

    const response =
      await documentApi.post(
        '/upload',
        formData,
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

    window.location.reload();

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data
        ?.message ||
        'Upload failed'
    );
    
  }
  finally {
  setLoading(false);
}
};
const handleDownload = async (
  documentId,
  fileName
) => {
  try {
    const token =
      localStorage.getItem('token');

    const response =
      await axios.get(
        `https://document-management-system-b3ao.onrender.com/api/documents/${documentId}/download`,
        {
          responseType:
            'blob',

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([
          response.data,
        ])
      );

    const link =
      document.createElement(
        'a'
      );

    link.href = url;

    link.setAttribute(
      'download',
      fileName
    );

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  } catch (error) {
    console.error(error);

    alert(
      'Download failed'
    );
  }
};
const handleCreateCopy =
  async (documentId) => {
    try {
      const token =
        localStorage.getItem('token');

      const response =
        await baseApi.post(
          `/documents/${documentId}/create-copy`,
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

      window.location.reload();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          'Failed to create copy'
      );
    }
  };
  const handleDeleteDocument =
  async (documentId) => {
    try {
      const token =
        localStorage.getItem(
          'token'
        );

      const response =
        await baseApi.delete(
          `/documents/${documentId}`,
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

      window.location.reload();
    } catch (error) {
      

      alert(
        error.response?.data
          ?.message ||
          'Delete failed'
      );
    }
  };
  const handleDeleteFolder =
  async () => {
    try {
      const token =
        localStorage.getItem(
          'token'
        );

      const response =
        await baseApi.delete(
          `/folders/${folder.id}`,
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

     router.push('/folders');
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          'Delete failed'
      );
    }
  };
  const handleReplaceFile =
  async (documentId) => {

    if (!replaceFile) {
      alert(
        'Select a file first'
      );
      return;
    }

    try {

      const token =
        localStorage.getItem(
          'token'
        );

      const formData =
        new FormData();

      formData.append(
        'document',
        replaceFile
      );

      const response =
        await documentApi.patch(
  `/${documentId}/update-file`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert(
        response.data.message
      );

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          'Update failed'
      );
    }
};
  const handleRenameDocument =
  async (
    documentId,
    currentTitle,
     uploadedById
  ) => {
    const userId = Number(
      localStorage.getItem(
        'userId'
      )
    );

    if (
      uploadedById !== userId
    ) {
      alert(
        'You can only rename your own documents'
      );
      return;
    }

    const newTitle =
      prompt(
        'Enter new document name',
        currentTitle
      );

    if (!newTitle) {
      return;
    }

    try {
      const token =
        localStorage.getItem(
          'token'
        );

      const response =
        await baseApi.patch(
          `/documents/${documentId}`,
          {
            title: newTitle,
          },
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

      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          'Rename failed'
      );
    }
  };
  const handleRenameFolder =
  async () => {

console.log('folder.ownerId', folder.ownerId);

if (!newFolderName?.trim()) {
  return;
}

    try {

      const token =
        localStorage.getItem(
          'token'
        );

      const response =
        await baseApi.patch(
          `/folders/${folder.id}`,
          {
            name: newFolderName,
          },
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

     setFolder({
  ...folder,
  name: newFolderName,
});

setRenamingFolder(false);

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          'Rename failed'
      );
    }
  };
  const handleMoveDocument =
  async (
    documentId,
    folderId
  ) => {
    if (!folderId) {
      return;
    }
    try {
      const token =
        localStorage.getItem(
          'token'
        );

      const response =
        await baseApi.patch(
          `/documents/${documentId}/move`,
          {
            folderId,
          },
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

      window.location.reload();

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          'Move failed'
      );
    }
  };
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        
        const token =
          localStorage.getItem('token');

        const response =
          await baseApi.get(
            `/folders/${params.id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
          const foldersResponse =
  await baseApi.get(
    '/folders',
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

setFolders(
  foldersResponse.data
);
const documentTypeResponse =
  await baseApi.get(
    '/document-types',
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
setFolder(response.data);
setDocumentTypes(
  documentTypeResponse.data
);
        setFolder(response.data);
      }catch (error) {
  if (
    error.response?.status === 404
  ) {
    if (!alertedRef.current) {
      alertedRef.current = true;

      alert(
        'Folder no longer exists'
      );
    }

    router.replace('/folders');
    return;
  }

}
    };

    fetchFolder();
  }, [params.id]);

  if (!folder) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

          <h1 className="text-3xl font-bold text-blue-900">
            {folder.name}
          </h1>
          {renamingFolder && (
  <div className="mt-4 flex gap-2">

    <input
      type="text"
      value={newFolderName}
      onChange={(e) =>
        setNewFolderName(
          e.target.value
        )
      }
      className="border p-2 rounded-lg text-slate-900"
    />

    <button
      onClick={handleRenameFolder}
      className="bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      Save
    </button>

    <button
      onClick={() =>
        setRenamingFolder(false)
      }
      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    >
      Cancel
    </button>

  </div>
)}
<button
  onClick={handleDeleteFolder}
  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-3"
>
  Delete Folder
</button>
<button
  onClick={() => {

  const userId = Number(
    localStorage.getItem('userId')
  );

  const role =
    localStorage.getItem('role');

  if (
    role !== 'ADMIN' &&
    folder.ownerId !== userId
  ) {
    alert(
      'You can only rename your own folders'
    );
    return;
  }

  setNewFolderName(
    folder.name
  );

  setRenamingFolder(true);

}}
  className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 ml-3"
>
  Rename Folder
</button>

          <p className="text-slate-500 mt-2">
            {folder.type}
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

  <h2 className="text-xl font-bold text-blue-900 mb-4">
  Upload Document
</h2>

<label className="block text-sm font-semibold text-slate-700 mb-2">
  Title
</label>

<input
  type="text"
  placeholder="Enter document title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full border-2 border-slate-300 rounded-xl p-3 mb-5 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
/>
<select
  value={documentType}
  onChange={(e) =>
    setDocumentType(
      e.target.value
    )
  }
  className="w-full border p-3 rounded-lg mb-4 text-slate-900"
>
  <option value="">
    Select Document Type
  </option>

  {documentTypes.map((type) => (
    <option
      key={type.id}
      value={type.name}
    >
      {type.name}
    </option>
  ))}
</select>
<label className="block text-sm font-semibold text-slate-700 mb-2">
  Tags
</label>

<input
  type="text"
  placeholder="safety, tender, audit"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
  className="w-full border-2 border-slate-300 rounded-xl p-3 mb-5 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
/>

<label className="block text-sm font-semibold text-slate-700 mb-2">
  Document
</label>

<input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 mb-6 text-slate-700 bg-slate-50"
/>

<button
  onClick={handleUpload}
  disabled={loading}
  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
>
  <Upload size={20} />

  {loading
    ? 'Uploading...'
    : 'Upload Document'}
</button>

</div>
<div className="bg-white rounded-2xl shadow-lg p-6">

  <h2 className="text-xl font-bold text-blue-900 mb-4">
    Documents
  </h2>

  {folder.documents.length === 0 ? (
    <p className="text-slate-500">
      No documents found
    </p>
  ) : (
    folder.documents.map(
  (document) => (
    <div
      key={document.id}
      className="border-b py-3"
    >
      <p className="font-semibold text-slate-900">
        {document.title}
      </p>

      <p className="text-sm text-slate-500">
        {document.documentType}
      </p>

      <div className="flex gap-3 mt-3">

        <button
  onClick={() =>
  handleDownload(
    document.id,
    document.originalFileName
  )
}
  className="bg-blue-700 text-white px-3 py-1 rounded"
>
  Download
</button>

        <button
  onClick={() =>
    handleCreateCopy(
      document.id
    )
  }
  className="bg-orange-500 text-white px-3 py-1 rounded"
>
  Create Copy
</button>
<input
  type="file"
  onChange={(e) =>
    setReplaceFile(
      e.target.files[0]
    )
  }
/>

<button
  onClick={() =>
    handleReplaceFile(
      document.id
    )
  }
  className="bg-purple-600 text-white px-3 py-1 rounded "
>
  Update File
</button>
<button
  onClick={() =>
    handleDeleteDocument(
      document.id
    )
  }
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Delete
</button>
<button
  onClick={() =>
    handleRenameDocument(
      document.id,
      document.title,
      document.uploadedById
    )
  }
  className="bg-green-600 text-white px-3 py-1 rounded"
>
  Rename
</button>
<select
  onChange={(e) =>
    handleMoveDocument(
      document.id,
      e.target.value
    )
  }
  className="border rounded p-1 text-slate-900 placeholder-slate-500"
>
  <option value="">
    Move To...
  </option>

  {folders.map((folder) => (
    <option
      key={folder.id}
      value={folder.id}
    >
      {folder.name}
    </option>
  ))}
</select>
      </div>
    </div>
  )
)
  )}

</div>
        </div>

      </div>

    </div>
  );
}