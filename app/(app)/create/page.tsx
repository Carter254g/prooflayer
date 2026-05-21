"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import PageWrapper from "@/components/layout/PageWrapper";
import { CATEGORY_GROUPS } from "@/types";
import { categoryLabel, groupLabel } from "@/lib/utils";
import { Upload, X, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CreatePage() {
  const router = useRouter();
  const { authenticated, walletAddress, login } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryGroup, setCategoryGroup] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 52428800) {
      setError("File must be under 50MB");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError(null);
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setCategory(val);
    const group = Object.entries(CATEGORY_GROUPS).find(([, cats]) =>
      cats.includes(val as any)
    )?.[0] ?? "";
    setCategoryGroup(group);
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const sigRes = await fetch("/api/upload", { method: "POST" });
    const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey);
    formData.append("folder", "prooflayer");

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    return new Promise((resolve, reject) => {
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
      );
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (res.secure_url) resolve(res.secure_url);
        else reject(new Error("Upload failed"));
      };
      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.send(formData);
    });
  }

  async function handleSubmit() {
    console.log("wallet:", walletAddress);
    if (!authenticated) {
      login();
      return;
    }

    if (!title.trim()) return setError("Title is required");
    if (!category) return setError("Category is required");
    if (!description.trim()) return setError("Description is required");

    setLoading(true);
    setError(null);

    try {
      let mediaUrls: string[] = [];

      if (file) {
        setUploadProgress(0);
        const url = await uploadToCloudinary(file);
        mediaUrls = [url];
      }

      const res = await fetch("/api/proofs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          categoryGroup,
          description,
          mediaUrls,
          creator: walletAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push(`/proof/${data.proof.id}`);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Create Proof</h1>
        <p className="text-[#A09EB8] text-sm mt-1">
          Document and anchor your work on-chain.
        </p>
      </div>

      <div className="max-w-2xl flex flex-col gap-5">

        {/* Title */}
        <div>
          <label className="text-sm text-[#A09EB8] mb-1.5 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Wedding Photography — Nairobi, March 2025"
            className="w-full bg-[#0F0F17] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-[#A09EB8] mb-1.5 block">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full bg-[#0F0F17] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#6EE7B7] transition-colors"
          >
            <option value="">Select a category</option>
            {Object.entries(CATEGORY_GROUPS).map(([group, categories]) => (
              <optgroup key={group} label={groupLabel(group as any)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabel(cat)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-[#A09EB8] mb-1.5 block">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the work you completed..."
            className="w-full bg-[#0F0F17] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors resize-none"
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className="text-sm text-[#A09EB8] mb-1.5 block">Media</label>
          {preview ? (
            <div className="relative rounded-lg overflow-hidden border border-[#2A2A38]">
              <img src={preview} alt="preview" className="w-full max-h-64 object-cover" />
              <button
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white hover:bg-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full bg-[#0F0F17] border border-dashed border-[#2A2A38] rounded-lg px-4 py-8 text-center text-sm text-[#5C5A72] hover:border-[#6EE7B7] transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mb-2" />
              Click to upload photos or videos
              <span className="text-xs mt-1">PNG, JPG, MP4 up to 50MB</span>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}

          {/* Upload progress */}
          {loading && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-[#A09EB8] mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-[#1E1E2A] rounded-full h-1.5">
                <div
                  className="bg-[#6EE7B7] h-1.5 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* Submit */}
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploadProgress > 0 && uploadProgress < 100
                ? `Uploading ${uploadProgress}%`
                : "Saving proof..."}
            </span>
          ) : authenticated ? (
            "Create Proof"
          ) : (
            "Connect Wallet to Create"
          )}
        </Button>

      </div>
    </PageWrapper>
  );
}