'use client';

import { useState } from 'react';
// import { saveUploadedFile } from '@/app/actions';
import { UploadDropzone } from '@/utils/uploadthing';
import { FileTextIcon, UploadIcon } from '@radix-ui/react-icons';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <main className="p-10">
      <div className="relative flex flex-col gap-8">
        <UploadDropzone
          endpoint="imageUploader"
          appearance={{
            uploadIcon: {
              width: '80px' /* Adjust the width */,
              height: '80px'
            }
          }}
          onClientUploadComplete={async (res) => {
            try {
              console.log(`onClientUploadComplete`, res);

              // Map response fields to match the Prisma model fields
              const uploadedFiles = res.map((file) => ({
                name: file.name,
                url: file.url,
                size: file.size,
                key: file.key // Directly from response
              }));
              console.log(uploadedFiles[0].name);
              console.log('reached at api');
              console.log(res[0].name);
              // Send the formatted data to the API endpoint
              const response = await fetch('/api/uploaded-files/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  files: uploadedFiles
                })
              });
              console.log('came out of the api');

              if (!response.ok) {
                throw new Error(
                  `Failed to save files to the database. Status: ${response.status}`
                );
              }

              console.log('Files saved to the database successfully');
              setFiles([]);
              alert('Upload Completed');
            } catch (error) {
              console.error(
                'Error saving uploaded files to the database:',
                error
              );
              alert('Failed to upload files to the database.');
            }
          }}
          onUploadBegin={() => {
            console.log('upload begin');
          }}
          content={{
            label: ({ isDragActive }) => (
              <div className="flex flex-col items-center justify-center gap-6">
                {/* <div className="rounded-full border border-dashed p-4">
                  <UploadIcon
                    className="w-8 h-8 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div> */}
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-muted-foreground">
                    {isDragActive
                      ? 'Drop the files here'
                      : "Drag 'n' drop files here, or click to select files"}
                  </p>
                </div>
              </div>
            )
          }}
          className="h-90 group relative grid w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-4 text-center transition hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {files.length > 0 && (
          <div className="h-fit w-full px-4">
            <div className="flex max-h-48 flex-col gap-6">
              {files.map((file, index) => (
                <div key={index} className="relative flex items-center gap-4">
                  <div className="flex flex-1 gap-4">
                    <FileTextIcon
                      className="h-10 w-10 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
