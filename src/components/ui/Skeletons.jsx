export function PropertyCardSkeleton() {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-card animate-pulse">
        <div className="aspect-[4/3] bg-brand-gray-3" />
        <div className="p-5 flex flex-col gap-3">
          <div className="h-5 bg-brand-gray-3 rounded w-2/3" />
          <div className="h-4 bg-brand-gray-3 rounded w-1/2" />
          <div className="h-4 bg-brand-gray-3 rounded w-3/4" />
          <div className="pt-3 border-t border-brand-gray-3 flex gap-4">
            <div className="h-3 bg-brand-gray-3 rounded w-20" />
            <div className="h-3 bg-brand-gray-3 rounded w-20" />
          </div>
        </div>
      </div>
    )
  }
  
  export function PropertyListSkeleton() {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-card animate-pulse">
        <div className="flex">
          <div className="w-64 aspect-[4/3] bg-brand-gray-3 shrink-0" />
          <div className="flex-1 p-5 flex flex-col gap-3">
            <div className="h-5 bg-brand-gray-3 rounded w-1/2" />
            <div className="h-4 bg-brand-gray-3 rounded w-1/3" />
            <div className="h-4 bg-brand-gray-3 rounded w-full" />
            <div className="h-4 bg-brand-gray-3 rounded w-3/4" />
          </div>
        </div>
      </div>
    )
  }
  
  export function DetailSkeleton() {
    return (
      <div className="animate-pulse">
        <div className="aspect-[16/9] bg-brand-gray-3 rounded-2xl mb-6" />
        <div className="bg-white rounded-2xl p-6 mb-4">
          <div className="h-8 bg-brand-gray-3 rounded w-2/3 mb-3" />
          <div className="h-4 bg-brand-gray-3 rounded w-1/3" />
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-brand-gray-3 rounded-xl" />
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6">
          <div className="h-5 bg-brand-gray-3 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-brand-gray-3 rounded w-full" />
            <div className="h-4 bg-brand-gray-3 rounded w-5/6" />
            <div className="h-4 bg-brand-gray-3 rounded w-4/5" />
          </div>
        </div>
      </div>
    )
  }