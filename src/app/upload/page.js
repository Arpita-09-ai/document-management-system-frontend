
'use client';

import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import baseApi from '../../services/baseApi';
import documentApi from '../../services/documentApi';
export default function UploadPage() {
  const [documentTypes, setDocumentTypes] =
  useState([]);
  const [folders, setFolders] =
  useState([]);

const [folderId, setFolderId] =
  useState('');
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('');
  
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState(0);
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
  window.location.href = '/';
  return;
}     if (
  !title.trim() ||
  !documentType ||
  !folderId ||
  !file
) {
  alert(
  'Folder, Title, Document Type and File are required'
);
  return;
}
      const formData = new FormData();
      
      formData.append('document', file);
      formData.append('title', title);
      formData.append('documentType', documentType);
      formData.append('tags', tags);

      const response = await documentApi.post(
  '/upload',
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert(response.data.message);

      setTitle('');
setDocumentType('');
setTags('');
setFile(null);
setFileKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          'Upload failed'
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  const fetchDocumentTypes = async () => {
    try {
      const token =
        localStorage.getItem('token');
      if (!token) {
  window.location.href = '/';
  return;
}
      const response = await baseApi.get(
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

  fetchDocumentTypes();
}, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
  <Upload size={32} className="text-blue-900" />

  <div>
    <h1 className="text-3xl font-bold text-blue-900">
      Upload Document
    </h1>

    <p className="text-slate-500 text-sm">
      Upload and manage enterprise documents
    </p>
  </div>
</div>

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

       <label className="block text-sm font-semibold text-slate-700 mb-2">
  Document Type
</label>

<select
  value={documentType}
  onChange={(e) =>
    setDocumentType(e.target.value)
  }
  className="w-full border-2 border-slate-300 rounded-lg p-3 mb-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
  placeholder="safety, refinery, audit"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
  className="w-full border-2 border-slate-300 rounded-xl p-3 mb-5 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
/>
<label className="block text-sm font-semibold text-slate-700 mb-2">
  Document
</label>
        <input
  key={fileKey}
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 mb-6 text-slate-700 bg-slate-50"
/>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          {loading
            ? 'Uploading...'
            : 'Upload Document'}
        </button>
      </div>
    </div>
  );
}