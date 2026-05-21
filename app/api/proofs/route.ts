import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("proofs")
      .select("*, users!creator(*)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ proofs: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch proofs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { title, category, categoryGroup, description, mediaUrls, creator } = body;

    if (!title || !category || !description || !creator) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await supabase.from("users").upsert({ wallet: creator }, { onConflict: "wallet" });

    const { data, error } = await supabase
      .from("proofs")
      .insert({
        title,
        category,
        category_group: categoryGroup,
        description,
        media_urls: mediaUrls ?? [],
        creator,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ proof: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create proof" }, { status: 500 });
  }
}
