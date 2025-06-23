export const FullBlogSkeleton = () => {
    return (
        <div className="flex justify-center animate-pulse pt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-10 w-full max-w-screen-xl gap-8">
                {/* Left Column - Blog Content */}
                <div className="md:col-span-8 space-y-4">
                    {/* Title */}
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>

                    {/* Date */}
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>

                    {/* Blog Content Skeleton Lines */}
                    <div className="space-y-3 pt-4">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-4 bg-gray-200 rounded ${idx % 3 === 0 ? "w-full" : "w-5/6"}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Author Section */}
                <div className="md:col-span-4 space-y-4">
                    <div className="h-5 bg-gray-200 w-24 rounded"></div>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="h-3 w-40 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
