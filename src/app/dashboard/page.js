'use client';
import {
  Upload,
  Search,
  FileText,
  
} from 'lucide-react';
import baseApi from '../../services/baseApi';
import api from '../../services/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function DashboardPage() {
  const [search, setSearch] =
  useState('');

const router = useRouter();
  const [user, setUser] = useState(null);
  const [
  announcements,
  setAnnouncements,
] = useState([]);

const [activities, setActivities] =
  useState([]);
  
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token =
        localStorage.getItem('token');

      if (!token) {
        window.location.href = '/';
        return;
      }
const activityResponse =
  await baseApi.get('/activity', {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });
  setActivities(
  activityResponse.data
);
  const announcementResponse =
  await baseApi.get(
    '/announcements',
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
  setAnnouncements(
  announcementResponse.data
);
      const response =
        await api.get('/me', {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      setUser(response.data);

    } catch (error) {
      console.error(error);

      localStorage.removeItem('token');

      window.location.href = '/';
    }
  };

  fetchUser();
}, []);


  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-900 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              IndianOil Document Management System
            </h1>
            <p className="text-blue-100 text-sm">
              Secure Internal Repository
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-blue-900">
    Welcome, {user ? user.name : 'Employee'}
  </h2>

<p className="text-slate-600 mt-2">
  <strong>Employee ID:</strong> {user ? user.employeeId : '-'}
</p>
<div className="flex gap-6 mt-3 text-slate-600">
  <span>
    <strong>Role:</strong> {user?.role}
  </span>

  <span>
    <strong>Department:</strong>{' '}
    {user?.department?.name || '-'}
  </span>
</div>
        </div>

        {/* Announcements */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
  <h3 className="text-xl font-bold text-blue-900 mb-4">
    Announcements
  </h3>

  <div className="space-y-3 text-slate-600">
    {announcements.length === 0 ? (
      <p>No announcements</p>
    ) : (
      announcements.slice(0, 1).map(
        (announcement) => (
          <div key={announcement.id}>
            <p className="font-semibold text-blue-900">
              {announcement.title}
            </p>

            <p className="text-sm">
              {announcement.content}
            </p>
          </div>
        )
      )
    )}
  </div>
</div>

{/* Search */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
  <h3 className="text-xl font-bold text-blue-900 mb-4">
    Search Documents
  </h3>

  <div className="flex gap-3">
    <input
  type="text"
  placeholder="Search by title, tags or OCR text..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="flex-1 border-2 border-slate-500 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-700"
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

{/* Main Actions */}
<div className="grid md:grid-cols-2 gap-6 mb-6">

  <Link href="/upload">
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200">

      <Upload
        size={50}
        className="text-blue-700 mb-4"
      />

      <h3 className="text-xl font-bold text-blue-900">
        Upload Documents
      </h3>

      <p className="text-slate-600 mt-2">
        Upload PDFs, Images, Excel and Word files
      </p>
    </div>
  </Link>

  <Link href="/folders">
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200">

      <FileText
        size={50}
        className="text-blue-700 mb-4"
      />

      <h3 className="text-xl font-bold text-blue-900">
        View Documents
      </h3>

      <p className="text-slate-600 mt-2">
        Browse folders and access documents
      </p>
    </div>
  </Link>

</div>

{/* Recent Activity */}
<div className="bg-white rounded-2xl shadow-lg p-6">
  <h3 className="text-xl font-bold text-blue-900 mb-4">
    Recent Activity
  </h3>

  {activities.length > 0 ? (
    <div>
      <p className="font-semibold text-blue-900">
        
  {activities[0].action}
</p>

<p className="text-slate-600 text-sm">
  {activities[0].details}
</p>

<p className="text-xs text-slate-400 mt-1">
  {new Date(
    activities[0].createdAt
  ).toLocaleString()}

      </p>

      
    </div>
  ) : (
    <p className="text-slate-600">
      No recent activity
    </p>
  )}
</div>
      </div>
    </div>
  );
}