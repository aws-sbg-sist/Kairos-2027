'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, ExternalLink, Loader2 } from 'lucide-react';

interface DeckUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  artifactType?: 'pitch_deck' | 'architecture_pdf';
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export const DeckUploader: React.FC<DeckUploaderProps> = ({
  label,
  value,
  onChange,
  artifactType = 'pitch_deck',
  placeholder = 'https://drive.google.com/... or upload .pdf / .pptx above',
  required = false,
  helperText = 'Upload PDF / PPTX (max 15 MB) directly to KAIROS cloud storage, or paste a public link.',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadedName, setUploadedName] = useState('');

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploadError('');

    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!['pdf', 'pptx', 'ppt'].includes(ext)) {
      setUploadError('Only .pdf, .pptx, or .ppt files are accepted.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File exceeds 15 MB limit. Compress or paste an external Drive/Figma link below.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('artifactType', artifactType);

      const res = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.url) {
        setUploadError(data.error || 'Upload failed. Ensure you are signed in and try again.');
        return;
      }

      onChange(data.url);
      setUploadedName(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    } catch {
      setUploadError('Network error during file upload. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>{label}{required ? ' *' : ''}</span>
        </label>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-emerald-300 hover:text-white inline-flex items-center gap-1 underline"
          >
            <span>Preview Uploaded / Linked File</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Drop / Select File Trigger */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`p-3.5 rounded-xl border border-dashed transition-colors cursor-pointer flex items-center justify-between gap-3 ${
          uploading
            ? 'border-purple-500/60 bg-purple-950/30'
            : 'border-purple-500/35 bg-slate-950/60 hover:border-purple-400 hover:bg-slate-900/70'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />

        <div className="flex items-center gap-2.5 text-xs">
          {uploading ? (
            <Loader2 className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
          ) : (
            <UploadCloud className="w-4 h-4 text-purple-400 shrink-0" />
          )}
          <div>
            <span className="text-white font-semibold block">
              {uploading
                ? 'Uploading deck to KAIROS Cloud Storage...'
                : uploadedName
                ? `Uploaded: ${uploadedName}`
                : 'Click or drop PDF / PPTX file here (max 15 MB)'}
            </span>
            <span className="text-[11px] text-slate-400 block">{helperText}</span>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-purple-900/50 text-purple-200 border border-purple-500/30 shrink-0">
          {uploading ? 'Uploading...' : 'Choose File'}
        </span>
      </div>

      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {value && !uploadError && uploadedName && (
        <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-1.5 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Stored URL attached cleanly.</span>
        </div>
      )}

      {/* URL Input (auto-filled after upload, or editable manually for Drive/Figma links) */}
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => {
          setUploadedName('');
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
      />
    </div>
  );
};
