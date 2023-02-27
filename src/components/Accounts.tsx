import { useState, useEffect } from "react";
// import {
//   useUser,
//   useSupabaseClient,
//   type Session,
// } from '@supabase/auth-helpers-react';
// import Avatar from './Avatar';

export default function Account({ session }: any) {
  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     if (!user) throw new Error("No user");

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //       setWebsite(data.website);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     alert("Error loading user data!");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function updateProfile({
  //   username,
  //   website,
  //   avatar_url,
  // }: {
  //   username: string;
  //   website: string;
  //   avatar_url: string;
  // }) {
  //   try {
  //     setLoading(true);
  //     // if (!user) throw new Error("No user");

  //     // const updates = {
  //     //   id: user.id,
  //     //   username,
  //     //   website,
  //     //   avatar_url,
  //     //   updated_at: new Date().toISOString(),
  //     // };

  //     // const { error } = await supabase.from("profiles").upsert(updates);
  //     // if (error) throw error;
  //     alert("Profile updated!");
  //   } catch (error) {
  //     alert("Error updating the data!");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div className="mt-4 block">
      {/* <Avatar
        uid={""}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          // setAvatarUrl(url);
          // updateProfile({ username, website, avatar_url: url });
        }}
      /> */}
    </div>
  );
}
