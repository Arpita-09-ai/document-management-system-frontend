'use client';

import { useEffect, useState } from 'react';
import baseApi from '../../../services/baseApi';

export default function MyRequestsPage() {
  const [requests, setRequests] =
    useState([]);

  useEffect(() => {
    const fetchRequests =
      async () => {
        try {
          const token =
            localStorage.getItem(
              'token'
            );

          const response =
            await baseApi.get(
              '/folders/my-requests',
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setRequests(
            response.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            My Requests
          </h1>

          {requests.length === 0 ? (
            <p className="text-slate-500">
              No requests found
            </p>
          ) : (
            <div className="space-y-4">

              {requests.map(
                (request) => (
                  <div
                    key={request.id}
                    className="border rounded-xl p-4"
                  >
                    <h3 className="font-bold text-slate-900">
                      {
                        request.folder
                          .name
                      }
                    </h3>

                    <p className="text-slate-500 mt-2">
                      Status:
                      {' '}
                      {request.status}
                    </p>
                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}