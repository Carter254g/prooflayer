import PageWrapper from "@/components/layout/PageWrapper";
import { CATEGORY_GROUPS } from "@/types";
import { categoryLabel, groupLabel } from "@/lib/utils";

export default function CreatePage() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Create Proof</h1>
        <p className="text-[#A09EB8] text-sm mt-1">
          Document and anchor your work on-chain.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="flex flex-col gap-5">

          <div>
            <label className="text-sm text-[#A09EB8] mb-1.5 block">Title</label>
            <input
              type="text"
              placeholder="e.g. Wedding Photography — Nairobi, March 2025"
              className="w-full bg-[#0F0F17] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-[#A09EB8] mb-1.5 block">Category</label>
            <select className="w-full bg-[#0F0F17] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#6EE7B7] transition-colors">
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

          <div>
            <label className="text-sm text-[#A09EB8] mb-1.5 block">Description</label>
            <textarea
              rows={4}
              placeholder="Describe the work you completed..."
              className="w-full bg-[#0F0F17] border border-[#2A2A38] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5C5A72] focus:outline-none focus:border-[#6EE7B7] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-[#A09EB8] mb-1.5 block">Media</label>
            <div className="w-full bg-[#0F0F17] border border-dashed border-[#2A2A38] rounded-lg px-4 py-8 text-center text-sm text-[#5C5A72] hover:border-[#6EE7B7] transition-colors cursor-pointer">
              Click to upload photos or videos
              <br />
              <span className="text-xs">PNG, JPG, MP4 up to 50MB</span>
            </div>
          </div>

          <button className="w-full bg-[#6EE7B7] hover:bg-[#34D399] text-[#0A0A0F] font-semibold rounded-lg py-2.5 text-sm transition-colors">
            Create Proof
          </button>

        </div>
      </div>
    </PageWrapper>
  );
}
