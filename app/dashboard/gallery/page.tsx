"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Eye, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface GeneratedImage {
  id: string;
  prompt: string;
  enhanced_prompt: string | null;
  style: string;
  image_url: string;
  created_at: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchImages();
  }, [selectedStyle, sortOrder]);

  const fetchImages = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    let query = supabase
      .from('generated_images')
      .select('*')
      .eq('user_id', user.id);

    if (selectedStyle !== 'all') {
      query = query.eq('style', selectedStyle);
    }

    query = query.order('created_at', { ascending: sortOrder === 'oldest' });

    const { data, error } = await query;

    if (data) {
      setImages(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('generated_images')
      .delete()
      .eq('id', id);

    if (!error) {
      setImages(images.filter(img => img.id !== id));
    } else {
      alert('Failed to delete image');
    }
  };

  const handleDownload = (imageUrl: string, prompt: string) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Gallery</h1>
            <p className="text-sm text-gray-600">
              View and manage all your generated images
            </p>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Styles</option>
              <option value="photorealistic">Photorealistic</option>
              <option value="artistic">Artistic</option>
              <option value="minimalist">Minimalist</option>
              <option value="rustic">Rustic</option>
            </select>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Total Images</p>
            <p className="text-xl font-bold text-gray-900">{images.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">This Week</p>
            <p className="text-xl font-bold text-gray-900">
              {images.filter(img => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(img.created_at) > weekAgo;
              }).length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Photorealistic</p>
            <p className="text-xl font-bold text-gray-900">
              {images.filter(img => img.style === 'photorealistic').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-600">Artistic</p>
            <p className="text-xl font-bold text-gray-900">
              {images.filter(img => img.style === 'artistic').length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-24 w-24 rounded-2xl border-4 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-4">
              <Eye className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No images yet</h3>
            <p className="text-sm text-gray-600 mb-4">
              Start generating images to see them here
            </p>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Generate Your First Image
            </Button>
          </div>
        ) : (
          /* Image Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  {image.image_url.startsWith('data:image') ? (
                    <img 
                      src={image.image_url} 
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Image preview</p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate" title={image.prompt}>
                    {image.prompt}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full capitalize">
                      {image.style}
                    </span>
                    <span>{format(new Date(image.created_at), 'MMM dd, yyyy')}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs h-8"
                      onClick={() => handleDownload(image.image_url, image.prompt)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 hover:bg-red-50 hover:border-red-200"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
