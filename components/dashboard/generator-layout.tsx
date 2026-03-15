"use client";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Camera } from "lucide-react";
import { downloadImage } from "@/lib/utils";

interface GeneratorLayoutProps {
  title: string;
  description: string;
  isGenerating: boolean;
  generatedImageUrl: string | null;
  onGenerate: () => void;
  onDownload?: () => void;
  downloadPrefix: string;
  generateButtonText: string;
  generateButtonIcon: React.ReactNode;
  isGenerateDisabled: boolean;
  emptyStateIcon?: React.ReactNode;
  emptyStateText?: string;
  emptyStateSubtext?: string;
  children: React.ReactNode; // The left column inputs
}

export function GeneratorLayout({
  title,
  description,
  isGenerating,
  generatedImageUrl,
  onGenerate,
  onDownload,
  downloadPrefix,
  generateButtonText,
  generateButtonIcon,
  isGenerateDisabled,
  emptyStateIcon = <Camera className="h-12 w-12 text-gray-400" />,
  emptyStateText = "No image generated yet",
  emptyStateSubtext = "Enter details and click generate",
  children,
}: GeneratorLayoutProps) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    if (generatedImageUrl) {
      downloadImage(generatedImageUrl, downloadPrefix);
    }
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column - Input */}
          <div className="flex flex-col gap-4">
            {children}

            <Button
              onClick={onGenerate}
              disabled={isGenerateDisabled}
              className="w-full h-11 text-sm font-semibold"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  {generateButtonIcon}
                  {generateButtonText}
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-900">Preview</label>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!generatedImageUrl}
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                {/* Allow regeneration hook if needed, but not strictly necessary for most pages assuming "Generate" handles it.
                    Some pages had "Regenerate" next to download. Let's add it if requested. */}
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex-1 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <RefreshCw className="h-12 w-12 text-orange-500 animate-spin mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-600">Creating your image...</p>
                </div>
              ) : generatedImageUrl ? (
                <img
                  src={generatedImageUrl}
                  alt="Generated asset preview"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="mx-auto h-24 w-24 rounded-2xl border-4 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-4">
                    {emptyStateIcon}
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{emptyStateText}</p>
                  <p className="text-xs text-gray-500">{emptyStateSubtext}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
