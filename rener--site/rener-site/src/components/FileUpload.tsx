"use client";

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, selectedFile, disabled = false }: FileUploadProps) {
  const { t } = useTranslation();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    // Check file type (PDF only)
    if (file.type !== 'application/pdf') {
      alert(t('careers.form.fileUpload.pdfOnlyError'));
      return false;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert(t('careers.form.fileUpload.fileTooLargeError'));
      return false;
    }
    
    return true;
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('careers.form.fileUpload.label')}
      </label>
      
      <div
        className={`file-upload ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'file-selected' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          disabled={disabled}
        />
        
        <div className="file-upload-icon">
          {selectedFile ? '📄' : '📎'}
        </div>
        
        <div className="file-upload-text">
          {selectedFile ? t('careers.form.fileUpload.fileSelected') : t('careers.form.fileUpload.dragHere')}
        </div>
        
        <div className="file-upload-subtext">
          {selectedFile ? t('careers.form.fileUpload.clickToChange') : t('careers.form.fileUpload.clickToSelect')}
        </div>
      </div>

      {selectedFile && (
        <div className="file-name">
          <div>
            <div className="file-name-text">{selectedFile.name}</div>
            <div className="file-size">{formatFileSize(selectedFile.size)}</div>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="remove-file-btn"
              title={t('careers.form.fileUpload.removeFile')}
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}