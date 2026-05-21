"use client";

import { useState, useRef } from "react";
import { X, FileVideo, ImageIcon } from "lucide-react";
import { CATEGORY_GROUPS } from "@/types";
import { categoryLabel, groupLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

interface CreateProofModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProofModal({ isOpen, onClose }: CreateProofModalProps) {
    const { walletAddress } = useAuth();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setUploadError(null);
        setMediaUrl(null);
        setUploadProgress(0);
        if (selected.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(selected);
        } else {
            setPreview(null);
        }
    }

    async function handleUpload(): Promise<string | null> {
        if (!file) return null;
        setUploading(true);
        setUploadError(null);
        setUploadProgress(10);
        try {
            const sigRes = await fetch("/api/upload", { method: "POST" });
            if (!sigRes.ok) throw new Error("Failed to get upload signature");
            const { signature, timestamp, cloudName, apiKey } = await sigRes.json();
            setUploadProgress(30);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("signature", signature);
            formData.append("timestamp", timestamp.toString());
            formData.append("api_key", apiKey);
            formData.append("folder", "prooflayer");
            setUploadProgress(50);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                { method: "POST", body: formData }
            );
            setUploadProgress(90);

            if (!uploadRes.ok) {
                const errData = await uploadRes.json();
                throw new Error(errData?.error?.message || "Upload failed");
            }

            const data = await uploadRes.json();
            setUploadProgress(100);
            setMediaUrl(data.secure_url);
            return data.secure_url;
        } catch (err: any) {
            setUploadError(err.message || "Upload failed");
            return null;
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit() {
        if (!title || !category) {
            setUploadError("Title and category are required");
            return;
        }
        if (!walletAddress) {
            setUploadError("Wallet not connected");
            return;
        }

        setSubmitting(true);
        setUploadError(null);

        try {
            let url = mediaUrl;
            if (file && !mediaUrl) {
                url = await handleUpload();
                if (!url) { setSubmitting(false); return; }
            }

            const res = await fetch("/api/proofs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    mediaUrls: url ? [url] : [],
                    creator: walletAddress,
                }),
            });

            if (!res.ok) throw new Error("Failed to create proof");

            setTitle("");
            setCategory("");
            setDescription("");
            setFile(null);
            setPreview(null);
            setMediaUrl(null);
            setUploadProgress(0);
            onClose();
        } catch (err: any) {
            setUploadError(err.message || "Failed to create proof");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-10 w-full max-w-lg mx-4 bg-[#0F0F17] border border-[#2A2A38] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-bold text-lg">Create Proof</h2>
                    <button onClick={onClose} className="text-[#5C5A72] hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm text-[#A09EB8] mb-1.5 block">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Wedding Photography — Nairobi, March 2025"
                            className="w-full bg-[#16161F] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[#A09EB8] mb-1.5 block">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-[#16161F] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#6EE7B7] transition-colors"
                        >
                            <option value="">Select a category</option>
                            {Object.entries(CATEGORY_GROUPS).map(([group, categories]) => (
                                <optgroup key={group} label={groupLabel(group as any)}>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{categoryLabel(cat)}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-[#A09EB8] mb-1.5 block">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the work you completed..."
                            className="w-full bg-[#16161F] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[#A09EB8] mb-1.5 block">Media</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp,video/mp4,video/quicktime"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {file ? (
                            <div className="relative rounded-lg overflow-hidden border border-[#2A2A38]">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full max-h-48 object-cover" />
                                ) : (
                                    <div className="flex items-center gap-3 px-4 py-5 bg-[#16161F]">
                                        <FileVideo className="w-8 h-8 text-[#6EE7B7]" />
                                        <span className="text-sm text-white truncate">{file.name}</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => { setFile(null); setPreview(null); setMediaUrl(null); setUploadProgress(0); setUploadError(null); }}
                                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white hover:bg-black"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                {uploading && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2A2A38]">
                                        <div className="h-full bg-[#6EE7B7] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                    </div>
                                )}
                                {mediaUrl && (
                                    <div className="absolute bottom-2 left-2 bg-[#6EE7B7]/20 border border-[#6EE7B7] rounded px-2 py-0.5 text-xs text-[#6EE7B7]">
                                        ✓ Uploaded
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-[#16161F] border border-dashed border-[#2A2A38] rounded-lg px-4 py-8 text-center hover:border-[#6EE7B7] transition-colors cursor-pointer group"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex gap-2 text-[#5C5A72] group-hover:text-[#6EE7B7] transition-colors">
                                        <ImageIcon className="w-6 h-6" />
                                        <FileVideo className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm text-[#5C5A72] group-hover:text-[#A09EB8] transition-colors">Click to upload photos or videos</span>
                                    <span className="text-xs text-[#5C5A72]">PNG, JPG, WEBP, MP4 up to 50MB</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}

                    <div className="flex gap-3 mt-2">
                        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={handleSubmit}
                            disabled={submitting || uploading || !title || !category}
                        >
                            {submitting ? "Creating..." : uploading ? `Uploading ${uploadProgress}%` : "Create Proof"}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}