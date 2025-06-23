export const BlogSkeleton = () => {
    return (
        <div className="border-b border-slate-400 pb-4 p-4 w-screen max-w-screen-md mx-auto animate-pulse">
            {/* Author + Date */}
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>

            {/* Title */}
            <div className="h-5 bg-gray-300 rounded mt-4 w-3/4"></div>

            {/* Short content */}
            <div className="mt-3 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>

            {/* Read time */}
            <div className="h-3 bg-gray-300 rounded w-24 mt-3"></div>
        </div>
    );
};
