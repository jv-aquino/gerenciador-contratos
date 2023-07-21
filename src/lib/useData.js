import supabase from "./supabase";

export default async function useData(table, range, select) {
  return new Promise((resolve) => {
    if (range) {
      supabase.from(table).select((select) ? select : '*').range(0, range - 1).order('id', { ascending: true }).then(res => {
        if (res) {
          resolve(res.data);
        }
      }) 
    }
    else {
        supabase.from(table).select((select) ? select : '*').order('id', { ascending: true }).then(res => {
        if (res) {
          resolve(res.data);
        }
      }) 
    }
  });
}