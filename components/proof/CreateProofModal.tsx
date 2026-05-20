"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CATEGORY_GROUPS } from "@/types";
import { categoryLabel, groupLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface CreateProofModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProofModal({
    isOpen,
    onClose,
}: CreateProofModalProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg mx-4 bg-[#0F0F17] border border-[#2A2A38] rounded-2xl p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-bold text-lg">Create Proof</h2>
                    <button
                        onClick={onClose}
                        className="text-[#5C5A72] hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4">

                    {/* Title */}
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

                    {/* Category */}
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
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the work you completed..."
                            className="w-full bg-[#16161F] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors resize-none"
                        />
                    </div>

                    {/* Upload placeholder */}
                    <div className="w-full bg-[#16161F] border border-dashed border-[#2A2A38] rounded-lg px-4 py-6 text-center text-sm text-[#5C5A72] hover:border-[#6EE7B7] transition-colors cursor-pointer">
                        Click to upload photos or videos
                        <br />
                        <span className="text-xs">PNG, JPG, MP4 up to 50MB</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-2">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="flex-1">
                            Create Proof
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}