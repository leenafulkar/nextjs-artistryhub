"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

const supabase = createClientComponentClient();

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const { error } = await supabase.rpc("increment", { slug_text: slug });
        if (error) {
          console.error("Error incrementing view count:", error);
        }
      } catch (error) {
        console.error("An unexpected error occurred while incrementing the view count:", error);
      }
    };

    if (!noCount) {
      incrementViews();
    }
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      try {
        const { data, error } = await supabase
          .from('views')
          .select('count')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error("Error fetching view count:", error);
        } else {
          setViews(data ? data.count : 0);
        }
      } catch (error) {
        console.error("An unexpected error occurred while fetching the view count:", error);
      }
    };

    getViews();
  }, [slug]);

  if (showCount) {
    return <div>{views} views</div>;
  } else {
    return null;
  }
};

export default ViewCounter;
