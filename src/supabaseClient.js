import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wlrxggdgvajctkhdmweu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscnhnZ2RndmFqY3RraGRtd2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNDYyODMsImV4cCI6MjAyMzkyMjI4M30.mwYhUqj4is6jgzzanQdFCnENbCA4UVMZfGAuyQnNvYM"
);
