import supabase from "./supabase";

export async function createNote(params: Record<string, string>) {
  return supabase.from("notes").insert([params]);
}

export async function updateNote(params: Record<string, string>, id: string) {
  return supabase.from("notes").update([params]).match({ id });
}

export async function deleteNote(id: string) {
  return supabase.from("notes").delete().match({ id });
}

export async function createFolder(params: Record<string, string>) {
  return supabase.from("folders").insert([params]);
}

export async function deleteFolder(id: string) {
  return supabase.from("folders").delete().match({ id });
}

export async function getUser(sig: string) {
  return supabase.from("users").select("*").eq("signature", sig);
}

export async function createUser(signature: string, key: string) {
  return supabase.from("users").insert([{ signature, key }]);
}

export async function getNotesBySig(sig: string) {
  return supabase.from("notes").select(`id, name, folder`).eq("user", sig);
}

export async function getFoldersBySig(sig: string) {
  return supabase.from("folders").select(`id, name`).eq("user", sig);
}

export async function getNoteById(id: string) {
  return supabase.from("notes").select("*").eq("id", id);
}
