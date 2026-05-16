"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface UserStat {
  _id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  lastLoginAt: string;
  unlockedListingsCount: number;
  interactionsCount: number;
  calls: number;
  whatsapps: number;
  recentInteractions?: {
    pgName: string;
    interactionType: string;
    timestamp: string;
  }[];
}

interface DashboardStats {
  totalUsers: number;
  totalInteractions: number;
  totalCalls: number;
  totalWhatsapps: number;
  avgInteractionsPerUser: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<UserStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard");

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setStats(data.stats);
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            User Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track user interactions, engagement, and activity details
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Total Users */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            {/* Total Interactions */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Interactions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalInteractions}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            {/* Calls */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Calls</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalCalls}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Phone className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            {/* WhatsApps */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">WhatsApps</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalWhatsapps}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <MessageCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            {/* Avg Per User */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Avg per User
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.avgInteractionsPerUser}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Cards Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Users ({users.length})
          </h2>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {/* User Summary Row */}
                <button
                  onClick={() =>
                    setExpandedUserId(
                      expandedUserId === user._id ? null : user._id,
                    )
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4 flex-1">
                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {user.phoneNumber}
                      </p>
                    </div>

                    {/* Dates */}
                    <div className="hidden sm:flex gap-6 text-sm">
                      <div>
                        <p className="text-gray-600">Joined</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Active</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.lastLoginAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {user.calls}
                        <Phone size={14} className="ml-1" />
                      </span>
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {user.whatsapps}
                        <MessageCircle size={14} className="ml-1" />
                      </span>
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {user.interactionsCount}
                      </span>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="ml-4">
                    {expandedUserId === user._id ? (
                      <ChevronUp className="text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedUserId === user._id && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    {/* Mobile Date Info */}
                    <div className="sm:hidden mb-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Joined</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Active</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.lastLoginAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Interactions History */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Interaction History ({user.interactionsCount})
                      </h4>
                      {user.recentInteractions &&
                      user.recentInteractions.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {user.recentInteractions.map((interaction, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {interaction.pgName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    interaction.timestamp,
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <div className="ml-4">
                                {interaction.interactionType === "call" ? (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                    <Phone size={14} /> Call
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                    <MessageCircle size={14} /> WhatsApp
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No interactions yet
                        </p>
                      )}
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-gray-600">Calls</p>
                        <p className="text-xl font-bold text-blue-600">
                          {user.calls}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-gray-600">WhatsApps</p>
                        <p className="text-xl font-bold text-green-600">
                          {user.whatsapps}
                        </p>
                      </div>
                      {/* <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-gray-600">Unlocked</p>
                        <p className="text-xl font-bold text-purple-600">
                          {user.unlockedListingsCount}
                        </p>
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No users yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Data updates automatically. Last refresh:{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
