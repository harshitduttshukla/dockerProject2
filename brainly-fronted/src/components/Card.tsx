import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    Link: string;
    type: "twitter" | "youtube";
}

export function Card({ title, Link, type }: CardProps): JSX.Element {
    // Helper function to transform YouTube links
    const getYouTubeEmbedLink = (url: string): string => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes("youtube.com")) {
                const videoId = urlObj.searchParams.get("v"); // Extract video ID
                if (videoId) {
                    return `https://www.youtube.com/embed/${videoId}`;
                }
            } else if (urlObj.hostname === "youtu.be") {
                // Handle short URL format
                return `https://www.youtube.com/embed${urlObj.pathname}`;
            }
            // Return the original link if not a recognized YouTube link
            return url;
        } catch (error) {
            console.error("Invalid YouTube URL:", url);
            return url;
        }
    };

    // Helper function to transform Twitter links
    const getTwitterEmbedLink = (url: string): string => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes("x.com")) {
                return url.replace("x.com", "twitter.com");
            }
            return url;
        } catch (error) {
            console.error("Invalid Twitter URL:", url);
            return url;
        }
    };

    return (
        <div className="p-4 bg-white rounded-md border-gray-100 max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon />
                    </div>
                    {title}
                </div>

                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={Link} target="_blank" rel="noopener noreferrer">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && (
                    <iframe
                        className="w-full"
                        src={getYouTubeEmbedLink(Link)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}

                {type === "twitter" && (
                    <blockquote className="twitter-tweet">
                        <a href={getTwitterEmbedLink(Link)} target="_blank" rel="noopener noreferrer"></a>
                    </blockquote>
                )}
            </div>
        </div>
    );
}
