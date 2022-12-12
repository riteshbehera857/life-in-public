const PostSkeleton = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-20 w-20 rounded-full animate-pulse bg-slate-200" />
        <span className="flex-grow py-2 rounded-lg bg-slate-200 animate-pulse">
          &nbsp;
        </span>
      </div>
      <div className="w-full h-[250px] rounded-lg bg-slate-200 mb-4 animate-pulse" />
      <div className="w-full mb-2 rounded-lg bg-slate-200 animate-pulse">
        &nbsp;
      </div>
      <div className="w-full mb-2 rounded-lg bg-slate-200 animate-pulse">
        &nbsp;
      </div>
    </div>
  );
};

export default PostSkeleton;
