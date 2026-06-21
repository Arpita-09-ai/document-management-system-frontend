'use client';

import {
  useEffect,
  useState,
} from 'react';

import baseApi from '../../services/baseApi';

export default function AnnouncementsPage() {

  const [title, setTitle] =
    useState('');

  const [content,
    setContent] =
    useState('');

  const [announcements,
    setAnnouncements] =
    useState([]);

  const role =
    localStorage.getItem(
      'role'
    );

  const fetchAnnouncements =
    async () => {

      const token =
        localStorage.getItem(
          'token'
        );

      const response =
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
        response.data
      );
    };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate =
    async () => {

      try {

        const token =
          localStorage.getItem(
            'token'
          );

        await baseApi.post(
          '/announcements',
          {
            title,
            content,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          'Announcement created'
        );

        setTitle('');
        setContent('');

        fetchAnnouncements();

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            'Failed'
        );
      }
    };

  const handleDelete =
    async (id) => {

      const token =
        localStorage.getItem(
          'token'
        );

      await baseApi.delete(
        `/announcements/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchAnnouncements();
    };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Announcements
      </h1>

      {role === 'ADMIN' && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Title"
            className="border p-3 w-full mb-3 text-black"
          />

          <textarea
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            placeholder="Announcement"
            className="border p-3 w-full mb-3 text-black"
          />

          <button
            onClick={
              handleCreate
            }
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create
          </button>

        </div>
      )}

      {announcements.map(
        (announcement) => (

          <div
            key={
              announcement.id
            }
            className="bg-white p-4 rounded-xl shadow mb-4"
          >

            <h2 className="font-bold text-lg text-slate-900 placeholder-slate-500">
              {
                announcement.title
              }
            </h2>

            <p className="mt-2 text-slate-900 placeholder-slate-500">
              {
                announcement.content
              }
            </p>

            <p className="text-xs text-gray-500 mt-2 ">
              {new Date(
                announcement.createdAt
              ).toLocaleString()}
            </p>

            {role === 'ADMIN' && (
              <button
                onClick={() =>
                  handleDelete(
                    announcement.id
                  )
                }
                className="bg-red-600 text-white px-3 py-1 rounded mt-3"
              >
                Delete
              </button>
            )}

          </div>
        )
      )}

    </div>
  );
}