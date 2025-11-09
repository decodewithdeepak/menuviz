"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Eye, RefreshCw, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface HistoryItem {
  id: string;
  prompt: string;
  enhanced_prompt: string | null;
  style: string;
  status: string;
  error_message: string | null;
  created_at: string;
  image_id: string | null;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchHistory();
  }, [filter]);

  const fetchHistory = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    let query = supabase
      .from('generation_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (data) {
      setHistory(data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Generation History</h1>
            <p className="text-sm text-gray-600">
              Track all your image generation attempts
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchHistory}
              className="flex-shrink-0"
            >
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Total Attempts</p>
            <p className="text-xl font-bold text-gray-900">{history.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Completed</p>
            <p className="text-xl font-bold text-green-600">
              {history.filter(h => h.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Failed</p>
            <p className="text-xl font-bold text-red-600">
              {history.filter(h => h.status === 'failed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Success Rate</p>
            <p className="text-xl font-bold text-gray-900">
              {history.length > 0 
                ? Math.round((history.filter(h => h.status === 'completed').length / history.length) * 100)
                : 0}%
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-24 w-24 rounded-2xl border-4 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-4">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No history yet</h3>
            <p className="text-sm text-gray-600 mb-4">
              Start generating images to see your history
            </p>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Generate Your First Image
            </Button>
          </div>
        ) : (
          /* History List */
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 hidden sm:block sm:mt-1">
                    {getStatusIcon(item.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1">
                          {item.prompt}
                        </h3>
                        {item.enhanced_prompt && (
                          <p className="text-xs text-gray-600 line-clamp-2">
                            Enhanced: {item.enhanced_prompt}
                          </p>
                        )}
                      </div>
                      <span className={`self-start px-2 py-1 text-xs font-medium rounded-full border capitalize ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full capitalize">
                        {item.style}
                      </span>
                      <span>{format(new Date(item.created_at), 'MMM dd, yyyy HH:mm')}</span>
                      {item.error_message && (
                        <span className="text-red-600 break-all">Error: {item.error_message}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {item.image_id && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = '/dashboard/gallery'}
                      className="w-full sm:w-auto flex-shrink-0"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
