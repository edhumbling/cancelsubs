'use client';

import { useState, useCallback } from 'react';
import { UploadState, UploadedFile } from '@/lib/types';

export function useFileUpload() {
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        const validTypes = ['text/csv', 'application/pdf', 'application/vnd.ms-excel'];
        const validExtensions = ['.csv', '.pdf'];

        const hasValidType = validTypes.includes(file.type);
        const hasValidExtension = validExtensions.some(ext =>
            file.name.toLowerCase().endsWith(ext)
        );

        return hasValidType || hasValidExtension;
    };

    const readFileContent = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    };

    const handleFiles = useCallback(async (fileList: FileList | File[]) => {
        const filesArray = Array.from(fileList);
        const validFiles = filesArray.filter(validateFile);

        if (validFiles.length === 0) {
            setError('Please upload CSV or PDF files from your bank');
            setUploadState('error');
            return;
        }

        setError(null);
        setUploadState('uploading');

        try {
            const uploadedFiles: UploadedFile[] = await Promise.all(
                validFiles.map(async (file) => {
                    const content = await readFileContent(file);
                    return {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        content,
                    };
                })
            );

            setFiles(prev => [...prev, ...uploadedFiles]);
            setUploadState('processing');

            // Simulate processing delay
            setTimeout(() => {
                setUploadState('complete');
            }, 1500);
        } catch {
            setError('Failed to read files. Please try again.');
            setUploadState('error');
        }
    }, []);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setUploadState('dragging');
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setUploadState('idle');
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const { files } = e.dataTransfer;
        handleFiles(files);
    }, [handleFiles]);

    const reset = useCallback(() => {
        setUploadState('idle');
        setFiles([]);
        setError(null);
    }, []);

    return {
        uploadState,
        files,
        error,
        handleFiles,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        reset,
    };
}
