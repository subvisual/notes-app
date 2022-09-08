import supabase from "./supabase";

export async function createNote(params: Record<string, string>) {
  return supabase.from("notes").insert([params]);
}

export async function updateNote(id: string, params: Record<string, string>) {
  return supabase.from("notes").update([params]).match({ id });
}

export async function deleteNote(id: string) {
  return supabase.from("notes").delete().match({ id });
}

export async function createPublicNote(params: Record<string, string>) {
  return supabase.from("public_notes").insert([params]);
}

export async function updatePublicNote(
  id: string,
  params: Record<string, string>,
) {
  return supabase.from("public_notes").update([params]).match({ id });
}

export async function deletePublicNote(id: string) {
  return supabase.from("public_notes").delete().match({ id });
}

export async function createFolder(params: Record<string, string>) {
  return supabase.from("folders").insert([params]);
}

export async function deleteFolder(id: string) {
  return supabase.from("folders").delete().match({ id });
}

export async function updateFolder(id: string, name: string) {
  return supabase.from("folders").update({ name }).match({ id });
}

export async function getUser(sig: string) {
  return supabase.from("users").select("*").eq("signature", sig);
}

export async function createUser(signature: string, key: string) {
  return supabase.from("users").insert([{ signature, key }]);
}

export async function getPublicNoteById(id: string) {
  return supabase
    .from("public_notes")
    .select(`name, tags, content`)
    .eq("id", id);
}
export async function getNotesBySig(sig: string) {
  return supabase
    .from("notes")
    .select(`id, name, folder, tags, content, slug`)
    .eq("user", sig);
}

export async function getPublicNotesBySig(sig: string) {
  return supabase
    .from("public_notes")
    .select(`id, originalNote`)
    .eq("user", sig);
}

export async function getFoldersBySig(sig: string) {
  return supabase.from("folders").select(`id, name`).eq("user", sig);
}
