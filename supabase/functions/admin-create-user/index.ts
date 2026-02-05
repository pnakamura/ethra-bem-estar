 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
 };
 
 Deno.serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const supabaseAdmin = createClient(
       Deno.env.get("SUPABASE_URL") ?? "",
       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
       { auth: { autoRefreshToken: false, persistSession: false } }
     );
 
     const { email, password, nome_completo, tipo_usuario } = await req.json();
 
     if (!email || !password) {
       return new Response(
         JSON.stringify({ error: "Email e senha são obrigatórios" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Create user in auth.users
     const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
       email,
       password,
       email_confirm: true,
     });
 
     if (authError) {
       return new Response(
         JSON.stringify({ error: authError.message }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Create entry in usuarios table
     const { error: usuarioError } = await supabaseAdmin
       .from("usuarios")
       .insert({
         id: authData.user.id,
         email,
         nome_completo: nome_completo || email.split("@")[0],
         tipo_usuario: tipo_usuario || "cliente",
         status: "ativa",
       });
 
     if (usuarioError) {
       console.error("Error creating usuario:", usuarioError);
     }
 
     return new Response(
       JSON.stringify({ success: true, user_id: authData.user.id }),
       { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return new Response(
       JSON.stringify({ error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });