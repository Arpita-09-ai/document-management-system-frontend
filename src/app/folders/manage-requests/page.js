'use client';

import { useEffect, useState } from 'react';
import baseApi from '../../../services/baseApi';

export default function ManageRequestsPage() {
  const [requests, setRequests] =
    useState([]);

  const fetchRequests = async () => {
    try {
      const token =
        localStorage.getItem('token');

      const response =
        await baseApi.get(
          '/folders/access-requests',
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

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest =
    async (requestId) => {
      try {
        const token =
          localStorage.getItem(
            'token'
          );

        const response =
          await baseApi.patch(
            `/folders/requests/${requestId}/approve`,
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

        fetchRequests();
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            'Failed to approve request'
        );
      }
    };

  const rejectRequest =
    async (requestId) => {
      try {
        const token =
          localStorage.getItem(
            'token'
          );

        const response =
          await baseApi.patch(
            `/folders/requests/${requestId}/reject`,
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

        fetchRequests();
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            'Failed to reject request'
        );
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            Manage Requests
          </h1>

          {requests.length === 0 ? (
            <p className="text-slate-500">
              No pending requests
            </p>
          ) : (
            <div className="space-y-4">

              {requests.map(
                (request) => (
                  <div
                    key={request.id}
                    className="border rounded-xl p-5"
                  >
                    <h3 className="font-bold text-slate-900 text-lg">
                      {
                        request.requester
                          .name
                      }
                    </h3>

                    <p className="text-slate-500">
                      Employee ID:
                      {' '}
                      {
                        request.requester
                          .employeeId
                      }
                    </p>

                    <p className="text-slate-500 mt-2">
                      Folder:
                      {' '}
                      {
                        request.folder
                          .name
                      }
                    </p>

                    <div className="flex gap-3 mt-4">

                      <button
                        onClick={() =>
                          approveRequest(
                            request.id
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectRequest(
                            request.id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>

                    </div>

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