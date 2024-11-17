import { FetchFishProps, SearchDataProps, fish } from "@/constants/Types";
import { supabase } from "./supabase";
import { Dispatch, SetStateAction } from "react";
import { Session } from "@supabase/supabase-js";

export async function searchFishData({searchQuery, setData}: SearchDataProps) {
    const { data, error } = await supabase
      .from("Fish") // Replace with your table name
      .select()
      .ilike('name', `%${searchQuery}%`)
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data as fish[]);
    }
}

export async function fetchFishData({setFishData}: FetchFishProps){
    const { data, error } = await supabase
      .from("Fish") // Replace with your table name
      .select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFishData(data as fish[]);
    }
  };

 export default async function listTanks(session: Session) {
    const { data, error } = await supabase
      .from("Tanks")
      .select()
      .eq("user_id", session?.user.id);
    if (error) throw error;

    if (data) {
      // console.log("calling", data);
      return data;
    }
  }