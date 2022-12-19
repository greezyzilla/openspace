export default function SidebarItemSkeleton() {
  return (
    <div className="relative pr-3">
      <div className="mr-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm">
        <p className="skeleton h-8 w-full max-w-[32px] rounded-lg" />
        <p className="skeleton">&nbsp;</p>
      </div>
    </div>
  );
}
