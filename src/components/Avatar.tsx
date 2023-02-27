import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import UploadInput from './Form/UploadInput';

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: string;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative  overflow-hidden flex-[0_0_auto] rounded-full bg-accent"
        style={{ height: size, width: size }}
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt="Avatar" width={size} height={size} />
        ) : (
          <div
            className="flex-[0_0_auto] rounded-full bg-slate-200"
            style={{ height: size, width: size }}
          />
        )}
      </div>
      <UploadInput
        size={size}
        type="file"
        onChange={uploadAvatar}
        disabled={uploading}
        id="avatar"
        label={uploading ? 'Uploading ...' : 'Change photo'}
        accept="image/*"
      />
    </div>
  );
}
